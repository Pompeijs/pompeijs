import Renderer from '../Renderer';

export default class Texture {
  constructor (renderer, url, image, texture) {
    this._renderer = renderer;
    this._url = url;
    this._texture = texture;
    this._image = image;
    this._isCanvas = image instanceof HTMLCanvasElement;
    this._isRenderTarget = false;
  }
  
  clone (onCloned) {
    return this._renderer.createTexture(this._url, onCloned, true);
  }
  
  get isCanvas () {
    return this._isCanvas;
  }
  
  get renderer () {
    return this._renderer;
  }
  
  get url () {
    return this._url;
  }
  
  get texture () {
    return this._texture;
  }
  
  get image () {
    return this._image;
  }
  
  get canvas () {
    return this._image;
  }
  
  get isRenderTarget () {
    return this._isRenderTarget;
  }
}
