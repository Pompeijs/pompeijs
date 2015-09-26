import Renderer from '../Renderer';
import Texture from './Texture';

export default class RenderTargetTexture extends Texture {
  constructor (renderer, name, texture, framebuffer) {
    super(renderer, name, null, texture);
    
    this._isRenderTarget = true;
    this._frameBuffer = framebuffer;
  }
  
  clone (onCloned) {
    return null;
  }
  
  get framebuffer () {
    return this._frameBuffer;
  }
}
