import { PompeiError } from './utils/errors';

import { Vector2 } from './Core/Vector';
import Matrix from './Core/Matrix';

import VertexBuffer from './Core/VertexBuffer';

import MaterialRenderer from './Rendering/MaterialRenderer';
import SolidMaterial from './Material/SolidMaterial';

import Texture from './Textures/Texture';

export default class Renderer {
  constructor(context, options) {
    this._gl = context;
    this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this._gl.clearDepth(1.0);
    this._gl.enable(this._gl.DEPTH_TEST);
    this._gl.depthFunc(this._gl.LEQUAL);

    options = options || {};

    // Custom functions
    this.onDraw = () => {};
    
    // Transformations
    this._worldMatrix = Matrix.Identity();
    this._viewMatrix = Matrix.Identity();
    this._projectionMatrix = Matrix.Identity();
    
    // Viewport
    this._viewPort = new Vector2([0, 0]);
    
    // Rendering
    this._defaultMaterial = new SolidMaterial(this);
    this._currentMaterial = null;
    
    this._materialRenderer = new MaterialRenderer(this._gl);
    
    this._fps = 0;
    this._potentialFps = 0;
    this._currentTime = 0;
    
    // Textures
    this._textures = [];
  }

  resize(size) {
    let ratio = window.devicePixelRatio || 1.0;
    this._gl.viewport(0, 0, size.x * ratio, size.y * ratio);
  }

  begin(clearColor, clearDepthBuffer, clearBackBuffer) {
    this._currentTime = performance.now();
    
    let canvas = this.canvas;
    this._viewPort.x = canvas.clientWidth;
    this._viewPort.y = canvas.clientHeight;
    
    if (this._viewPort.x != canvas.width || this._viewPort.y != canvas.height) {
      this.resize(this._viewPort);
      canvas.width = this._viewPort.x;
      canvas.height = this._viewPort.y;
    }
    
    this._gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
    
    if (clearDepthBuffer) {
      this._gl.clear(this._gl.DEPTH_BUFFER_BIT);
    }

    if (clearBackBuffer) {
      this._gl.clear(this._gl.COLOR_BUFFER_BIT);
    }
  }

  end () {
    // Measure fps here
    let currentTime = this.now();
    let timeForFrame = currentTime - this._currentTime;
    
    this._potentialFps = ((1000.0 / 60.0) / timeForFrame) * 60.0;
    this._currentMaterial = currentTime;
  }
  
  now () {
    return performance.now();
  }
  
  fps () {
    return this._potentialFps;
  }
  
  get canvas () {
    return this._gl.canvas;
  }
  
  get materialRenderer () {
    return this._materialRenderer;
  }

  drawBuffer (vertexBuffer) {
    // Bind attributes
    let program = this._currentMaterial.program;
    
    for (let i = 0; i < this._currentMaterial.attributes.length; i++) {
      try {
        let location = this._gl.getAttribLocation(program, this._currentMaterial.attributes[i]);
        
        if (location >= 0) {
          let stride = vertexBuffer[this._currentMaterial.attributes[i] + "_stride"];
          
          this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertexBuffer[this._currentMaterial.attributes[i]]);
          this._gl.vertexAttribPointer(location, stride, this._gl.FLOAT, false, 0, 0);
        }
      }
      catch(e) {
        // Catch silently
      }
    }
    
    // Bind samplers
    for (let i=0; i < this._currentMaterial.textures.length; i++) {
      this._gl.activeTexture(this._gl["TEXTURE" + i]);
      this._gl.bindTexture(this._gl.TEXTURE_2D, this._currentMaterial.textures[i].texture);
    }
    
