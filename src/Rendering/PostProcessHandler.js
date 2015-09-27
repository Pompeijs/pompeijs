import { PompeiError } from '../utils/errors';

import ScreenQuad from '../PostProcess/ScreenQuad';

export default class PostProcessHandler {
  constructor (device, texturesCount) {
	  this._postProcessPipelines = [];
    this._screenQuad = new ScreenQuad("PostProcessHandlerSQ", device.scene, (!texturesCount || texturesCount < 2) ? 2 : texturesCount);
  }
  
  get postProcessPipelines () {
    return this._postProcessPipelines;
  }
  
  get count () {
    return this._postProcessPipelines.length;
  }
  
  render (scene, output, source) {
    // Select activated
    let activated = [];
    for (let i=0; i < this._postProcessPipelines.length; i++) {
      let pipeline = this._postProcessPipelines[i];
      
      if (pipeline.activated) {
        activated.push(pipeline);
      }
    }
    
    // Render
    for (let i=0; i < activated.length; i++) {
      activated[i].render(this._screenQuad,
        i == activated.length - 1 ? output : null,
        i > 0 ? activated[i-1].output : null,
        i == activated.length - 1 ? true : false);
    }
  }
  
  resize () {
    for (let i=0; i < this._postProcessPipelines.length; i++) {
      this._postProcessPipelines[i].resize();
    }
  }
}
