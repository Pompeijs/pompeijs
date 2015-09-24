import { PompeiError } from '../utils/errors';

import Mesh from './Mesh';

export default class MeshCache {
  
  constructor () {
    this._meshes = [];
  }
  
  get meshes () {
    return this._meshes;
  }
  
  addMesh (mesh) {
    if (!(mesh instanceof Mesh)) {
      throw new PompeiError('Bad argument: mesh must be a Mesh. addMesh (name, url, mesh)');
    }
    
    this._meshes.push(mesh);
  }
  
  removeMesh (mesh) {
    for (let i=0; i < this._meshes.length; i++) {
      let mesh = this._meshes[i];
      
      if (mesh.mesh === mesh) {
        this._meshes.splice(i, 1);
        return true;
      }
    }
    
    return false;
  }
  
  getMesh (mesh) {
    for (let i=0; i < this._meshes.length; i++) {
      if (this._meshes[i] === mesh) {
        return this._meshes[i];
      }
    }
    
    return null;
  }
  
  getMeshByName (name) {
    return this._applySearch("name", name);
  }
  
  getMeshById (id) {
    return this._applySearch("id", id);
  }
  
  _applySearch (property, value) {
    for (let i=0; i < this._meshes.length; i++) {
      if (this._meshes[i][property] === value) {
        return this._meshes[i];
      }
    }
    
    return null;
  }
}
