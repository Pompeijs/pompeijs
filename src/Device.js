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
    if (this.scene.postProcessHandler) {
      this.scene.postProcessHandler.resize();
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
    
    // Begin
    this._renderer.begin(this.scene.clearColor, true, true);
    this.onPreUpdate();
    
    // Select output framebuffer
    let outputTarget = null;
    
    if (this.scene.postProcessHandler) {
      let postProcessRoutineSize = this.scene.postProcessHandler.count;
      if (postProcessRoutineSize > 0) {
        for (let i=0; i < postProcessRoutineSize; i++) {
          if (this.scene.postProcessHandler.postProcessPipelines[i].activated) {
            outputTarget = this.scene.postProcessHandler.postProcessPipelines[i].renderTargets[0];
            break;
          }
        }
      }
    }
    
    // Render scene
    if (this.scene.shadowsHandler) {
      this.scene.shadowsHandler.update(this.scene, outputTarget);
    }
    else {
      this.scene.drawAll(outputTarget);
    }
    
    // Render post-processes
    if (outputTarget) {
      this.scene.postProcessHandler.render(this.scene, null);
    }
    
    // End
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