    // Bind indices
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, vertexBuffer.indexBuffer);
    
    // Set constants
    this._currentMaterial.onSetConstants(this, this._materialRenderer);
    
    // Draw
    let is32Bits = vertexBuffer.isIndex32Bits;
    this._gl.drawElements(this._gl.TRIANGLES, vertexBuffer.indices.length, is32Bits ? this._gl.UNSIGNED_INT : this._gl.UNSIGNED_SHORT, 0);    
  }
  
  setMaterial (material) {
    if (!material || !material.programReady) {
      this._currentMaterial = this._defaultMaterial;
    }
    else {
      this._currentMaterial = material;
    }
    
    // Configure Material Renderer
    this._materialRenderer.currentMaterial = this._currentMaterial;
    
    // Use program
    this._gl.useProgram(this._currentMaterial.program);
  }
  
  configureMaterialUniforms (material) {
    if (!material.programReady) {
      return;
    }
    
    for (let i=0; i < material.uniforms.length; i++) {
      let location = this._gl.getUniformLocation(material.program, material.uniforms[i]);
      if (!location) {
        continue;
      }
      
      material.uniformsLocations[material.uniforms[i]] = location;
    }
  }
  
  createProgram (vertexCode, pixelCode, attributes, uniforms, defines) {
    let vertex = this._gl.createShader(this._gl.VERTEX_SHADER);
    this._gl.shaderSource(vertex, defines + vertexCode);
    this._gl.compileShader(vertex);
    
    if (!this._gl.getShaderParameter(vertex, this._gl.COMPILE_STATUS)) {
      throw new PompeiError('Cannot compile vertex shader: ' + this._gl.getShaderInfoLog(vertex));
    }
    
    let pixel = this._gl.createShader(this._gl.FRAGMENT_SHADER);
    this._gl.shaderSource(pixel, defines + pixelCode);
    this._gl.compileShader(pixel);
    
    if (!this._gl.getShaderParameter(pixel, this._gl.COMPILE_STATUS)) {
      throw new PompeiError('Cannot compile pixel shader: ' + this._gl.getShaderInfoLog(pixel));
    }
    
    let program = this._gl.createProgram();
    this._gl.attachShader(program, vertex);
    this._gl.attachShader(program, pixel);
    this._gl.linkProgram(program);
    
    if (!this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
      throw new PompeiError('Cannot link vertex and pixel programs: ' + this._gl.getProgramInfoLog(program));
    }
    
    // Clean vertex and pixel shaders
    this._gl.deleteShader(vertex);
    this._gl.deleteShader(pixel);
    
    // Configure
    this._gl.useProgram(program);
    
    for (let i=0; i < attributes.length; i++) {
      let location = this._gl.getAttribLocation(program, attributes[i]);
      if (location < 0) {
        continue;
      }
      
      this._gl.enableVertexAttribArray(location);
    }
    
    return program;
  }
  
  createTexture (url, onLoaded, force) {
    // Check if exists
    if (!force) {
      for (let i=0; i < this._textures.length; i++) {
        if (this._textures[i].url === url) {
          return this._textures[i];
        }
      }
    }
    
    // Create texture
    let image = new Image();
    
    image.onload = () => {
      let texture = this._gl.createTexture();
      
      texture._baseWidth = image.width;
      texture._baseHeight = image.height;
      texture._width = image.width;
      texture._height = image.height;
      
      this._gl.bindTexture(this._gl.TEXTURE_2D, texture);
      this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, false);
      this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, image);
      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
      this._gl.bindTexture(this._gl.TEXTURE_2D, null);
      
      this._textures.push(new Texture(this, url, image, texture));
      
      if (onLoaded) {
        onLoaded(this._textures[this._textures.length - 1]);
      }
    };
    
    image.onerror = (error) => {
      console.warn('Cannot load texture located at ' + url);
    };
    
    image.src = url;
  }
  
  createVertexBuffer(vertexBuffer) {
    if (!(vertexBuffer instanceof VertexBuffer)) {
      throw new PompeiError('Bad argument: vertexBuffer must be a VertexBuffer. createVertexBuffer (vertexBuffer)');
    }
    
    let onBindBuffer = (buffer, type) => {
      let vbo = this._gl.createBuffer();
      
      this._gl.bindBuffer(type, vbo);
      this._gl.bufferData(type, new Float32Array(buffer), this._gl.STATIC_DRAW);
      
      return vbo;
    };
    
    if (vertexBuffer.positions.length > 0) {
      vertexBuffer._vertexBuffer = onBindBuffer(vertexBuffer.positions, this._gl.ARRAY_BUFFER);
    }
    if (vertexBuffer.normals.length > 0) {
      vertexBuffer._normalBuffer = onBindBuffer(vertexBuffer.normals, this._gl.ARRAY_BUFFER);
    }
    if (vertexBuffer.uvs.length > 0) {
      vertexBuffer._uvBuffer = onBindBuffer(vertexBuffer.uvs, this._gl.ARRAY_BUFFER);
    }
    if (vertexBuffer.colors.length > 0) {
      vertexBuffer._colorBuffer = onBindBuffer(vertexBuffer.colors, this._gl.ARRAY_BUFFER);
    }
  }

  createIndexBuffer (vertexBuffer) {
    let vbo = this._gl.createBuffer();
    let indices = vertexBuffer.indices;
    let is32Bits = false;

    for (let i = 0; i < indices.length; i++) {
      if (indices[i] >= 65536) {
        is32Bits = true;
        break;
      }
    }
    
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, vbo);
    this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, is32Bits ? new Uint32Array(indices) : new Uint16Array(indices), this._gl.STATIC_DRAW);
    
    vertexBuffer._indexBuffer = vbo;
    vertexBuffer.indexIs32Bits = is32Bits;
  }
  
  removeBuffer (vertexBuffer) {
    this._gl.deleteBuffer(vertexBuffer._vertexBuffer);
    this._gl.deleteBuffer(vertexBuffer._indexBuffer);
    this._gl.deleteBuffer(vertexBuffer._normalBuffer);
    this._gl.deleteBuffer(vertexBuffer._uvBuffer);
  }
  
  // Programs
  get defaultMaterial () {
    return this._defaultMaterial;
  }
  
  // Transformations
  get worldMatrix() {
    return this._worldMatrix;
  }

  get viewMatrix() {
    return this._viewMatrix;
  }

  get projectionMatrix() {
    return this._projectionMatrix;
  }
}
