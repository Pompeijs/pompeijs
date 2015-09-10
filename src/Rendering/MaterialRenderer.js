import { PompeiError } from '../utils/errors';

import { Vector3, Vector2 } from '../Core/Vector';
import Matrix from '../Core/Matrix';
import Texture from '../Textures/Texture';

export default class MaterialRenderer {
  /**
   * @constructor
   * @param {WebGLRenderingContext} gl
   */
  constructor (gl) {
    if (!(gl instanceof WebGLRenderingContext)) {
      throw new PompeiError('Bad argument: gl must be a WebGLRenderingContext. constructor(gl)');
    }

    this._gl = gl;
    this._currentMaterial = null;
  }
  
  get currentMaterial () {
    return this._currentMaterial;
  }
  
  set currentMaterial (currentMaterial) {
    this._currentMaterial = currentMaterial;
  }
  
  setInt (uniform, int) {
    let location = this._currentMaterial.uniformsLocations[uniform];
    if (!location) {
      return;
    }
    
    this._gl.uniform1i(location, int);
  }
  
  setMatrix (uniform, matrix) {
    let location = this._currentMaterial.uniformsLocations[uniform];
    if (!location) {
      return;
    }
    
    this._gl.uniformMatrix4fv(location, false, matrix.m);
  }
  
}
