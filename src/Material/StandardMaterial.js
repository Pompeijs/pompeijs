import { PompeiError } from '../utils/errors';

import Renderer from '../Renderer';
import ShaderMaterial from './ShaderMaterial';

import Color from '../Core/Color';

import vertexShader from '../Shaders/Standard.vertex.glsl';
import pixelShader from '../Shaders/Standard.fragment.glsl';

export default class StandardMaterial extends ShaderMaterial {
  constructor (scene) {
    super(scene.renderer,
      vertexShader,
      pixelShader,
      // Attributes
      ["a_position", "a_normal", "a_uv"],
      // Uniforms
      ["u_worldViewProjection", "u_world", "u_cameraPosition", "u_lightPositions",
      "u_lightColors", "u_normal", "u_diffuse", "u_reflection", "u_lightSpecularPowers",
      "u_lightIntensities", "u_specularStrength", "u_ambient",
      "u_bumpStrength", "u_reflectionStrength"],
      // Defines
      ["NUMBER_OF_LIGHTS 1"],
      false
    );
    
    this.compile();
    
    this._scene = scene;
    this._lastNumberOfLights = 1;
    
    // Public members
    this.bumpStrength = 1;
    this.specularStrength = 1;
    this.reflectionStrength = 1;
  }
  
  onPreRender (renderer) {
    const lightsCount = this._scene.lights.length || 1;
    
    if (this._lastNumberOfLights !== lightsCount) {
      renderer.removeProgram(this._program);
      this._defines = ["NUMBER_OF_LIGHTS " + lightsCount];
      
      this.compile();
      this._lastNumberOfLights = lightsCount;
    }
  }
  
  onSetConstants (renderer, service) {
	  super.onSetConstants(renderer, service);
    
    // Textures
    service.setInt("u_diffuse", 0);
    service.setInt("u_normal" , 1);
    service.setInt("u_reflection", 2);
    
    // Lights
    let positions = [];
    let colors = [];
    let specularPowers = [];
    let intensities = [];
    
    for (let i=0; i < this._scene.lights.length; i++) {
      let light = this._scene.lights[i];
      
      positions = positions.concat(light.position.toArray());
      colors = colors.concat(light.diffuseColor.toArray());
      specularPowers.push(light.specularPower);
      intensities.push(light.intensity);
    }
    
    service.setMatrix("u_world", renderer.worldMatrix);
    service.setVector3("u_cameraPosition", this._scene.activeCamera.position);
    
    if (this._scene.lights.length > 0) {
      service.setVector3Array("u_lightPositions", positions);
      service.setVector4Array("u_lightColors", colors);
      service.setFloatArray("u_lightSpecularPowers", specularPowers);
      service.setFloatArray("u_lightIntensities", intensities);
    }
    
    service.setFloat("u_specularStrength", this.specularStrength);
    service.setColor4("u_ambient", this._scene.ambientColor);
    service.setFloat("u_bumpStrength", this.bumpStrength);
    service.setFloat("u_reflectionStrength", this.reflectionStrength);
  }
}
