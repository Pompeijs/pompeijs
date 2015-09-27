import Renderer from '../Renderer';
import Texture from './Texture';

export default class CubeTexture extends Texture {
  
  constructor (renderer, name, urls, images, texture) {
    super(renderer, name, images, texture);
    
    // Configure
    this._isCube = true;
  }
  
  clone (onCloned) {
    return null;
  }
}
