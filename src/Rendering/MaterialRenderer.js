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
    this._shaderMaterials = [];
    
    this._gl = gl;
    this._currentShaderMaterial = null;
  }
  
  get currentShaderMaterial () {
    return this._currentShaderMaterial;
  }
  
  set currentShaderMaterial (shaderMaterial) {
    this._currentShaderMaterial = shaderMaterial;
  }
  
  get shaderMaterials () {
    return this._shaderMaterials;
  }
  
  getShaderMaterialById (id) {
    for (let i=0; i < this._shaderMaterials.length; i++) {
      if (this._shaderMaterials[i].id === id) {
        return this._shaderMaterials[i];
      }
    }
    
    return null;
  }
  
  setInt (uniform, int) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform1i(location, int);
  }
  
  setIntArray (uniform, ints) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform1iv(location, ints);
  }
  
  setFloat (uniform, float) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform1f(location, float);
  }
  
  setFloatArray (uniform, floats) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform1fv(location, floats);
  }
  
  setMatrix (uniform, matrix) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniformMatrix4fv(location, false, matrix.m);
  }
  
  setMatrix3 (uniform, matrix) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniformMatrix3fv(location, false, matrix);
  }
  
  setMatrix2 (uniform, matrix) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniformMatrix2fv(location, false, matrix);
  }
  
  setVector3 (uniform, vector) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform3f(location, vector.x, vector.y, vector.z);
  }
  
  setVector3Array (uniform, vectors) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform3fv(location, vectors);
  }
  
  setVector2 (uniform, vector) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform2f(location, vector.x, vector.y);
  }
  
  setVector2Array (uniform, vectors) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform2fv(location, vectors);
  }
  
  setVector4 (uniform, vector) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform4f(location, vector.x, vector.y, vector.z, vector.w);
  }
  
  setVector4Array (uniform, vectors) {
    let location = this._getLocation(uniform);
    if (!location) {
      return;
    }
    
    this._gl.uniform4fv(location, vectors);
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
