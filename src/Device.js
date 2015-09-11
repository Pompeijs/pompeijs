import Renderer from './Renderer';
import Scene from './Scene';

import { Vector2 } from './Core/Vector';

import { PompeiError, WebGLSupportError } from './utils/errors';

export default class Device {
  constructor (canvas, options) {
    if (!(canvas && typeof canvas.getContext === 'function')) {
      throw new PompeiError('Bad Parameters');
    }
    
    let context = canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options);
    if (!context) {
      throw new PompeiError('Cannot get WebGL context. constructor (canvas, options)');
    }
    
    this._options = options || {};
    this._canvas = canvas;
    
    this._renderer = new Renderer(context, options);
    this._scene = new Scene(this.renderer, options);
  }
  
  get renderer () {
    return this._renderer;
  }

  get scene () {
    return this._scene;
  }
  
  get pointerX () {
    return 0;
  }
  
  get pointerY () {
    return 0;
  }
}
