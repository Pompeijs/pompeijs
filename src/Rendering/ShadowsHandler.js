import { PompeiError } from '../utils/errors';

import Device from '../Device';
import Renderer from '../Renderer';
import Scene from '../Scene';

import Material from '../Material/Material';
import ShaderMaterial from '../Material/ShaderMaterial';
import PostProcess from '../PostProcess/PostProcess';

import { Dimension2 } from '../Core/Vector';
import Color from '../Core/Color';
import Matrix from '../Core/Matrix';

import ScreenQuad from '../PostProcess/ScreenQuad';
import depthVertex from '../Shaders/Depth.vertex.glsl';
import depthPixel from '../Shaders/Depth.fragment.glsl';
import shadowPassVertex from '../Shaders/ShadowPass.vertex.glsl';
import shadowPassPixel from '../Shaders/ShadowPass.fragment.glsl';
import lightModulatePixel from '../Shaders/LightModulate.fragment.glsl';
import vsmBlurPixel from '../Shaders/VSMBlur.fragment.glsl';

class ShadowedNode {
  constructor (node, type, filterType) {
    this.node = node;
    this.type = type;
    this.filterType = filterType;
  }
}

export default class ShadowsHandler {
  static get ShadowMode () {
    return {
      RECEIVE: 0,
      CAST: 1,
      BOTH: 2,
      EXCLUDE: 3,
      NO_SHADOWS: 4,
      
      COUNT: 5
    };
  }
  
  static get FilterType () {
    return {
      EFT_NONE: 0,
      EFT_4PCF: 1,
      EFT_8PCF: 2,
      EFT_12PCF: 3,
      EFT_16PCF: 4,
      EFT_COUNT: 5
    }
  }
  
  /**
   * @constructor
   * @param {Device} device
   */
  constructor (device) {
    if (!(device instanceof Device)) {
      throw new PompeiError('Bad argument: device must be a Device. constructor (device)');
    }
    
	  this._device = device;
    this._renderer = device.renderer;
    
    // Temporary variables
    this._tempSpotLight = null;
    this._tempWorldViewProjection = new Matrix();
    
    // shadows
    this._shadowedNodes = [];
    this._clearColor = new Color(1, 1, 1, 1);
    
    // Render targets
    this._screenRTT = this._renderer.createRenderTarget("screenRTT", new Dimension2(device.canvas.width, device.canvas.height), true);
    this._colorRTT = this._renderer.createRenderTarget("colorRTT", new Dimension2(device.canvas.width, device.canvas.height), true);
    
    // Post-processes
    this._screenQuad = new ScreenQuad("shadows_handler_sq", device.scene, 2);
    this._simplePP = new PostProcess("shadows_handler_simple", device.scene, null, null, [], [], false);
    this._lightModulatePP = new PostProcess("shadows_handler_light_modulate", device.scene, null, lightModulatePixel,
      ["u_screenMapSampler"], [], false);
    this._lightModulatePP.customCallback = this._lightModulateCallback();
    
    // Depth materials
    this._depthMaterial = new ShaderMaterial(this._renderer, depthVertex, depthPixel,
      ["a_position"], ["u_worldViewProjection", "u_maxD"], [], false);
    this._depthMaterial.compile();
    this._depthMaterial.customCallback = this._depthCallback();
      
    this._depthMaterialAlpha = new ShaderMaterial(this._renderer, depthVertex, depthPixel,
      ["a_position"], ["u_worldViewProjection", "u_maxD"], ["ALPHA"], false);
    this._depthMaterialAlpha.compile();
    
    // VSM
    this._vsmH = new PostProcess("shadows_handler_vsm_h", device.scene, null, vsmBlurPixel, ["u_screenX", "u_screenY"], [], false);
    this._vsmH.compile();
    
    this._vsmV = new PostProcess("shadows_handler_vsm_v", device.scene, null, vsmBlurPixel, ["u_screenX", "u_screenY"], ["VERTICAL_VSM_BLUR"], false);
    this._vsmV.compile();
    
    this._vsmH.customCallback = this._vsmV.customCallback = this._vsmBlurCallback();
    
    // Shadows materials
    this._shadowMaterials = [];
    this._shadowMaterialsSpotLight = [];
    
    const sampleCounts = [1, 4, 8, 12, 16];
    
    for (let i=0; i < ShadowsHandler.FilterType.EFT_COUNT; i++) {
      // Not rounded spotlights
      let shadowsMaterial = new ShaderMaterial(this._renderer, shadowPassVertex, shadowPassPixel,
        // Attributes
        ["a_position", "a_normal"],
        // Uniforms
        ["u_worldViewProjection", "u_worldViewProjection2", "u_maxD", "u_mapRes", "u_lightPos",
        "u_shadowMapSampler", "u_lightColor", "u_ambientColor"],
        // Defines
        ["SAMPLE_AMOUNT " + sampleCounts[i], "VSM"], false);
      shadowsMaterial.compile();
      shadowsMaterial.customCallback = this._shadowPassCallback();
      this._shadowMaterials.push(shadowsMaterial);
      
      // Rounded spotlights
      shadowsMaterial = new ShaderMaterial(this._renderer, shadowPassVertex, shadowPassPixel,
        // Attributes
        ["a_position", "a_normal"],
        // Uniforms
        ["u_worldViewProjection", "u_worldViewProjection2", "u_maxD", "u_mapRes", "u_lightPos",
        "u_shadowMapSampler", "u_lightColor", "u_ambientColor"],
        // Defines
        ["SAMPLE_AMOUNT " + sampleCounts[i], "ROUND_SPOTLIGHTS", "VSM"], false);
      shadowsMaterial.compile();
      shadowsMaterial.customCallback = this._shadowPassCallback();
      this._shadowMaterialsSpotLight.push(shadowsMaterial);
    }
  }
  
