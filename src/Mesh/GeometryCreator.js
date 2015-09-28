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
  
  invertFaces (mesh, invertNormals) {
    if (!(mesh instanceof Mesh)) {
      throw new PompeiError('Bad argument. mesh must be a Mesh. inverFaces (mesh)');
    }
    
    for (let i=0; i < mesh.vertexBuffers.length; i++) {
      let indices = mesh.vertexBuffers[i].indices;
      
      for (let j=0; j < indices.length; j+=3) {
        let temp = indices[j + 1];
        indices[j + 1] = indices[j + 2];
        indices[j + 2] = temp;
      }
    }
    
    if (invertNormals) {
      this.invertNormals(mesh);
    }
    else {
      mesh.finish();
    }
  }
  
  invertNormals (mesh) {
    if (!(mesh instanceof Mesh)) {
      throw new PompeiError('Bad argument. mesh must be a Mesh. inverFaces (mesh)');
    }
    
    for (let i=0; i < mesh.vertexBuffers.length; i++) {
      let normals = mesh.vertexBuffers[i].normals;
      
      for (let j = 0; j < normals.length; j++) {
          normals[j] *= -1;
      }
    }
    
    mesh.finish();
  }
  
  createCubeMesh (size) {
    let vertexBuffer = new VertexBuffer();
    
    vertexBuffer.indices = [
      0,1,2,   0,2,3,
      1,4,5,   1,5,2,
      4,7,6,   4,6,5, 
      7,0,3,   7,3,6,
      9,2,5,   9,5,8,
      0,10,11, 0,7,10
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
      1, 1, 1,
      -1, 1, 1,
      -1, -1, 1,
      1, -1, 1,
      -1,1, -1,
      -1, -1, -1,
      1, -1, -1,
      1,1, -1,
      1, -1, -1,
      1, -1, 1,
      -1, 1, -1,
      -1, 1, 1
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
