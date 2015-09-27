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
    this.shaderMaterial = null;
    this.backFaceCulling = true;
    this.shininess = 1;
    this.zBuffer = true;
    this.zWrite = true;
    this.blendOperation = Material.BlendOperation.NONE;
    
    this._textures = [];
  }
  
  addTexture (texture) {
    this._textures.push(texture);
  }
  
  setTexture (indice, texture) {
    this._textures[indice] = texture;
  }
  
  get textures () {
    return this._textures;
  }
}
