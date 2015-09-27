import { PompeiError } from './utils/errors';

import Device from './Device';
import Renderer from './Renderer';

import Color from './Core/Color';

import CameraSceneNode from './SceneNodes/CameraSceneNode';
import SceneNode from './SceneNodes/SceneNode';

import MeshCache from './Mesh/MeshCache';
import Mesh from './Mesh/Mesh';
import GeometryCreator from './Mesh/GeometryCreator';

import Loader from './Loaders/Loader';

export default class Scene {
  
  static get SceneNodeType () {
    return {
      ANY_SCENE_NODE: 0,
      
      MESH_SCENE_NODE: 1,
      CAMERA_SCENE_NODE: 2,
      LIGHT_SCENE_NODE: 3,
      SPOT_LIGHT_SCENE_NODE: 4,
      
      UNKNOWN: -1
    }
  }
  
  constructor(device, options) {
    if (!device || !(device instanceof Device)) {
      throw new PompeiError('Bad parameters for Scene(device, renderer, [options])');
    }
    
    options = options || {};

    this._renderer = device.renderer;
    
    // Meshes
    this._geometryCreator = null;
    
    // Loaders
    this._loader = new Loader(device);
    
    // Meshes
    this._meshCache = new MeshCache();
    
    // Scene node lists
    this._activeCamera = null;
    
    this._skyboxes = [];
    this._solidMeshes = [];
    this._transparentMeshes = [];
    this._lights = [];
    
    // Scene nodes
    this._rootSceneNode = new SceneNode("root", this);
    this._rootSceneNode.parent = null;
    
    this._currentSceneNode = null;
    
    // Options
    this._clearColor = new Color(0, 0, 0, 1);
    this._ambientColor = new Color(1, 1, 1, 1);
    
    // Public members
    this.shadowsHandler = null;
  }
  
  get renderer () {
    return this._renderer;
  }
  
  get geometryCreator () {
    if (!this._geometryCreator) {
      this._geometryCreator = new GeometryCreator(this);
    }
    
    return this._geometryCreator;
  }
  
  get loader () {
    return this._loader;
  }
  
  get meshCache () {
    return this._meshCache;
  }
  
  get rootSceneNode () {
    return this._rootSceneNode;
  }
  
  get currentSceneNode () {
    return this._currentSceneNode;
  }
  
  get activeCamera () {
    return this._activeCamera;
  }
  
  get lights () {
    return this._lights;
  }
  
  get clearColor () {
    return this._clearColor;
  }
  
  set clearColor (clearColor) {
    if (!(clearColor instanceof Color)) {
      throw new PompeiError('Bad parameter: clearColor must be a Color. set clearColor (clearColor)');
    }
    
    this._clearColor = clearColor;
  }
  
  get ambientColor () {
    return this._ambientColor;
  }
  
  set ambientColor (ambientColor) {
    if (!(ambientColor instanceof Color)) {
      throw new PompeiError('Bad parameter: ambientColor must be a Color. set ambientColor (ambientColor)');
    }
    
    this._ambientColor = ambientColor;
  }
  
  set activeCamera (activeCamera) {
    if (!(activeCamera instanceof CameraSceneNode)) {
      throw new PompeiError('Bad parameter: activeCamera must be a CameraSceneNode. set activeCamera (activeCamera)');
    }
    
    this._activeCamera = activeCamera;
  }
  
  now () {
    return this._renderer.now();
  }
  
  update () {
    window.requestAnimationFrame(this.update);
    this._renderer.begin(this._clearColor, true, true);
    this.drawAll();
    this._renderer.end();
  }

  drawAll () {
    if (!this._renderer.defaultMaterial.shaderMaterial.programReady) {
      return;
    }
    
    // Render active camera
    if (this._activeCamera) {
      this._activeCamera.render();
    }

    // Sort scene nodes here

    // Render
    this.drawSceneNode(this._rootSceneNode, true);
  }

  drawSceneNode (node, drawChildren) {
    if (!drawChildren) {
      drawChildren = false;
    }
    
    this._currentSceneNode = node;

    if (!(node instanceof CameraSceneNode)) {
      node.render();
    }

    if (!drawChildren) {
      return;
    }

    for (let i=0; i < node.children.length; i++) {
      this.drawSceneNode(node.children[i], drawChildren);
    }
  }
  
  getSceneNodesFromType (type, start, result) {
    if (!start) {
		  start = this._rootSceneNode;
    }

    if (start.type === type || type === Scene.SceneNodeType.ANY_SCENE_NODE) {
      result.push(start);
    }
    
    for (let i=0; i < start.children.length; i++) {
      this.getSceneNodesFromType(type, start.children[i], result);
    }
  }
  
  getNodeById (id, start) {
    if (!start) {
		  start = this._rootSceneNode;
    }

    if (start.id === id) {
      return start;
    }
    
    for (let i=0; i < start.children.length; i++) {
      let node = this.getNodeById(id, start.children[i]);
      if (node) {
        return node;
      }
    }
  
    return null;
  }
}