  resize () {
    this._createRenderTargets();
  }

  /**
   * @param {Scene} scene
   */
  update (scene) {
    // Animate camera
    scene.activeCamera.render();
    
    // Render depth maps
    let spots = [];
    scene.getSceneNodesFromType(Scene.SceneNodeType.SPOT_LIGHT_SCENE_NODE, null, spots);
    
    this._renderer.setRenderTarget(this._colorRTT, scene.ambientColor, true, true);
    
    for (let i=0; i < spots.length; i++) {
      this._tempSpotLight = spots[i];
      this._tempSpotLight.updateViewMatrix();
      
      this._renderer.viewMatrix.set(spots[i].viewMatrix);
      this._renderer.projectionMatrix.set(spots[i].projectionMatrix);
      this._renderer.setRenderTarget(spots[i].shadowMap, this._clearColor, true, true);
      
      for (let n=0; n < this._shadowedNodes.length; n++) {
        let node = this._shadowedNodes[n].node;
        let type = this._shadowedNodes[n].type;
        
        if (type === ShadowsHandler.ShadowMode.RECEIVE || type === ShadowsHandler.ShadowMode.EXCLUDE) {
          continue;
        }
        
        let savedMaterials = [];
        
        // Save materials
        for (let m=0; m < node.materials.length; m++) {
          savedMaterials.push(node.materials[m].shaderMaterial);
          node.materials[m].shaderMaterial = this._depthMaterial;
        }
        
        node.render();
        
        // Restore materials
        for (let m=0; m < node.materials.length; m++) {
          node.materials[m].shaderMaterial = savedMaterials[m];
        }
        
        if (spots[i].vsmShadows) {
          this._renderer.setRenderTarget(spots[i].vsmShadowMap, this._clearColor, true, true);
          this._screenQuad.material.textures[0] = spots[i].shadowMap;
          this._screenQuad.material.shaderMaterial = this._vsmH;
          this._screenQuad.render();
          
          this._renderer.setRenderTarget(spots[i].shadowMap, this._clearColor, true, true);
          this._screenQuad.material.textures[0] = spots[i].vsmShadowMap;
          this._screenQuad.material.shaderMaterial = this._vsmV;
          this._screenQuad.render();
        }
      }
      
      // Render shadows
      this._renderer.setRenderTarget(this._screenRTT, this._clearColor, true, true);
      this._renderer.viewMatrix.set(scene.activeCamera.viewMatrix);
      this._renderer.projectionMatrix.set(scene.activeCamera.projectionMatrix);
      
      for (let n=0; n < this._shadowedNodes.length; n++) {
        let node = this._shadowedNodes[n].node;
        let type = this._shadowedNodes[n].type;
        let filterType = this._shadowedNodes[n].filterType;
        
        if (type === ShadowsHandler.ShadowMode.CAST || type === ShadowsHandler.ShadowMode.EXCLUDE) {
          continue;
        }
        
        let savedMaterials = [];
        let savedTextures = [];
        let material = spots[i].roundedSpotLight ? this._shadowMaterialsSpotLight[filterType] : this._shadowMaterials[filterType];
        
        for (let m=0; m < node.materials.length; m++) {
          savedMaterials.push(node.materials[m].shaderMaterial);
          savedTextures.push(node.materials[m].textures[0]);
          
          node.materials[m].shaderMaterial = material;
          node.materials[m].textures[0] = spots[i].shadowMap;
        }
        
        node.render();
        
        for (let m=0; m < node.materials.length; m++) {
          node.materials[m].shaderMaterial = savedMaterials[m];
          node.materials[m].textures[0] = savedTextures[m];
        }
      }
      
      this._renderer.setRenderTarget(this._colorRTT, null, false, false);
      this._screenQuad.material.textures[0] = this._screenRTT;
      this._screenQuad.material.shaderMaterial = this._simplePP;
      let blendOperation = this._screenQuad.material.blendOperation;
      this._screenQuad.material.blendOperation = Material.BlendOperation.ADD;
      this._screenQuad.render();
      this._screenQuad.material.blendOperation = blendOperation;
    }
    
    // Render all excuded and cast-only nodes
    for (let n=0; n < this._shadowedNodes.length; n++) {
      let node = this._shadowedNodes[n].node;
      let type = this._shadowedNodes[n].type;
      
      if (type !== ShadowsHandler.ShadowMode.CAST || type !== ShadowsHandler.ShadowMode.EXCLUDE) {
        continue;
      }
      
      node.render();
    }
    
    // Render screen rtt
    this._renderer.setRenderTarget(this._screenRTT, scene.clearColor, true, true);
    scene.drawAll();
    
    // Render screenquad
    this._renderer.setRenderTarget(null, scene.clearColor, true, true);
    this._screenQuad.material.textures[0] = this._screenRTT;
    this._screenQuad.material.textures[1] = this._colorRTT;
    this._screenQuad.material.shaderMaterial = this._lightModulatePP;
    this._screenQuad.render();
  }
  
