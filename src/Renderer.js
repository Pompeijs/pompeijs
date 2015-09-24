import { PompeiError } from './utils/errors';

import Core from './Core/Core';

import { Vector2 } from './Core/Vector';
import { Dimension2 } from './Core/Vector';
import Matrix from './Core/Matrix';

import VertexBuffer from './Core/VertexBuffer';

import MaterialRenderer from './Rendering/MaterialRenderer';
import Material from './Material/Material';
import SolidMaterial from './Material/SolidMaterial';

import Texture from './Textures/Texture';
import RenderTargetTexture from './Textures/RenderTargetTexture';

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
    this._viewPort = new Vector2(0, 0);
    
    // Rendering
    this._defaultMaterial = new Material();
    this._defaultMaterial.shaderMaterial = new SolidMaterial(this);
    this._currentMaterial = null;
    
    this._materialRenderer = new MaterialRenderer(this._gl);
    
    this._currentRenderTarget = null;
    
    this._fps = 0;
    this._potentialFps = 0;
    this._currentTime = 0;
    
    // Textures
    this._textures = [];
    this._defaultTexture = null;
    this.createCustomTexture(new Dimension2(1, 1), (texture) => {
      this._defaultTexture = texture;
    });
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
    this._currentTime = currentTime;
  }
  
  now () {
    return performance.now();
  }
  
  fps () {
    return this._potentialFps;
  }

  drawBuffer (vertexBuffer) {
    // Bind attributes
    let shaderMaterial = this._materialRenderer._currentShaderMaterial;
    let program = shaderMaterial.program;
    
    for (let i = 0; i < shaderMaterial.attributes.length; i++) {
      try {
        if (!vertexBuffer[shaderMaterial.attributes[i]]) {
          continue;
        }
        
        let location = this._gl.getAttribLocation(program, shaderMaterial.attributes[i]);
        
        if (location >= 0) {
          let stride = vertexBuffer[shaderMaterial.attributes[i] + "_stride"];
          
          this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertexBuffer[shaderMaterial.attributes[i]]);
          this._gl.vertexAttribPointer(location, stride, this._gl.FLOAT, false, 0, 0);
        }
      }
      catch(e) {
        // Catch silently
      }
    }
    
    // Bind samplers
    const textureLength = this._currentMaterial.textures.length;
    if (textureLength === 0) {
      this._gl.activeTexture(this._gl.TEXTURE0);
      this._gl.bindTexture(this._gl.TEXTURE_2D, this._defaultTexture ? this._defaultTexture.texture : null);
    }
    else {
      for (let i=0; i < this._currentMaterial.textures.length; i++) {
        this._gl.activeTexture(this._gl["TEXTURE" + i]);
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._currentMaterial.textures[i].texture);
      }
    }
    
    // Bind indices
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, vertexBuffer.indexBuffer);
    
    // Set constants
    shaderMaterial.onSetConstants(this, this._materialRenderer);
    
    // Draw
    let is32Bits = vertexBuffer.isIndex32Bits;
    this._gl.drawElements(this._gl.TRIANGLES, vertexBuffer.indices.length, is32Bits ? this._gl.UNSIGNED_INT : this._gl.UNSIGNED_SHORT, 0);  
    
    // Unbind samplers
    for (let i=0; i < this._currentMaterial.textures.length + (textureLength > 0 ? 0 : 1); i++) {
      this._gl.activeTexture(this._gl["TEXTURE" + i]);
      this._gl.bindTexture(this._gl.TEXTURE_2D, null);
    }  
  }
  
  setMaterial (material) {
    if (!material) {
      this._currentMaterial = this._defaultMaterial;
    }
    else {
      this._currentMaterial = material;
    }
    
    // Configure Material Renderer
    let shaderMaterial = this._currentMaterial.shaderMaterial;
    
    if (!shaderMaterial || !shaderMaterial.programReady) {
      shaderMaterial = this._defaultMaterial.shaderMaterial;
    }
    
    // Pre render
    shaderMaterial.onPreRender(this);
    
    this._materialRenderer.currentShaderMaterial = shaderMaterial;
    
    // Use program
    this._gl.useProgram(shaderMaterial.program);
    
    // Configure
    if (this._currentMaterial.backFaceCulling) {
      this._gl.enable(this._gl.CULL_FACE);
    }
    else {
      this._gl.disable(this._gl.CULL_FACE);
    }
    this._gl.cullFace(this._currentMaterial.backFaceCulling ? this._gl.BACK : this._gl.FRONT);
  }
  
  setRenderTarget (renderTarget, clearColor, clearBackBuffer) {
    if (renderTarget && !(renderTarget instanceof RenderTargetTexture)) {
      throw new PompeiError('Bad parameter: renderTarget must be a RenderTargetTexture. setRenderTarget (renderTarget)');
    }
    
    if (this._currentRenderTarget || !renderTarget) {
      // Unbind
      this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
      
      if (!renderTarget) {
        this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        return;
      }
    }
    
    // Bind
    let framebuffer = renderTarget.framebuffer;
    
    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, framebuffer);
    this._gl.viewport(0, 0, framebuffer._width, framebuffer._height);
    
    // Clear
    if (clearColor) {
      this._gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
    }
    
    let mode = 0;
    
    clearBackBuffer = clearBackBuffer || true;
    if (clearBackBuffer) {
      mode |= this._gl.clear(this._gl.COLOR_BUFFER_BIT);
    }
    
    this._gl.clear(mode);
    
    // Set current render target
    this._currentRenderTarget = renderTarget || null;
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
  
  removeProgram (program) {
    this._gl.deleteProgram(program);
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
  
  createRenderTarget (name, size, force) {
    // Check is exists
    if (!force) {
      for (let i=0; i < this._textures.length; i++) {
        if (this._textures[i].isRenderTarget && this._textures[i].url === name) {
          return this._textures[i];
        }
      }
    }
    
    if (!(size instanceof Dimension2)) {
      throw new PompeiError('Bad parameter: size must be a Dimension2. createRenderTarget (name, size, force)');
    }
    
    // Create texture
    let texture = this._gl.createTexture();
    
    this._gl.bindTexture(this._gl.TEXTURE_2D, texture);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
    this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, size.width, size.height, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, null);
    
    // Create frame buffer
    let framebuffer = this._gl.createFramebuffer();
    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, framebuffer);
    this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, texture, 0);
    
    // Unbind
    this._gl.bindTexture(this._gl.TEXTURE_2D, null);
    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
    
    framebuffer._width = size.width;
    framebuffer._height = size.height;
    
    texture._framebuffer = framebuffer;
    texture._width = size.width;
    texture._height = size.height;
    
    this._textures.push(new RenderTargetTexture(this, name, texture, framebuffer));
    
    return this._textures[this._textures.length - 1];
  }
  
  createCustomTexture (size, onLoaded) {
    let canvas = document.createElement('canvas');
    let canvasContext = canvas.getContext('2d');
    
    canvas.width = size.width;
    canvas.height = size.height;
    canvasContext.rect(0, 0, size.width, size.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fill();
    
    return this.createTexture(canvas.toDataURL(), onLoaded);
  }
  
  createTexture (url, onLoaded, force) {
    // Check if exists
    force = force || false;
    if (!force) {
      for (let i=0; i < this._textures.length; i++) {
        if (this._textures[i].url === url) {
          return this._textures[i];
        }
      }
    }
    
    // Create texture
    let image = new Image();
    let texture = new Texture(this, url);
    
    image.onload = () => {
      // If image not power of two, create a canvas to render
      let powerOfTwoWidth = Core.PowerOfTwo(image.width, 4096);
      let powerOfTwoHeight = Core.PowerOfTwo(image.height, 4096);
      
      let canvas = null;
      let canvasContext = null;
      
      if (image.width !== powerOfTwoWidth || image.height !== powerOfTwoHeight) {
        canvas = document.createElement('canvas');
        canvasContext = canvas.getContext('2d');
        
        canvas.width = powerOfTwoWidth;
        canvas.height = powerOfTwoHeight;
        canvasContext.drawImage(image, 0, 0, image.width, image.height, 0, 0, powerOfTwoWidth, powerOfTwoHeight);
      }
      
      // Create and configure WebGL texture
      let glTexture = this._gl.createTexture();
      glTexture._baseWidth = image.width;
      glTexture._baseHeight = image.height;
      glTexture._width = image.width;
      glTexture._height = image.height;
      
      this._gl.bindTexture(this._gl.TEXTURE_2D, glTexture);
      this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, false);
      this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, canvas === null ? image : canvas);
      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
      this._gl.bindTexture(this._gl.TEXTURE_2D, null);
      
      texture._texture = glTexture;
      texture._image = canvas ? canvas : image;
      texture._isCanvas = canvas !== null;
      
      this._textures.push(texture);
      
      if (onLoaded) {
        onLoaded(texture);
      }
    };
    
    image.onerror = (error) => {
      console.warn('Cannot load texture located at ' + url);
    };
    
    image.src = url;
    
    return texture;
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
    
    if (!vertexBuffer.a_position && vertexBuffer.positions.length > 0) {
      vertexBuffer._vertexBuffer = onBindBuffer(vertexBuffer.positions, this._gl.ARRAY_BUFFER);
    }
    if (!vertexBuffer.a_normal && vertexBuffer.normals.length > 0) {
      vertexBuffer._normalBuffer = onBindBuffer(vertexBuffer.normals, this._gl.ARRAY_BUFFER);
    }
    if (!vertexBuffer.a_uv && vertexBuffer.uvs.length > 0) {
      vertexBuffer._uvBuffer = onBindBuffer(vertexBuffer.uvs, this._gl.ARRAY_BUFFER);
    }
    if (!vertexBuffer.a_color && vertexBuffer.colors.length > 0) {
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
    this._gl.deleteBuffer(vertexBuffer.a_position);
    this._gl.deleteBuffer(vertexBuffer.a_normal);
    this._gl.deleteBuffer(vertexBuffer.a_uv);
    this._gl.deleteBuffer(vertexBuffer.a_color);
    this._gl.deleteBuffer(vertexBuffer.indexBuffer);
    
    vertexBuffer._vertexBuffer = null;
    vertexBuffer._normalBuffer = null;
    vertexBuffer._uvBuffer = null;
    vertexBuffer._colorBuffer = null;
    vertexBuffer._indexBuffer = null;
  }
  
  removeTexture (texture) {
    for (let i=0; i < this._textures.length; i++) {
      if (this._textures[i] === texture) {
        if (texture.isRenderTarget) {
          // Delete framebuffer
          this._gl.deleteFramebuffer(texture.framebuffer);
        }
        
        // Remove WebGL Texture
        this._gl.deleteTexture(texture.texture);
        
        this._textures.splice(i, 1);
        return true;
      }
    }
    
    return false;
  }
  
  get canvas () {
    return this._gl.canvas;
  }
  
  // Rendering
  get currentRenderTarget () {
    return this._currentRenderTarget;
  }
  
  // Programs
  get defaultMaterial () {
    return this._defaultMaterial;
  }
  
  get materialRenderer () {
    return this._materialRenderer;
  }
  
  get currentMaterial () {
    return this._currentMaterial;
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
