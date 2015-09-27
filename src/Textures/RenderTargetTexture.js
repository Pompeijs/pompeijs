import Renderer from '../Renderer';
import Texture from './Texture';

export default class RenderTargetTexture extends Texture {
  static get BlendFactor () {
    return {
      ZERO: 0,
      ONE: 1,
      DST_COLOR: 2,
      ONE_MINUS_DST_COLOR: 3,
      SRC_COLOR: 4,
      ONE_MINUS_SRC_COLOR: 5,
      SRC_ALPHA: 6,
      ONE_MINUS_SRC_ALPHA: 7,
      DST_ALPHA: 8,
      ONE_MINUS_DST_ALPHA: 8,
      SRC_ALPHA_SATURATE: 9
    };
  }
  
  constructor (renderer, name, texture, framebuffer, depthbuffer) {
    super(renderer, name, null, texture);
    
    this._isRenderTarget = true;
    this._frameBuffer = framebuffer;
    this._depthBuffer = depthbuffer;
    
    this._blendFuncSrc = RenderTargetTexture.BlendFactor.ONE;
    this._blendFuncDest = RenderTargetTexture.BlendFactor.ONE_MINUS_SRC_ALPHA;
  }
  
  clone (onCloned) {
    return null;
  }
  
  get blendFuncSrc () {
    return this._blendFuncSrc;
  }
  
  get blendFuncDest () {
    return this._blendFuncDest;
  }
  
  get depthBuffer () {
    return this._depthBuffer;
  }
  
  get framebuffer () {
    return this._frameBuffer;
  }
}
