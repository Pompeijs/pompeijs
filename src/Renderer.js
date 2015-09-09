import { PompeiError } from './utils/errors';

import { Vector2 } from './Core/Vector';
import Matrix from './Core/Matrix';

import VertexBuffer from './Core/VertexBuffer';
import Material from './Material/Material';

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
    this._defaultMaterial = new Material(
      this,
      'Shaders/Solid.vertex.glsl',
      'Shaders/Solid.fragment.glsl',
      ["a_position"],
      ["u_worldViewProjection"],
      [],
      false
    );
    this._defaultMaterial.compile();
    
    this._currentMaterial = null;
  }

  resize(size) {
    let ratio = window.devicePixelRatio || 1.0;
    this._gl.viewport(0, 0, size.x * ratio, size.y * ratio);
  }

  begin(clearColor, clearDepthBuffer, clearBackBuffer) {
    let canvas = this._gl.canvas;
    this._viewPort.x = canvas.clientWidth;
    this._viewPort.y = canvas.clientHeight;
    
    if (this._viewPort.x != canvas.width || this._viewPort.y != canvas.height) {
      this.resize(this._viewPort);
      canvas.width = this._viewPort.x;
      canvas.height = this._viewPort.y;
    }
    
    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    
    /*
    this._gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
    
    if (clearDepthBuffer) {
      this._gl.clearDepth(1.0);
      this._gl.clear(this._gl.DEPTH_BUFFER_BIT);
    }

    if (clearBackBuffer) {
      this._gl.clear(this._gl.COLOR_BUFFER_BIT);
    }
    */
  }

  end() {
    // Measure fps here
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
    
    // Bind indices
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, vertexBuffer.indexBuffer);
    
    // Set constants
    this._currentMaterial.onSetConstants(this);
    
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
    
    // Use program
    this._gl.useProgram(this._currentMaterial.program);
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
    //this._gl.deleteShader(vertex);
    //this._gl.deleteShader(pixel);
    
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
  
  // Materials
  setMatrix (uniform, matrix) {
    let location = this._gl.getUniformLocation(this._currentMaterial.program, uniform);
    if (!location) {
      return; // Warning message ?
    }
    
    this._gl.uniformMatrix4fv(location, false, matrix.m);
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
