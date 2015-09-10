import { PompeiError } from '../utils/errors';
import VertexBuffer from '../Core/VertexBuffer';

export default class Mesh {
  /**
   * @constructor
   * @param {object} geometry.
   * @param {object} options
   */
  constructor(vertexBuffers, scene) {
    if (!Array.isArray(vertexBuffers)) {
      throw new PompeiError('Bad argument: vertexBuffers must be an array. constructor(vertexBuffers)');
    }

    this._vertexBuffers = vertexBuffers;
    this._scene = scene;
    this._renderer = scene.renderer;
  }
  
  get vertexBuffers () {
    return this._vertexBuffers;
  }

  addVertexBuffer (vertexBuffer) {
    if (!(vertexBuffer instanceof VertexBuffer)) {
      throw new PompeiError('Bad argument: vertexBuffer must be an instance of VertexBuffer. addVertexBuffer (vertexBuffer)');
    }

    this._vertexBuffers.push(vertexBuffer);
  }
  
  removeVertexBuffer (vertexBuffer) {
    const indice = this._vertexBuffers.indexOf(vertexBuffer);
    
    if (indice !== -1) {
      this._vertexBuffers.splice(indice, 1);
      return true;
    }

    return false;
  }
  
  finish () {
    for (let i=0; i < this._vertexBuffers.length; i++) {
      let vertexBuffer = this._vertexBuffers[i];
      this._renderer.createVertexBuffer(vertexBuffer);
      this._renderer.createIndexBuffer(vertexBuffer);
    }
  }
}
