import { PompeiError } from '../utils/errors';
import Renderer from '../Renderer';

import Core from '../Core/Core.js';
import Matrix from '../Core/Matrix';

export default class ShaderMaterial {
  constructor (renderer, vertexPath, pixelPath, attributes, uniforms, defines, fromDOM) {
    if (!(renderer instanceof Renderer)) {
      throw new PompeiError('Bad parameters: renderer is needed. constructor (renderer, vertexPath, pixelPath, attributes, uniforms)');
    }
    if (!vertexPath || !pixelPath) {
      console.warn(
        'Either vertexPath or pixelPath is undefined. Will use default shaders.'
      );
      throw new PompeiError('Bad parameters: vertexPath and pixelPath are needed. constructor (renderer, vertexPath, pixelPath, attributes, uniforms)');
    }
    if (!Array.isArray(attributes)) {
      throw new PompeiError('Bad parameter: attributes must be an array of string. constructor (renderer, vertexPath, pixelPath, attributes, uniforms)');
    }
    if (uniforms && !Array.isArray(uniforms)) {
      throw new PompeiError('Bad parameter: uniforms must be an array of string. constructor (renderer, vertexPath, pixelPath, attributes, uniforms)');
    }

    this._renderer = renderer;

    this._vertexPath = vertexPath;
    this._pixelPath = pixelPath;

    this._defines = defines ? defines : [];
    this._attributes = attributes;
    this._uniforms = uniforms ? uniforms : [];
    
    this._fromDOM = fromDOM;
    this._programReady = false;
    
    this._program = null;
    this._uniformsLocations = { };
  }

  get renderer () {
    return this._renderer;
  }

  get program () {
    return this._program;
  }

  get defines () {
    return this._defines;
  }

  get attributes () {
    return this._attributes;
  }
  
  get uniforms () {
    return this._uniforms;
  }
  
  get programReady () {
    return this._programReady;
  }
  
  get uniformsLocations () {
    return this._uniformsLocations;
  }
  
  compile () {
    let vertex = this._vertexPath;
    let pixel = this._pixelPath;
    
    if (this._fromDOM) {
      vertex = document.getElementById(this._vertexPath).innerText;
      pixel = document.getElementById(this._pixelPath).innerText;      
    }

    if (!vertex || !pixel) {
      throw new PompeiError(
        'No vertex nor pixel shader data in Material.compile()'
      );
    }

    this._createProgram(vertex, pixel);
    this._renderer.configureMaterialUniforms(this);
  }
  
  remove () {
    
  }
  
  // Can be overrided
  onSetConstants (renderer, service) {
    let worldViewProjection = Matrix.Identity();
    worldViewProjection
      .multiply(renderer.projectionMatrix)
      .multiply(renderer.viewMatrix)
      .multiply(renderer.worldMatrix);
      
    service.setMatrix('u_worldViewProjection', worldViewProjection);
  }
  
  // To be overidded
  onPreRender (renderer)
  { }
  
  _createProgram (vertexCode, pixelCode) {
    let defines = '';
    for (let i=0; i < this._defines.length; i++) {
      defines += '#define ' + this._defines[i] + '\n';
    }
    
    this._program = this._renderer.createProgram(
      vertexCode, pixelCode, this._attributes, this._uniforms, defines
    );
    this._programReady = true;
  }
}
