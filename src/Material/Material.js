import { PompeiError } from '../utils/errors';
import Renderer from '../Renderer';

import Core from '../Core/Core.js';

import Color from '../Core/Color';

export default class Material {
  constructor (other) {
    this.shaderMaterial = null;
    this.backFaceCulling = true;
    this.shininess = 1;
    
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
