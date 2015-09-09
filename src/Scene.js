import { PompeiError } from './utils/errors';
import Renderer from './Renderer';
import SceneNode from './SceneNodes/SceneNode';

export default class Scene {
  constructor(renderer, options) {
    if (!renderer || !(renderer instanceof Renderer)) {
      throw new PompeiError('Bad parameters for Scene(renderer, [options])');
    }
    options = options || {};
    
    this.activeCamera = null;

    this._renderer = renderer;
    
    this._rootSceneNode = new SceneNode("root", this);
    this._rootSceneNode.parent = null;
  }
  
  get renderer () {
    return this._renderer;
  }
  
  get rootSceneNode () {
    return this._rootSceneNode;
  }
  
  now () {
    return this._renderer.now();
  }

  drawAll () {
    if (!this._renderer.defaultMaterial.programReady) {
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
