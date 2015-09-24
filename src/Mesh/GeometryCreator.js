import { PompeiError } from '../utils/errors';

import Scene from '../Scene';

import { Vector3 } from '../Core/Vector';
import Plane from '../Core/Plane';

import Vertex from '../Core/Vertex';
import VertexBuffer from '../Core/VertexBuffer';
import Mesh from './Mesh';

export default class GeometryCreator {
  /**
   * @constructor
   * @param {Scene} scene.
   */
  constructor (scene) {
    if (!(scene instanceof Scene)) {
      throw new PompeiError('Bad argument: scene must be a Scene. constructor (scene)');
    }
    
    this._scene = scene;
  }
  
  createCubeMesh (size) {
    let vertexBuffer = new VertexBuffer();
    
    vertexBuffer.indices = [
      0,2,1,   0,3,2,
      1,5,4,   1,2,5,
      4,6,7,   4,5,6, 
      7,3,0,   7,6,3,
      9,5,2,   9,8,5,
      0,11,10, 0,10,7
    ];
    vertexBuffer.positions = [
      0, 0, 0,
      1, 0, 0,
      1, 1, 0,
      0, 1, 0,
      1, 0, 1,
      1, 1, 1,
      0, 1, 1,
      0, 0, 1,
      0, 1, 1,
      0, 1, 0,
      1, 0, 1,
      1, 0, 0
    ];
    vertexBuffer.normals = [
      -1, -1, -1,
      1, -1, -1,
      1, 1, -1,
      -1, 1, -1,
      1,-1, 1,
      1, 1, 1,
      -1, 1, 1,
      -1,-1, 1,
      -1, 1, 1,
      -1, 1, -1,
      1, -1, 1,
      1, -1, -1
    ];
    vertexBuffer.uvs = [
      0, 1,
	    1, 1,
	    1, 0,
	    0, 0,
	    0, 1,
	    0, 0,
	    1, 0,
	    1, 1,
	    0, 1,
	    1, 1,
	    1, 0,
	    0, 0,
    ];
    
    for (let i=0; i < vertexBuffer.positions.length; i++) {
      vertexBuffer.positions[i] -= 0.5;
      vertexBuffer.positions[i] *= size;
    }
    
    let mesh = new Mesh([vertexBuffer], this._scene);
    mesh.finish();
    
    return mesh;
  }
  
  createPlaneMesh (size, tile) {
    let vertexBuffer = new VertexBuffer();
    
    vertexBuffer.indices = [
      0,2,1,   0,3,2,
    ];
    
    vertexBuffer.positions = [
      -1, 0, -1,
      -1, 0, 1,
      1, 0, 1,
      1, 0, -1,
    ];
    
    vertexBuffer.normals = [
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
    ];
    
    vertexBuffer.uvs = [
      0, 1,
	    1, 1,
	    1, 0,
	    0, 0,
    ];
    
    for (let i=0; i < vertexBuffer.positions.length; i++) {
      vertexBuffer.positions[i] *= size || 1.0;
    }
    for (let i=0; i < vertexBuffer.uvs.length; i++) {
      vertexBuffer.uvs[i] *= tile || 1.0;
    }
    
    let mesh = new Mesh([vertexBuffer], this._scene);
    mesh.finish();
    
    return mesh;
  }
}
