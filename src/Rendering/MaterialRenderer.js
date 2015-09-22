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
    this._currentShaderMaterial = null;
  }
  
  get currentShaderMaterial () {
    return this._currentShaderMaterial;
  }
  
  set currentShaderMaterial (shaderMaterial) {
    this._currentShaderMaterial = shaderMaterial;
  }
  
  setInt (uniform, int) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform1i(location, int);
  }
  
  setFloat (uniform, float) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform1f(location, float);
  }
  
  setMatrix (uniform, matrix) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniformMatrix4fv(location, false, matrix.m);
  }
  
  setVector3 (uniform, vector) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform3f(location, false, vector.x, vector.y, vector.z);
  }
  
  setVector2 (uniform, vector) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform2f(location, vector.x, vector.y);
  }
  
  setVector4 (uniform, vector) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform4f(location, vector.x, vector.y, vector.z, vector.w);
  }
  
  setColor3 (uniform, color) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform3f(location, color.r, color.g, color.b);
  }
  
  setColor4 (uniform, color) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform4f(location, color.r, color.g, color.b, color.a);
  }
  
  _getLocation (uniform) {
    return this._currentShaderMaterial.uniformsLocations[uniform];
  }
}
