import { PompeiError } from '../utils/errors';
import Renderer from '../Renderer';

import Core from '../Core/Core.js';

import Color from '../Core/Color';

export default class Material {
  static get BlendOperation () {
    return {
      NONE: 0,
      ADD: 1,
      SUBTRACT: 2,
      REV_SUBTRACT: 3
    };
  }
  
  constructor (other) {
    this._textures = [];
    
    // Public members
    this.shaderMaterial = null;
    this.backFaceCulling = true;
    this.frontFaceCulling = false;
    this.shininess = 1;
    this.zBuffer = true;
    this.zWrite = true;
    this.blendOperation = Material.BlendOperation.NONE;
  }
  
  setUsedTextures (count) {
    if (count < 0) {
      throw new PompeiError('Bad argument. count must be > 0. setUsedTextures (count)');
    }
    
    this._textures = [];
    for (let i=0; i < count; i++) {
      this._textures.push(null);
    }
  }
  
  addTexture (texture) {
    this._textures.push(texture);
    return this._textures.length - 1;
  }
  
  setTexture (indice, texture) {
    this._textures[indice] = texture;
  }
  
  get textures () {
    return this._textures;
  }
}