  /**
   * Removes shadows to node
   * @param {SceneNode} node
   */
  removeShadowsToNode (node) {
    let index = this._findNode(node);
    
    if (index !== -1) {
      this._shadowedNodes.splice(index, 1);
    }
    
    return false;
  }
  
  addShadowsToNode (node, type, filterType) {
    let index = this._findNode(node);
    
    if (index !== -1) {
      this._shadowedNodes[index].type = type;
      this._shadowedNodes[index].filterType = filterType || this._shadowedNodes[index].filterType;
    }
    else {
      this._shadowedNodes.push(new ShadowedNode(node, type, filterType || ShadowsHandler.FilterType.EFT_NONE));
    }
  }
  
  isNodeShadowed (node) {
    return this._findNode(node);
  }
  
  _findNode (node) {
    for (let i=0; i < this._shadowedNodes.length; i++) {
      if (this._shadowedNodes[i] === node) {
        return i;
      }
    }
    
    return -1;
  }
  
  _createRenderTargets () {
    this._screenRTT = this._renderer.createRenderTarget("screenRTT", new Dimension2(this._device.canvas.width, this._device.canvas.height), true);
    this._colorRTT = this._renderer.createRenderTarget("colorRTT", new Dimension2(this._device.canvas.width, this._device.canvas.height), true);
  }
  
  _vsmBlurCallback () {
    return (renderer, service) => {
      service.setFloat("u_screenX", this._device.canvas.width);
      service.setFloat("u_screenY", this._device.canvas.height);
    };
  }
  
  _depthCallback () {
    return (renderer, service) => {
      service.setFloat("u_maxD", this._tempSpotLight.farValue);
    }
  }
  
  _shadowPassCallback () {
    return (renderer, service) => {
      this._tempWorldViewProjection.set(this._tempSpotLight.projectionMatrix)
        .multiply(this._tempSpotLight.viewMatrix).multiply(this._renderer.worldMatrix);
      
      service.setMatrix("u_worldViewProjection2", this._tempWorldViewProjection);
      service.setVector3("u_lightPos", this._tempSpotLight.position);
      service.setFloat("u_maxD", this._tempSpotLight.farValue);
      service.setFloat("u_mapRes", this._tempSpotLight.shadowMapSize);
      service.setColor4("u_lightColor", this._tempSpotLight.diffuseColor);
      service.setInt("u_shadowMapSampler", 0);
    };
  }
  
  _lightModulateCallback () {
    return (renderer, service) => {
      service.setInt("u_colorMapSampler", 0);
      service.setInt("u_screenMapSampler", 1);
    };
  }
}
