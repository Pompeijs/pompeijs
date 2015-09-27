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
    this._lastWidth = this._canvas.width;
    this._lastHeight = this._canvas.height;
    
    this._renderer = new Renderer(context, options);
    this._scenes = [];
    this._scenes.push(new Scene(this, options));
    
    // Configure events
    window.addEventListener('resize', (event) => {
      this.resize();
    });
    
    // Custom functions
    this.onPreUpdate = () => { };
    this.onPostUpdate = () => { };
  }
  
  resize (event) {
    if (this.scene.shadowsHandler) {
      this.scene.shadowsHandler.resize();
    }
    
    this._renderer.resize(new Vector2(this._canvas.width, this._canvas.height));
    
    if (this.scene.activeCamera) {
      this.scene.activeCamera.aspect = this._canvas.width / this._canvas.height;
    }
  }
  
  update () {
    window.requestAnimationFrame(this.update.bind(this));
    
    if (this._canvas.height !== this._lastHeight || this._canvas.width !== this._lastWidth) {
      this.resize();
      this._lastHeight = this._canvas.height;
      this._lastWidth = this._canvas.width;
    }
    
    this._renderer.begin(this.scene.clearColor, true, true);
    this.onPreUpdate();
    
    if (this.scene.shadowsHandler) {
      this.scene.shadowsHandler.update(this.scene);
    }
    else {
      this.scene.drawAll();
    }
    
    this.onPostUpdate();
    this._renderer.end();
  }
  
  get renderer () {
    return this._renderer;
  }

  get scene () {
    return this._scenes[0];
  }
  
  get canvas () {
    return this._canvas;
  }
  
  get pointerX () {
    return 0;
  }
  
  get pointerY () {
    return 0;
  }
}
