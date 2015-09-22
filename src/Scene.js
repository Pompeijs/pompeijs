import { PompeiError } from './utils/errors';

import Renderer from './Renderer';

import Color from './Core/Color';

import CameraSceneNode from './SceneNodes/CameraSceneNode';
import SceneNode from './SceneNodes/SceneNode';

export default class Scene {
  constructor(renderer, options) {
    if (!renderer || !(renderer instanceof Renderer)) {
      throw new PompeiError('Bad parameters for Scene(renderer, [options])');
    }
    options = options || {};

    this._renderer = renderer;
    
    this._activeCamera = null;
    
    this._rootSceneNode = new SceneNode("root", this);
    this._rootSceneNode.parent = null;
    
    this._clearColor = new Color([0, 0, 0, 1]);
  }
  
  get renderer () {
    return this._renderer;
  }
  
  get rootSceneNode () {
    return this._rootSceneNode;
  }
  
  get activeCamera () {
    return this._activeCamera;
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

    // Sort scene nodes here

    // Render
    this.drawSceneNode(this._rootSceneNode, true);
  }

  drawSceneNode (node, drawChildren) {
    if (!drawChildren) {
      drawChildren = false;
    }

    node.render();

    if (!drawChildren) {
      return;
    }

    for (var i=0; i < node.children.length; i++) {
      this.drawSceneNode(node.children[i], drawChildren);
    }
  }
}
