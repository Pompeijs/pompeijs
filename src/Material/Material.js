import { PompeiError } from '../utils/errors';
import Renderer from '../Renderer';

import Core from '../Core/Core.js';

export default class Material {
  constructor (other) {
    this._shaderMaterial = null;
    this._backFaceCulling = true;
    
    this._textures = [];
  }
  
  addTexture (texture) {
    this._textures.push(texture);
  }
  
  setTexture (indice, texture) {
    this._textures[indice] = texture;
  }
  
  get shaderMaterial () {
    return this._shaderMaterial;
  }
  
  set shaderMaterial (shaderMaterial) {
    this._shaderMaterial = shaderMaterial;
  }
  
  get textures () {
    return this._textures;
  }
}
