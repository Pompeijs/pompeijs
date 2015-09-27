import { PompeiError } from '../utils/errors';

import Device from '../Device';
import Renderer from '../Renderer';

import { Dimension2 } from '../Core/Vector';
import Color from '../Core/Color';

export default class PostProcessPipeline {
  
  /**
   * Constructor
   * @param {string} name
   * @param {Device} device
   */
  constructor (name, device) {
    this._name = name;
    this._postProcesses = [];
	  this._renderTargets = new Array(2);
    this._output = null;
    this._device = device;
    this._clearColor = new Color(0, 0, 0, 1);
    
    // Public members
    this.activated = true;
    
    // Finish
    this.resize();
  }
  
  get postProcesses () {
    return this._postProcesses;
  }
  
  get count () {
    return this._postProcesses.length;
  }
  
  get renderTargets () {
    return this._renderTargets;
  }
  
  get output () {
    return this._output;
  }
  
  render (screenQuad, output, source, defaultFramebuffer) {
    let alter = true;
    
    screenQuad.material.textures[1] = source;
    
    for (let i=0; i < this._postProcesses.length; i++) {
      alter = !alter;
      
      if (i == 0 && source) {
        screenQuad.material.textures[0] = source;
      }
      else {
        screenQuad.material.textures[0] = (i == 0) ? this._renderTargets[0] : this._renderTargets[Number(alter)];
      }
      screenQuad.material.shaderMaterial = this._postProcesses[i];
      
      if (i == this._postProcesses.length - 1) {
        if (defaultFramebuffer) {
          this._output = null;
        }
        else {
          this._output = output ? output : this._renderTargets[Number(!alter)];
        }
      }
      else {
        this._output = this._renderTargets[Number(!alter)];
      }
      
      this._device.renderer.setRenderTarget(this._output, this._clearColor, true, true);
      screenQuad.render();
    }
  }

  resize () {
    let device = this._device;
    let renderer = this._device.renderer;
    
    renderer.removeTexture(this._renderTargets[0]);
    renderer.removeTexture(this._renderTargets[1]);
    
    this._renderTargets[0] = renderer.createRenderTarget("RT1" + this._name, new Dimension2(device.canvas.width, device.canvas.height), true);
    this._renderTargets[1] = renderer.createRenderTarget("RT2" + this._name, new Dimension2(device.canvas.width, device.canvas.height), true);
  }
}
