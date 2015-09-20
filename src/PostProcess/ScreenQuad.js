import { PompeiError } from '../utils/errors';

import SceneNode from '../SceneNodes/SceneNode';

import { Vector3 } from '../Core/Vector';
import Matrix from '../Core/Matrix';

import VertexBuffer from '../Core/VertexBuffer';
import Mesh from '../Mesh/Mesh.js';

export default class ScreenQuad {
  constructor (name, scene) {
    this._scene = scene;
    this._renderer = scene.renderer;
    
    let vertexBuffer = new VertexBuffer();
    vertexBuffer.positions = [
      1.0, 1.0, 0.0,
      -1.0, 1.0, 0.0,
      -1.0, -1.0, 0.0,
      1.0, -1.0, 0.0
    ];
    vertexBuffer.indices = [0, 1, 2, 0, 2, 3];
    
    this._vertexBuffer = vertexBuffer;
    
    this._mesh = new Mesh([vertexBuffer], scene);
    this._mesh.finish();
    
    this._material = null;
    this._renderTargets = [];
    
    this._worldMatrix = Matrix.Identity();
  }
  	
  get material () {
    return this._vertexBuffer.material;
  }
	
  set material (material) {
    this._vertexBuffer.material = material;
  }
  	
  render() {
    this._renderer.worldMatrix.set(this._worldMatrix);
    this._renderer.setMaterial(this._vertexBuffer.material);
    this._renderer.drawBuffer(this._vertexBuffer);
  }
}
