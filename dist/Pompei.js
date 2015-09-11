(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Pompei"] = factory();
	else
		root["Pompei"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Device = __webpack_require__(1);

	var _Device2 = _interopRequireDefault(_Device);

	var _Renderer = __webpack_require__(2);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _Scene = __webpack_require__(16);

	var _Scene2 = _interopRequireDefault(_Scene);

	var _RenderingMaterialRenderer = __webpack_require__(13);

	var _RenderingMaterialRenderer2 = _interopRequireDefault(_RenderingMaterialRenderer);

	var _CoreMatrix = __webpack_require__(6);

	var _CoreMatrix2 = _interopRequireDefault(_CoreMatrix);

	var _CoreVector = __webpack_require__(4);

	var _CoreColor = __webpack_require__(9);

	var _CoreColor2 = _interopRequireDefault(_CoreColor);

	var _CoreVertex = __webpack_require__(8);

	var _CoreVertex2 = _interopRequireDefault(_CoreVertex);

	var _CoreVertexBuffer = __webpack_require__(7);

	var _CoreVertexBuffer2 = _interopRequireDefault(_CoreVertexBuffer);

	var _MaterialMaterial = __webpack_require__(10);

	var _MaterialMaterial2 = _interopRequireDefault(_MaterialMaterial);

	var _MaterialSolidMaterial = __webpack_require__(15);

	var _MaterialSolidMaterial2 = _interopRequireDefault(_MaterialSolidMaterial);

	var _MeshMesh = __webpack_require__(19);

	var _MeshMesh2 = _interopRequireDefault(_MeshMesh);

	var _AnimatorsAnimator = __webpack_require__(18);

	var _AnimatorsAnimator2 = _interopRequireDefault(_AnimatorsAnimator);

	var _AnimatorsRotationAnimator = __webpack_require__(20);

	var _AnimatorsRotationAnimator2 = _interopRequireDefault(_AnimatorsRotationAnimator);

	var _AnimatorsRotationCameraAnimator = __webpack_require__(21);

	var _AnimatorsRotationCameraAnimator2 = _interopRequireDefault(_AnimatorsRotationCameraAnimator);

	var _SceneNodesCameraSceneNode = __webpack_require__(22);

	var _SceneNodesCameraSceneNode2 = _interopRequireDefault(_SceneNodesCameraSceneNode);

	var _SceneNodesSceneNode = __webpack_require__(17);

	var _SceneNodesSceneNode2 = _interopRequireDefault(_SceneNodesSceneNode);

	var _SceneNodesMeshSceneNode = __webpack_require__(23);

	var _SceneNodesMeshSceneNode2 = _interopRequireDefault(_SceneNodesMeshSceneNode);

	var _TexturesTexture = __webpack_require__(14);

	var _TexturesTexture2 = _interopRequireDefault(_TexturesTexture);

	var _utilsErrors = __webpack_require__(3);

	exports['default'] = {
	  Device: _Device2['default'],
	  Renderer: _Renderer2['default'],
	  Scene: _Scene2['default'],

	  MaterialRenderer: _RenderingMaterialRenderer2['default'],

	  Matrix: _CoreMatrix2['default'],
	  Vector3: _CoreVector.Vector3,
	  Vector2: _CoreVector.Vector2,
	  Color: _CoreColor2['default'],

	  Vertex: _CoreVertex2['default'],
	  VertexBuffer: _CoreVertexBuffer2['default'],

	  Material: _MaterialMaterial2['default'],
	  SolidMaterial: _MaterialSolidMaterial2['default'],

	  Mesh: _MeshMesh2['default'],

	  Animator: _AnimatorsAnimator2['default'],
	  RotationAnimator: _AnimatorsRotationAnimator2['default'],
	  RotationCameraAnimator: _AnimatorsRotationCameraAnimator2['default'],

	  CameraSceneNode: _SceneNodesCameraSceneNode2['default'],
	  SceneNode: _SceneNodesSceneNode2['default'],
	  MeshSceneNode: _SceneNodesMeshSceneNode2['default'],

	  Texture: _TexturesTexture2['default'],

	  PompeiError: _utilsErrors.PompeiError,
	  WebGLSupportError: _utilsErrors.WebGLSupportError
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Renderer = __webpack_require__(2);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _Scene = __webpack_require__(16);

	var _Scene2 = _interopRequireDefault(_Scene);

	var _CoreVector = __webpack_require__(4);

	var _utilsErrors = __webpack_require__(3);

	var Device = (function () {
	  function Device(canvas, options) {
	    _classCallCheck(this, Device);

	    if (!(canvas && typeof canvas.getContext === 'function')) {
	      throw new _utilsErrors.PompeiError('Bad Parameters');
	    }

	    var context = canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options);
	    if (!context) {
	      throw new _utilsErrors.PompeiError('Cannot get WebGL context. constructor (canvas, options)');
	    }

	    this._options = options || {};
	    this._canvas = canvas;

	    this._renderer = new _Renderer2['default'](context, options);
	    this._scene = new _Scene2['default'](this.renderer, options);
	  }

	  _createClass(Device, [{
	    key: 'renderer',
	    get: function get() {
	      return this._renderer;
	    }
	  }, {
	    key: 'scene',
	    get: function get() {
	      return this._scene;
	    }
	  }, {
	    key: 'pointerX',
	    get: function get() {
	      return 0;
	    }
	  }, {
	    key: 'pointerY',
	    get: function get() {
	      return 0;
	    }
	  }]);

	  return Device;
	})();

	exports['default'] = Device;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var _CoreVector = __webpack_require__(4);

	var _CoreMatrix = __webpack_require__(6);

	var _CoreMatrix2 = _interopRequireDefault(_CoreMatrix);

	var _CoreVertexBuffer = __webpack_require__(7);

	var _CoreVertexBuffer2 = _interopRequireDefault(_CoreVertexBuffer);

	var _RenderingMaterialRenderer = __webpack_require__(13);

	var _RenderingMaterialRenderer2 = _interopRequireDefault(_RenderingMaterialRenderer);

	var _MaterialSolidMaterial = __webpack_require__(15);

	var _MaterialSolidMaterial2 = _interopRequireDefault(_MaterialSolidMaterial);

	var _TexturesTexture = __webpack_require__(14);

	var _TexturesTexture2 = _interopRequireDefault(_TexturesTexture);

	var Renderer = (function () {
	  function Renderer(context, options) {
	    _classCallCheck(this, Renderer);

	    this._gl = context;
	    this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
	    this._gl.clearDepth(1.0);
	    this._gl.enable(this._gl.DEPTH_TEST);
	    this._gl.depthFunc(this._gl.LEQUAL);

	    options = options || {};

	    // Custom functions
	    this.onDraw = function () {};

	    // Transformations
	    this._worldMatrix = _CoreMatrix2['default'].Identity();
	    this._viewMatrix = _CoreMatrix2['default'].Identity();
	    this._projectionMatrix = _CoreMatrix2['default'].Identity();

	    // Viewport
	    this._viewPort = new _CoreVector.Vector2([0, 0]);

	    // Rendering
	    this._defaultMaterial = new _MaterialSolidMaterial2['default'](this);
	    this._currentMaterial = null;

	    this._materialRenderer = new _RenderingMaterialRenderer2['default'](this._gl);

	    this._fps = 0;
	    this._potentialFps = 0;
	    this._currentTime = 0;

	    // Textures
	    this._textures = [];
	  }

	  _createClass(Renderer, [{
	    key: 'resize',
	    value: function resize(size) {
	      var ratio = window.devicePixelRatio || 1.0;
	      this._gl.viewport(0, 0, size.x * ratio, size.y * ratio);
	    }
	  }, {
	    key: 'begin',
	    value: function begin(clearColor, clearDepthBuffer, clearBackBuffer) {
	      this._currentTime = performance.now();

	      var canvas = this.canvas;
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
	  }, {
	    key: 'end',
	    value: function end() {
	      // Measure fps here
	      var currentTime = this.now();
	      var timeForFrame = currentTime - this._currentTime;

	      this._potentialFps = 1000.0 / 60.0 / timeForFrame * 60.0;
	      this._currentMaterial = currentTime;
	    }
	  }, {
	    key: 'now',
	    value: function now() {
	      return performance.now();
	    }
	  }, {
	    key: 'fps',
	    value: function fps() {
	      return this._potentialFps;
	    }
	  }, {
	    key: 'drawBuffer',
	    value: function drawBuffer(vertexBuffer) {
	      // Bind attributes
	      var program = this._currentMaterial.program;

	      for (var i = 0; i < this._currentMaterial.attributes.length; i++) {
	        try {
	          var _location = this._gl.getAttribLocation(program, this._currentMaterial.attributes[i]);

	          if (_location >= 0) {
	            var stride = vertexBuffer[this._currentMaterial.attributes[i] + "_stride"];

	            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertexBuffer[this._currentMaterial.attributes[i]]);
	            this._gl.vertexAttribPointer(_location, stride, this._gl.FLOAT, false, 0, 0);
	          }
	        } catch (e) {
	          // Catch silently
	        }
	      }

	      // Bind samplers
	      for (var i = 0; i < this._currentMaterial.textures.length; i++) {
	        this._gl.activeTexture(this._gl["TEXTURE" + i]);
	        this._gl.bindTexture(this._gl.TEXTURE_2D, this._currentMaterial.textures[i].texture);
	      }

	      // Bind indices
	      this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, vertexBuffer.indexBuffer);

	      // Set constants
	      this._currentMaterial.onSetConstants(this, this._materialRenderer);

	      // Draw
	      var is32Bits = vertexBuffer.isIndex32Bits;
	      this._gl.drawElements(this._gl.TRIANGLES, vertexBuffer.indices.length, is32Bits ? this._gl.UNSIGNED_INT : this._gl.UNSIGNED_SHORT, 0);
	    }
	  }, {
	    key: 'setMaterial',
	    value: function setMaterial(material) {
	      if (!material || !material.programReady) {
	        this._currentMaterial = this._defaultMaterial;
	      } else {
	        this._currentMaterial = material;
	      }

	      // Configure Material Renderer
	      this._materialRenderer.currentMaterial = this._currentMaterial;

	      // Use program
	      this._gl.useProgram(this._currentMaterial.program);
	    }
	  }, {
	    key: 'configureMaterialUniforms',
	    value: function configureMaterialUniforms(material) {
	      if (!material.programReady) {
	        return;
	      }

	      for (var i = 0; i < material.uniforms.length; i++) {
	        var _location2 = this._gl.getUniformLocation(material.program, material.uniforms[i]);
	        if (!_location2) {
	          continue;
	        }

	        material.uniformsLocations[material.uniforms[i]] = _location2;
	      }
	    }
	  }, {
	    key: 'createProgram',
	    value: function createProgram(vertexCode, pixelCode, attributes, uniforms, defines) {
	      var vertex = this._gl.createShader(this._gl.VERTEX_SHADER);
	      this._gl.shaderSource(vertex, defines + vertexCode);
	      this._gl.compileShader(vertex);

	      if (!this._gl.getShaderParameter(vertex, this._gl.COMPILE_STATUS)) {
	        throw new _utilsErrors.PompeiError('Cannot compile vertex shader: ' + this._gl.getShaderInfoLog(vertex));
	      }

	      var pixel = this._gl.createShader(this._gl.FRAGMENT_SHADER);
	      this._gl.shaderSource(pixel, defines + pixelCode);
	      this._gl.compileShader(pixel);

	      if (!this._gl.getShaderParameter(pixel, this._gl.COMPILE_STATUS)) {
	        throw new _utilsErrors.PompeiError('Cannot compile pixel shader: ' + this._gl.getShaderInfoLog(pixel));
	      }

	      var program = this._gl.createProgram();
	      this._gl.attachShader(program, vertex);
	      this._gl.attachShader(program, pixel);
	      this._gl.linkProgram(program);

	      if (!this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
	        throw new _utilsErrors.PompeiError('Cannot link vertex and pixel programs: ' + this._gl.getProgramInfoLog(program));
	      }

	      // Clean vertex and pixel shaders
	      this._gl.deleteShader(vertex);
	      this._gl.deleteShader(pixel);

	      // Configure
	      this._gl.useProgram(program);

	      for (var i = 0; i < attributes.length; i++) {
	        var _location3 = this._gl.getAttribLocation(program, attributes[i]);
	        if (_location3 < 0) {
	          continue;
	        }

	        this._gl.enableVertexAttribArray(_location3);
	      }

	      return program;
	    }
	  }, {
	    key: 'createTexture',
	    value: function createTexture(url, onLoaded, force) {
	      var _this = this;

	      // Check if exists
	      if (!force) {
	        for (var i = 0; i < this._textures.length; i++) {
	          if (this._textures[i].url === url) {
	            return this._textures[i];
	          }
	        }
	      }

	      // Create texture
	      var image = new Image();

	      image.onload = function () {
	        var texture = _this._gl.createTexture();

	        texture._baseWidth = image.width;
	        texture._baseHeight = image.height;
	        texture._width = image.width;
	        texture._height = image.height;

	        _this._gl.bindTexture(_this._gl.TEXTURE_2D, texture);
	        _this._gl.pixelStorei(_this._gl.UNPACK_FLIP_Y_WEBGL, false);
	        _this._gl.texImage2D(_this._gl.TEXTURE_2D, 0, _this._gl.RGBA, _this._gl.RGBA, _this._gl.UNSIGNED_BYTE, image);
	        _this._gl.texParameteri(_this._gl.TEXTURE_2D, _this._gl.TEXTURE_MAG_FILTER, _this._gl.NEAREST);
	        _this._gl.texParameteri(_this._gl.TEXTURE_2D, _this._gl.TEXTURE_MIN_FILTER, _this._gl.NEAREST);
	        _this._gl.bindTexture(_this._gl.TEXTURE_2D, null);

	        _this._textures.push(new _TexturesTexture2['default'](_this, url, image, texture));

	        if (onLoaded) {
	          onLoaded(_this._textures[_this._textures.length - 1]);
	        }
	      };

	      image.onerror = function (error) {
	        console.warn('Cannot load texture located at ' + url);
	      };

	      image.src = url;
	    }
	  }, {
	    key: 'createVertexBuffer',
	    value: function createVertexBuffer(vertexBuffer) {
	      var _this2 = this;

	      if (!(vertexBuffer instanceof _CoreVertexBuffer2['default'])) {
	        throw new _utilsErrors.PompeiError('Bad argument: vertexBuffer must be a VertexBuffer. createVertexBuffer (vertexBuffer)');
	      }

	      var onBindBuffer = function onBindBuffer(buffer, type) {
	        var vbo = _this2._gl.createBuffer();

	        _this2._gl.bindBuffer(type, vbo);
	        _this2._gl.bufferData(type, new Float32Array(buffer), _this2._gl.STATIC_DRAW);

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
	  }, {
	    key: 'createIndexBuffer',
	    value: function createIndexBuffer(vertexBuffer) {
	      var vbo = this._gl.createBuffer();
	      var indices = vertexBuffer.indices;
	      var is32Bits = false;

	      for (var i = 0; i < indices.length; i++) {
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
	  }, {
	    key: 'removeBuffer',
	    value: function removeBuffer(vertexBuffer) {
	      this._gl.deleteBuffer(vertexBuffer._vertexBuffer);
	      this._gl.deleteBuffer(vertexBuffer._indexBuffer);
	      this._gl.deleteBuffer(vertexBuffer._normalBuffer);
	      this._gl.deleteBuffer(vertexBuffer._uvBuffer);
	    }

	    // Programs
	  }, {
	    key: 'canvas',
	    get: function get() {
	      return this._gl.canvas;
	    }
	  }, {
	    key: 'materialRenderer',
	    get: function get() {
	      return this._materialRenderer;
	    }
	  }, {
	    key: 'defaultMaterial',
	    get: function get() {
	      return this._defaultMaterial;
	    }

	    // Transformations
	  }, {
	    key: 'worldMatrix',
	    get: function get() {
	      return this._worldMatrix;
	    }
	  }, {
	    key: 'viewMatrix',
	    get: function get() {
	      return this._viewMatrix;
	    }
	  }, {
	    key: 'projectionMatrix',
	    get: function get() {
	      return this._projectionMatrix;
	    }
	  }]);

	  return Renderer;
	})();

	exports['default'] = Renderer;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PompeiError = (function (_Error) {
	  _inherits(PompeiError, _Error);

	  function PompeiError(message) {
	    _classCallCheck(this, PompeiError);

	    _get(Object.getPrototypeOf(PompeiError.prototype), 'constructor', this).call(this);
	    this.message = message;
	    this.stack = new Error().stack;
	    this.name = this.constructor.name;
	  }

	  return PompeiError;
	})(Error);

	exports.PompeiError = PompeiError;

	var WebGLSupportError = (function (_PompeiError) {
	  _inherits(WebGLSupportError, _PompeiError);

	  function WebGLSupportError(m) {
	    _classCallCheck(this, WebGLSupportError);

	    _get(Object.getPrototypeOf(WebGLSupportError.prototype), 'constructor', this).call(this, m);
	    this.message = m || 'WebGL is not supported';
	  }

	  return WebGLSupportError;
	})(PompeiError);

	exports.WebGLSupportError = WebGLSupportError;
	exports['default'] = {
	  PompeiError: PompeiError,
	  WebGLSupportError: WebGLSupportError
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Core = __webpack_require__(5);

	var _Core2 = _interopRequireDefault(_Core);

	var Vector3 = (function () {
	  _createClass(Vector3, null, [{
	    key: 'Zero',
	    get: function get() {
	      // UGLY WAY TO GO FAST
	      // Works as a static member for Vector3 that is a Zero Vector (x=0, y=0, z=0)
	      this._zeroVector = this._zeroVector || new Vector3([0, 0, 0]);
	      return this._zeroVector;
	    }
	  }]);

	  function Vector3(other) {
	    _classCallCheck(this, Vector3);

	    this.x = 0.0;
	    this.y = 0.0;
	    this.z = 0.0;

	    if (other) {
	      this.set(other);
	    }
	  }

	  _createClass(Vector3, [{
	    key: 'toArray',
	    value: function toArray() {
	      return [this.x, this.y, this.z];
	    }
	  }, {
	    key: 'set',
	    value: function set(other) {
	      if (other instanceof Vector3) {
	        this.x = other.x;
	        this.y = other.y;
	        this.z = other.z;
	      } else if (other instanceof Array) {
	        this.x = other[0];
	        this.y = other[1];
	        this.z = other[2];
	      }

	      return this;
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	      return new Vector3([this.x, this.y, this.z]);
	    }
	  }, {
	    key: 'plus',
	    value: function plus(other) {
	      this.x += other.x;
	      this.y += other.y;
	      this.z += other.z;

	      return this;
	    }
	  }, {
	    key: 'minus',
	    value: function minus(other) {
	      this.x -= other.x;
	      this.y -= other.y;
	      this.z -= other.z;

	      return this;
	    }
	  }, {
	    key: 'multiply',
	    value: function multiply(other) {
	      this.x *= other.x;
	      this.y *= other.y;
	      this.z *= other.z;

	      return this;
	    }
	  }, {
	    key: 'divide',
	    value: function divide(other) {
	      this.x /= other.x;
	      this.y /= other.y;
	      this.z /= other.z;

	      return this;
	    }
	  }, {
	    key: 'multiplyScalar',
	    value: function multiplyScalar(scalar) {
	      this.x *= scalar;
	      this.y *= scalar;
	      this.z *= scalar;

	      return this;
	    }
	  }, {
	    key: 'dot',
	    value: function dot(other) {
	      return this.x * other.x + this.y * other.y + this.z * other.z;
	    }
	  }, {
	    key: 'cross',
	    value: function cross(other) {
	      var x = this.y * other.z - this.z * other.y;
	      var y = this.z * other.x - this.x * other.z;
	      var z = this.x * other.y - this.y * other.x;

	      return new Vector3([x, y, z]);
	    }
	  }, {
	    key: 'length',
	    value: function length() {
	      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	    }
	  }, {
	    key: 'lengthSQ',
	    value: function lengthSQ() {
	      return this.x * this.x + this.y + this.y + this.z * this.z;
	    }
	  }, {
	    key: 'getDistanceFrom',
	    value: function getDistanceFrom(other) {
	      var x = this.x - other.x;
	      var y = this.y - other.y;
	      var z = this.z - other.z;

	      return Math.sqrt(x * x + y * y + z * z);
	    }
	  }, {
	    key: 'getDistanceFromSQ',
	    value: function getDistanceFromSQ(other) {
	      var x = this.x - other.x;
	      var y = this.y - other.y;
	      var z = this.z - other.z;

	      return x * x + y * y + z * z;
	    }
	  }, {
	    key: 'getHorizontalAngle',
	    value: function getHorizontalAngle() {
	      var angle = new Vector3();

	      var tmp = Math.atan2(this.x, this.z) * _Core2['default'].RadToDeg();
	      angle.y = tmp;

	      if (angle.y < 0.0) angle.y += 360.0;
	      if (angle.y >= 360.0) angle.y -= 360.0;

	      var z1 = Math.sqrt(this.x * this.x + this.z * this.z);
	      angle.x = Math.atan2(z1, this.y) * _Core2['default'].RadToDeg() - 90.0;

	      if (angle.x < 0.0) angle.x += 360.0;
	      if (angle.x >= 360.0) angle.x -= 360.0;

	      return angle;
	    }
	  }, {
	    key: 'normalize',
	    value: function normalize() {
	      var length = this.x * this.x + this.y * this.y + this.z * this.z;
	      if (length === 0) {
	        return this;
	      }

	      length = 1.0 / Math.sqrt(length);

	      this.x *= length;
	      this.y *= length;
	      this.z *= length;

	      return this;
	    }
	  }, {
	    key: 'equals',
	    value: function equals(other) {
	      return this.x === other.x && this.y === other.y && this.z === other.z;
	    }
	  }, {
	    key: 'rotateXYBy',
	    value: function rotateXYBy(degrees, center) {
	      center = center || Vector3.Zero;

	      degrees *= _Core2['default'].DegToRad();
	      var cs = Math.cos(degrees);
	      var sn = Math.sin(degrees);
	      this.x -= center.x;
	      this.y -= center.y;
	      this.set([this.x * cs - this.y * sn, this.x * sn + this.y * cs, this.z]);
	      this.x += center.x;
	      this.y += center.y;

	      return this;
	    }
	  }, {
	    key: 'rotateXZBy',
	    value: function rotateXZBy(degrees, center) {
	      center = center || Vector3.Zero;

	      degrees *= _Core2['default'].DegToRad();
	      var cs = Math.cos(degrees);
	      var sn = Math.sin(degrees);
	      this.x -= center.x;
	      this.z -= center.z;
	      this.set([this.x * cs - this.z * sn, this.y, this.x * sn + this.z * cs]);
	      this.x += center.x;
	      this.z += center.z;

	      return this;
	    }
	  }]);

	  return Vector3;
	})();

	exports.Vector3 = Vector3;

	var Vector2 = (function () {
	  function Vector2(other) {
	    _classCallCheck(this, Vector2);

	    this.x = 0.0;
	    this.y = 0.0;

	    if (other) {
	      this.set(other);
	    }
	  }

	  _createClass(Vector2, [{
	    key: 'toArray',
	    value: function toArray() {
	      return [this.x, this.y];
	    }
	  }, {
	    key: 'set',
	    value: function set(other) {
	      if (other instanceof Vector2) {
	        this.x = other.x;
	        this.y = other.y;
	      } else if (other instanceof Array) {
	        this.x = other[0];
	        this.y = other[1];
	      }
	    }
	  }, {
	    key: 'plus',
	    value: function plus(other) {
	      this.x += other.x;
	      this.y += other.y;

	      return this;
	    }
	  }, {
	    key: 'minus',
	    value: function minus(other) {
	      this.x -= other.x;
	      this.y -= other.y;

	      return this;
	    }
	  }, {
	    key: 'multiply',
	    value: function multiply(other) {
	      this.x *= other.x;
	      this.y *= other.y;

	      return this;
	    }
	  }, {
	    key: 'divide',
	    value: function divide(other) {
	      this.x /= other.x;
	      this.y /= other.y;
	    }
	  }]);

	  return Vector2;
	})();

	exports.Vector2 = Vector2;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var Core = (function () {
	  function Core() {
	    _classCallCheck(this, Core);
	  }

	  _createClass(Core, null, [{
	    key: 'Clamp',
	    value: function Clamp(value, low, high) {
	      return Math.min(Math.max(value, low), high);
	    }
	  }, {
	    key: 'RadToDeg',
	    value: function RadToDeg() {
	      return 180.0 / Math.PI;
	    }
	  }, {
	    key: 'DegToRad',
	    value: function DegToRad() {
	      return Math.PI / 180.0;
	    }

	    // TO REVIEW
	  }, {
	    key: 'LoadFile',
	    value: function LoadFile(url, asArrayBuffer, onLoadedFile) {
	      var request = new XMLHttpRequest();
	      request.open('GET', url, true);

	      if (asArrayBuffer) {
	        request.responseType = 'arrayBuffer';
	      }

	      request.onreadystatechange = function () {
	        if (request.readyState === 4 && request.status === 200) {
	          onLoadedFile(asArrayBuffer ? request.response : request.responseText);
	        } else {
	          throw new _utilsErrors.PompeiError('Cannot load file at: ' + url + ' => ' + request.status);
	        }
	      };
	    }
	  }]);

	  return Core;
	})();

	exports['default'] = Core;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var _Vector = __webpack_require__(4);

	var _Core = __webpack_require__(5);

	var _Core2 = _interopRequireDefault(_Core);

	var Matrix = (function () {
	  function Matrix(array) {
	    _classCallCheck(this, Matrix);

	    this.m = new Float32Array(16);

	    if (array && array.length === 16) {
	      for (var i = 0; i < array.length; i++) {
	        this.m[i] = array[i];
	      }
	    }
	  }

	  _createClass(Matrix, [{
	    key: 'set',
	    value: function set(other) {
	      for (var i = 0; i < 16; i++) {
	        this.m[i] = other.m[i];
	      }

	      return this;
	    }
	  }, {
	    key: 'makeIdentity',
	    value: function makeIdentity() {
	      var m = this.m;

	      for (var i = 0; i < 16; i++) {
	        m[i] = 0;
	      }

	      m[0] = m[5] = m[10] = m[15] = 1.0;

	      return this;
	    }
	  }, {
	    key: 'multiply',
	    value: function multiply(other) {
	      // Simplify the reading by creating temporary variables
	      var tempMatrix = new Matrix().set(this);

	      var m1 = tempMatrix.m;
	      var m2 = other.m;
	      var m3 = this.m;

	      m3[0] = m1[0] * m2[0] + m1[4] * m2[1] + m1[8] * m2[2] + m1[12] * m2[3];
	      m3[1] = m1[1] * m2[0] + m1[5] * m2[1] + m1[9] * m2[2] + m1[13] * m2[3];
	      m3[2] = m1[2] * m2[0] + m1[6] * m2[1] + m1[10] * m2[2] + m1[14] * m2[3];
	      m3[3] = m1[3] * m2[0] + m1[7] * m2[1] + m1[11] * m2[2] + m1[15] * m2[3];

	      m3[4] = m1[0] * m2[4] + m1[4] * m2[5] + m1[8] * m2[6] + m1[12] * m2[7];
	      m3[5] = m1[1] * m2[4] + m1[5] * m2[5] + m1[9] * m2[6] + m1[13] * m2[7];
	      m3[6] = m1[2] * m2[4] + m1[6] * m2[5] + m1[10] * m2[6] + m1[14] * m2[7];
	      m3[7] = m1[3] * m2[4] + m1[7] * m2[5] + m1[11] * m2[6] + m1[15] * m2[7];

	      m3[8] = m1[0] * m2[8] + m1[4] * m2[9] + m1[8] * m2[10] + m1[12] * m2[11];
	      m3[9] = m1[1] * m2[8] + m1[5] * m2[9] + m1[9] * m2[10] + m1[13] * m2[11];
	      m3[10] = m1[2] * m2[8] + m1[6] * m2[9] + m1[10] * m2[10] + m1[14] * m2[11];
	      m3[11] = m1[3] * m2[8] + m1[7] * m2[9] + m1[11] * m2[10] + m1[15] * m2[11];

	      m3[12] = m1[0] * m2[12] + m1[4] * m2[13] + m1[8] * m2[14] + m1[12] * m2[15];
	      m3[13] = m1[1] * m2[12] + m1[5] * m2[13] + m1[9] * m2[14] + m1[13] * m2[15];
	      m3[14] = m1[2] * m2[12] + m1[6] * m2[13] + m1[10] * m2[14] + m1[14] * m2[15];
	      m3[15] = m1[3] * m2[12] + m1[7] * m2[13] + m1[11] * m2[14] + m1[15] * m2[15];

	      return this;
	    }
	  }, {
	    key: 'multiplyScalar',
	    value: function multiplyScalar(scalar) {
	      for (var i = 0; i < 16; i++) {
	        this.m[i] *= scalar;
	      }

	      return this;
	    }
	  }, {
	    key: 'plus',
	    value: function plus(other) {
	      for (var i = 0; i < 16; i++) {
	        this.m[i] += other.m[i];
	      }

	      return this;
	    }
	  }, {
	    key: 'minus',
	    value: function minus(other) {
	      for (var i = 0; i < 16; i++) {
	        this.m[i] -= other.m[i];
	      }

	      return this;
	    }
	  }, {
	    key: 'buildProjectionMatrix',
	    value: function buildProjectionMatrix(fov, aspect, zNear, zFar) {
	      var h = 1.0 / Math.tan(fov * 0.5);
	      var w = h / aspect;
	      var m = this.m;

	      m[0] = w;
	      m[1] = 0;
	      m[2] = 0;
	      m[3] = 0;

	      m[4] = 0;
	      m[5] = h;
	      m[6] = 0;
	      m[7] = 0;

	      m[8] = 0;
	      m[9] = 0;
	      m[10] = zFar / (zFar - zNear);
	      m[11] = 1;

	      m[12] = 0;
	      m[13] = 0;
	      m[14] = -zNear * zFar / (zFar - zNear);
	      m[15] = 0;

	      return this;
	    }
	  }, {
	    key: 'buildCameraLookAtMatrix',
	    value: function buildCameraLookAtMatrix(position, target, up) {
	      var zaxis = new _Vector.Vector3(target).minus(position).normalize();
	      var xaxis = new _Vector.Vector3(up).cross(zaxis).normalize();
	      var yaxis = new _Vector.Vector3(zaxis).cross(xaxis);
	      var m = this.m;

	      m[0] = xaxis.x;
	      m[1] = yaxis.x;
	      m[2] = zaxis.x;
	      m[3] = 0;

	      m[4] = xaxis.y;
	      m[5] = yaxis.y;
	      m[6] = zaxis.y;
	      m[7] = 0;

	      m[8] = xaxis.z;
	      m[9] = yaxis.z;
	      m[10] = zaxis.z;
	      m[11] = 0;

	      m[12] = -xaxis.dot(position);
	      m[13] = -yaxis.dot(position);
	      m[14] = -zaxis.dot(position);
	      m[15] = 1;

	      return this;
	    }
	  }, {
	    key: 'getTranslation',
	    value: function getTranslation(result) {
	      if (result) {
	        result.x = this.m[12];
	        result.y = this.m[13];
	        result.z = this.m[14];
	        return result;
	      }

	      return new _Vector.Vector3([this.m[12], this.m[13], this.m[14]]);
	    }
	  }, {
	    key: 'setTranslation',
	    value: function setTranslation(translation) {
	      this.m[12] = -translation.x;
	      this.m[13] = -translation.y;
	      this.m[14] = -translation.z;

	      return this;
	    }
	  }, {
	    key: 'setScale',
	    value: function setScale(scale) {
	      this.m[0] = scale.x;
	      this.m[5] = scale.y;
	      this.m[10] = scale.z;

	      return this;
	    }
	  }, {
	    key: 'getScale',
	    value: function getScale(result) {
	      var x = undefined,
	          y = undefined,
	          z = undefined;
	      // Rotation before
	      if (this.m[1] === 0 && this.m[2] === 0 && this.m[4] === 0 && this.m[6] === 0 && this.m[8] === 0 && this.m[9] === 0) {
	        x = this.m[0];
	        y = this.m[5];
	        z = this.m[10];

	        if (result) {
	          result.x = x;
	          result.y = y;
	          result.z = z;

	          return result;
	        }

	        return new _Vector.Vector3([x, y, z]);
	      }

	      // We have to do the full calculation.
	      x = this.m[0] * this.m[0] + this.m[1] * this.m[1] + this.m[2] * this.m[2];
	      y = this.m[4] * this.m[4] + this.m[5] * this.m[5] + this.m[6] * this.m[6];
	      z = this.m[8] * this.m[8] + this.m[9] * this.m[9] + this.m[10] * this.m[10];

	      if (result) {
	        result.x = x;
	        result.y = y;
	        result.z = z;

	        return result;
	      }

	      return new _Vector.Vector3([x, y, z]);
	    }
	  }, {
	    key: 'setRotationDegrees',
	    value: function setRotationDegrees(rotation) {
	      this.setRotation(new _Vector.Vector3(rotation).multiplyScalar(_Core2['default'].DegToRad()));
	    }
	  }, {
	    key: 'setRotation',
	    value: function setRotation(rotation) {
	      var cr = Math.cos(rotation.x);
	      var sr = Math.sin(rotation.x);
	      var cp = Math.cos(rotation.y);
	      var sp = Math.sin(rotation.y);
	      var cy = Math.cos(rotation.z);
	      var sy = Math.sin(rotation.z);

	      this.m[0] = cp * cy;
	      this.m[1] = cp * sy;
	      this.m[2] = -sp;

	      var srsp = sr * sp;
	      var crsp = cr * sp;

	      this.m[4] = srsp * cy - cr * sy;
	      this.m[5] = srsp * sy + cr * cy;
	      this.m[6] = sr * cp;

	      this.m[8] = crsp * cy + sr * sy;
	      this.m[9] = crsp * sy - sr * cy;
	      this.m[10] = cr * cp;

	      return this;
	    }
	  }, {
	    key: 'getRotationDegrees',
	    value: function getRotationDegrees(result) {
	      result = this.getRotation(result);

	      result.x *= _Core2['default'].RadToDeg();
	      result.y *= _Core2['default'].RadToDeg();
	      result.z *= _Core2['default'].RadToDeg();

	      return result;
	    }
	  }, {
	    key: 'getRotation',
	    value: function getRotation(result) {
	      var mat = this.m;
	      var scale = this.getScale();

	      // Check negative scale
	      if (scale.y < 0.0 && scale.z < 0.0) {
	        scale.y = -scale.Y;
	        scale.z = -scale.Z;
	      } else if (scale.x < 0.0 && scale.z < 0.0) {
	        scale.x = -scale.x;
	        scale.z = -scale.z;
	      } else if (scale.x < 0.0 && scale.y < 0.0) {
	        scale.x = -scale.x;
	        scale.y = -scale.y;
	      }

	      var invScale = new _Vector.Vector3([1.0 / scale.x, 1.0 / scale.y, 1.0 / scale.z]);

	      var Y = -Math.asin(_Core2['default'].Clamp(mat[2] * invScale.x, -1.0, 1.0));
	      var C = Math.cos(Y);
	      Y *= _Core2['default'].RadToDeg();

	      var rotx = undefined,
	          roty = undefined,
	          X = undefined,
	          Z = undefined;

	      if (C !== 0.0) {
	        var invC = 1.0 / C;
	        rotx = mat[10] * invC * invScale.z;
	        roty = mat[6] * invC * invScale.y;
	        X = Math.atan2(roty, rotx) * _Core2['default'].RadToDeg();
	        rotx = mat[0] * invC * invScale.x;
	        roty = mat[1] * invC * invScale.x;
	        Z = Math.atan2(roty, rotx) * _Core2['default'].RadToDeg();
	      } else {
	        X = 0.0;
	        rotx = mat[5] * invScale.y;
	        roty = -mat[4] * invScale.y;
	        Z = Math.atan2(roty, rotx) * _Core2['default'].RadToDeg();
	      }

	      // fix values that get below zero
	      if (X < 0.0) {
	        X += 360.0;
	      }

	      if (Y < 0.0) {
	        Y += 360.0;
	      }

	      if (Z < 0.0) {
	        Z += 360.0;
	      }

	      if (result) {
	        result.x = X;
	        result.y = Y;
	        result.z = Z;

	        return result;
	      }

	      return new _Vector.Vector3([X, Y, Z]);
	    }
	  }], [{
	    key: 'Identity',
	    value: function Identity(result) {
	      return Matrix.FromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
	    }
	  }, {
	    key: 'FromValues',
	    value: function FromValues() {
	      if (arguments.length !== 16) {
	        throw new _utilsErrors.PompeiError('Bad parameters: arguments.length = 16. FromValues()');
	      }

	      var mat = new Matrix();

	      for (var i = 0; i < arguments.length; i++) {
	        mat.m[i] = arguments[i];
	      }

	      return mat;
	    }
	  }]);

	  return Matrix;
	})();

	exports['default'] = Matrix;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var _Vertex = __webpack_require__(8);

	var _Vertex2 = _interopRequireDefault(_Vertex);

	var _MaterialMaterial = __webpack_require__(10);

	var _MaterialMaterial2 = _interopRequireDefault(_MaterialMaterial);

	var VertexBuffer = (function () {
	  function VertexBuffer(vertices, indices) {
	    _classCallCheck(this, VertexBuffer);

	    this._positions = [];
	    this._normals = [];
	    this._uvs = [];
	    this._colors = [];
	    this._indices = [];

	    this._material = null;

	    this._vertexBuffer = null;
	    this._indexBuffer = null;
	    this._normalBuffer = null;
	    this._uvBuffer = null;
	    this._colorBuffer = null;

	    this._indexIs32Bits = false;

	    if (vertices && Array.isArray(vertices)) {
	      this.merge(vertices);
	    }
	  }

	  _createClass(VertexBuffer, [{
	    key: 'merge',

	    // Methods
	    value: function merge(vertices) {
	      // Fill positions, normals and UVs from vertices of type Vertex
	      for (var i = 0; i < vertices.length; i++) {
	        this._positions.push(vertices[i].position.x);
	        this._positions.push(vertices[i].position.y);
	        this._positions.push(vertices[i].position.z);

	        if (vertices[i].normal) {
	          this._positions.push(vertices[i].normal.x);
	          this._positions.push(vertices[i].normal.y);
	          this._positions.push(vertices[i].normal.z);
	        }

	        if (vertices[i].uv) {
	          this._uvs.push(vertices[i].uv.x);
	          this._uvs.push(vertices[i].uv.y);
	        }

	        if (vertices[i].colors) {
	          this._colors.push(vertices[i].color.r);
	          this._colors.push(vertices[i].color.g);
	          this._colors.push(vertices[i].color.b);
	          this._colors.push(vertices[i].color.a);
	        }
	      }
	    }
	  }, {
	    key: 'addVertex',
	    value: function addVertex(vertex) {
	      if (!(vertex instanceof _Vertex2['default'])) {
	        throw new _utilsErrors.PompeiError('Bad parameter: vertex is not a Vertex. addVertex (vertex)');
	      }

	      // Just merge
	      this.merge([vertex]);

	      return this;
	    }

	    // Attributes
	  }, {
	    key: 'material',
	    get: function get() {
	      return this._material;
	    },
	    set: function set(material) {
	      if (material !== null && !(material instanceof _MaterialMaterial2['default'])) {
	        throw new _utilsErrors.PompeiError('Bad parameter. Cannot set a material that is not a Material or null. set material (material)');
	      }

	      this._material = material;
	    }
	  }, {
	    key: 'vertices',
	    set: function set(vertices) {
	      if (!Array.isArray(vertices)) {
	        throw new _utilsErrors.PompeiError('Bad parameter: vertices is not an array. set vertices (verticies[])');
	      }

	      // Reset values
	      this._positions = [];
	      this._normals = [];
	      this._uvs = [];

	      // Merge
	      this.merge(vertices);
	    }

	    // Indices
	  }, {
	    key: 'indices',
	    get: function get() {
	      return this._indices;
	    },
	    set: function set(indices) {
	      if (!Array.isArray(indices)) {
	        throw new _utilsErrors.PompeiError('Bad parameter: indices is not an array. set indices (indices)');
	      }

	      this._indices = indices;
	    }
	  }, {
	    key: 'isIndex32Bits',
	    get: function get() {
	      return this._indexIs32Bits;
	    }
	  }, {
	    key: 'indexIs32Bits',
	    set: function set(is32Bits) {
	      this._indexIs32Bits = is32Bits;
	    }

	    // Positions
	  }, {
	    key: 'positions',
	    get: function get() {
	      return this._positions;
	    },
	    set: function set(positions) {
	      this._positions = positions;
	    }

	    // Normals
	  }, {
	    key: 'normals',
	    get: function get() {
	      return this._normals;
	    },
	    set: function set(normals) {
	      this._normals = normals;
	    }

	    // UVs
	  }, {
	    key: 'uvs',
	    get: function get() {
	      return this._uvs;
	    },
	    set: function set(uvs) {
	      this._uvs = uvs;
	    }

	    // Colors
	  }, {
	    key: 'colors',
	    get: function get() {
	      return this._colors;
	    },
	    set: function set(colors) {
	      this._colors = colors;
	    }
	  }, {
	    key: 'a_position',
	    get: function get() {
	      return this._vertexBuffer;
	    }
	  }, {
	    key: 'a_position_stride',
	    get: function get() {
	      return 3;
	    }
	  }, {
	    key: 'a_normal',
	    get: function get() {
	      return this._normalBuffer;
	    }
	  }, {
	    key: 'a_normal_stride',
	    get: function get() {
	      return 3;
	    }
	  }, {
	    key: 'a_uv',
	    get: function get() {
	      return this._uvBuffer;
	    }
	  }, {
	    key: 'a_uv_stride',
	    get: function get() {
	      return 2;
	    }
	  }, {
	    key: 'a_color',
	    get: function get() {
	      return this._colorBuffer;
	    }
	  }, {
	    key: 'a_color_stride',
	    get: function get() {
	      return 4;
	    }
	  }, {
	    key: 'indexBuffer',
	    get: function get() {
	      return this._indexBuffer;
	    }
	  }]);

	  return VertexBuffer;
	})();

	exports['default'] = VertexBuffer;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var _Vector = __webpack_require__(4);

	var _Color = __webpack_require__(9);

	var _Color2 = _interopRequireDefault(_Color);

	var Vertex = (function () {
	  function Vertex(position, normal, uv, color) {
	    _classCallCheck(this, Vertex);

	    if (position && !(position instanceof _Vector.Vector3)) {
	      throw new _utilsErrors.PompeiError('Bad Parameter: position is not a Vector3. constructor(position, normal, uv, color)');
	    }

	    if (normal && !(normal instanceof _Vector.Vector3)) {
	      throw new _utilsErrors.PompeiError('Bad Parameter: normal is not a Vector3. constructor(position, normal, uv, color)');
	    }

	    if (uv && !(uv instanceof _Vector.Vector2)) {
	      throw new _utilsErrors.PompeiError('Bad Parameter: uv is not a Vector2. constructor(position, normal, uv, color)');
	    }

	    if (color && !(color instanceof _Color2['default'])) {
	      throw new _utilsErrors.PompeiError('Bad Parameter: color is not a Color. constructor(position, normal, uv, color)');
	    }

	    this._position = position;
	    this._normal = normal;
	    this._uv = uv;
	    this._color = color;
	  }

	  // Position

	  _createClass(Vertex, [{
	    key: 'position',
	    get: function get() {
	      return this._position;
	    },
	    set: function set(position) {
	      if (!(position instanceof _Vector.Vector3)) {
	        throw new _utilsErrors.PompeiError('Bad Parameter: position is not a Vector3. set position (position)');
	      }

	      this._position = Position;
	    }

	    // Normal
	  }, {
	    key: 'normal',
	    get: function get() {
	      return this._normal;
	    },
	    set: function set(normal) {
	      if (!(normal instanceof _Vector.Vector3)) {
	        throw new _utilsErrors.PompeiError('Bad Parameter: normal is not a Vector3. set normal (normal)');
	      }

	      this._normal = normal;
	    }

	    // UV
	  }, {
	    key: 'uv',
	    get: function get() {
	      return this._uv;
	    },
	    set: function set(uv) {
	      if (!(uv instanceof _Vector.Vector2)) {
	        throw new _utilsErrors.PompeiError('Bad Parameter: uv is not a Vector2. set uv (uv)');
	      }

	      this._uv = uv;
	    }

	    // Color
	  }, {
	    key: 'color',
	    get: function get() {
	      return this._color;
	    },
	    set: function set(color) {
	      if (!(color instanceof _Color2['default'])) {
	        throw new _utilsErrors.PompeiError('Bad parameter: color is not a Color. set color (color)');
	      }

	      this._color = color;
	    }
	  }]);

	  return Vertex;
	})();

	exports['default'] = Vertex;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var Color = (function () {
	  function Color(other) {
	    _classCallCheck(this, Color);

	    this.r = 0.0;
	    this.g = 0.0;
	    this.b = 0.0;
	    this.a = 0.0;

	    if (other) {
	      this.set(other);
	    }
	  }

	  _createClass(Color, [{
	    key: 'toArray',
	    value: function toArray() {
	      return [this.r, this.g, this.b, this.a];
	    }
	  }, {
	    key: 'set',
	    value: function set(other) {
	      if (other instanceof Color) {
	        this.r = other.r;
	        this.g = other.g;
	        this.b = other.b;
	        this.a = other.a;
	      } else if (other instanceof Array) {
	        this.r = other[0];
	        this.g = other[1];
	        this.b = other[2];
	        this.a = other[3];
	      }
	    }
	  }, {
	    key: 'fromArray',
	    value: function fromArray(other) {
	      this.r = other[0];
	      this.g = other[1];
	      this.b = other[2];
	      this.a = other[3];
	    }
	  }, {
	    key: 'plus',
	    value: function plus(other) {
	      this.r += other.r;
	      this.g += other.g;
	      this.b += other.b;
	      this.a += other.a;
	    }
	  }, {
	    key: 'minus',
	    value: function minus(other) {
	      this.r -= other.r;
	      this.g -= other.g;
	      this.b -= other.b;
	      this.a -= other.a;
	    }
	  }, {
	    key: 'multiply',
	    value: function multiply(other) {
	      this.r *= other.r;
	      this.g *= other.g;
	      this.b *= other.b;
	      this.a *= other.a;
	    }
	  }]);

	  return Color;
	})();

	exports['default'] = Color;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var _Renderer = __webpack_require__(2);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _CoreCoreJs = __webpack_require__(5);

	var _CoreCoreJs2 = _interopRequireDefault(_CoreCoreJs);

	var _CoreMatrix = __webpack_require__(6);

	var _CoreMatrix2 = _interopRequireDefault(_CoreMatrix);

	var _ShadersSolidVertexGlsl = __webpack_require__(11);

	var _ShadersSolidVertexGlsl2 = _interopRequireDefault(_ShadersSolidVertexGlsl);

	var _ShadersSolidFragmentGlsl = __webpack_require__(12);

	var _ShadersSolidFragmentGlsl2 = _interopRequireDefault(_ShadersSolidFragmentGlsl);

	var defaults = {
	  vertexPath: 'Shaders/Solid.vertex.glsl',
	  pixelPath: 'Shaders/Solid.fragment.glsl'
	};

	var Material = (function () {
	  function Material(renderer, vertexPath, pixelPath, attributes, uniforms, defines, fromDOM) {
	    _classCallCheck(this, Material);

	    if (!(renderer instanceof _Renderer2['default'])) {
	      throw new _utilsErrors.PompeiError('Bad parameters: renderer is needed. constructor (renderer, vertexPath, pixelPath, attributes, uniforms)');
	    }
	    if (!vertexPath || !pixelPath) {
	      console.warn('Either vertexPath or pixelPath is undefined. Will use default shaders.');
	      throw new _utilsErrors.PompeiError('Bad parameters: vertexPath and pixelPath are needed. constructor (renderer, vertexPath, pixelPath, attributes, uniforms)');
	    }
	    if (!Array.isArray(attributes)) {
	      throw new _utilsErrors.PompeiError('Bad parameter: attributes must be an array of string. constructor (renderer, vertexPath, pixelPath, attributes, uniforms)');
	    }
	    if (uniforms && !Array.isArray(uniforms)) {
	      throw new _utilsErrors.PompeiError('Bad parameter: uniforms must be an array of string. constructor (renderer, vertexPath, pixelPath, attributes, uniforms)');
	    }

	    this.backFaceCulling = true;
	    this._textures = [];

	    this._renderer = renderer;

	    this._vertexPath = vertexPath || defaults.vertexPath;
	    this._pixelPath = pixelPath || defaults.pixelPath;

	    this._defines = defines ? defines : [];
	    this._attributes = attributes;
	    this._uniforms = uniforms ? uniforms : [];

	    this._fromDOM = fromDOM;
	    this._programReady = false;

	    this._program = null;
	    this._uniformsLocations = {};
	  }

	  _createClass(Material, [{
	    key: 'addTexture',
	    value: function addTexture(texture) {
	      this._textures.push(texture);
	    }
	  }, {
	    key: 'compile',
	    value: function compile() {
	      var vertex = undefined;
	      var pixel = undefined;

	      if (this._fromDOM) {
	        vertex = document.getElementById(this._vertexPath).innerText;
	        pixel = document.getElementById(this._pixelPath).innerText;
	      } else {
	        if (this._vertexPath === defaults.vertexPath) {
	          vertex = _ShadersSolidVertexGlsl2['default'];
	        } else {
	          // TODO
	          // Async loading via XHR using the Fetch API
	        }

	        if (this._pixelPath === defaults.pixelPath) {
	          pixel = _ShadersSolidFragmentGlsl2['default'];
	        } else {
	          // TODO
	          // Async loading via XHR using the Fetch API
	        }
	      }

	      if (!vertex || !pixel) {
	        throw new _utilsErrors.PompeiError('No vertex nor pixel shader data in Material.compile()');
	      }

	      this._createProgram(vertex, pixel);
	      this._renderer.configureMaterialUniforms(this);
	    }

	    // Can be overrided
	  }, {
	    key: 'onSetConstants',
	    value: function onSetConstants(renderer, service) {
	      var worldViewProjection = _CoreMatrix2['default'].Identity();
	      worldViewProjection.multiply(renderer.projectionMatrix).multiply(renderer.viewMatrix).multiply(renderer.worldMatrix);

	      service.setMatrix('u_worldViewProjection', worldViewProjection);
	    }
	  }, {
	    key: '_createProgram',
	    value: function _createProgram(vertexCode, pixelCode) {
	      var defines = '';
	      for (var i = 0; i < this._defines.length; i++) {
	        defines += '#define ' + this._defines[i];+'\n';
	      }

	      this._program = this._renderer.createProgram(vertexCode, pixelCode, this._attributes, this._uniforms, defines);
	      this._programReady = true;
	    }
	  }, {
	    key: 'renderer',
	    get: function get() {
	      return this._renderer;
	    }
	  }, {
	    key: 'program',
	    get: function get() {
	      return this._program;
	    }
	  }, {
	    key: 'defines',
	    get: function get() {
	      return this._defines;
	    }
	  }, {
	    key: 'attributes',
	    get: function get() {
	      return this._attributes;
	    }
	  }, {
	    key: 'uniforms',
	    get: function get() {
	      return this._uniforms;
	    }
	  }, {
	    key: 'programReady',
	    get: function get() {
	      return this._programReady;
	    }
	  }, {
	    key: 'uniformsLocations',
	    get: function get() {
	      return this._uniformsLocations;
	    }
	  }, {
	    key: 'textures',
	    get: function get() {
	      return this._textures;
	    }
	  }]);

	  return Material;
	})();

	exports['default'] = Material;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "#ifdef GL_ES\r\nprecision highp float;\r\n#endif\r\n\r\nuniform mat4 u_worldViewProjection;\r\n\r\nattribute vec3 a_position;\r\nattribute vec2 a_uv;\r\n\r\nvarying vec2 v_uv;\r\n\r\nvoid main () {\r\n    v_uv = a_uv;\r\n\r\n    gl_Position = u_worldViewProjection * vec4(a_position.xyz, 1.0);\r\n}\r\n"

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "#ifdef GL_ES\r\nprecision highp float;\r\n#endif\r\n\r\nuniform sampler2D u_diffuse;\r\n\r\nvarying vec2 v_uv;\r\n\r\nvoid main () {\r\n    gl_FragColor = texture2D(u_diffuse, v_uv);\r\n}\r\n"

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var _CoreVector = __webpack_require__(4);

	var _CoreMatrix = __webpack_require__(6);

	var _CoreMatrix2 = _interopRequireDefault(_CoreMatrix);

	var _TexturesTexture = __webpack_require__(14);

	var _TexturesTexture2 = _interopRequireDefault(_TexturesTexture);

	var MaterialRenderer = (function () {
	  /**
	   * @constructor
	   * @param {WebGLRenderingContext} gl
	   */

	  function MaterialRenderer(gl) {
	    _classCallCheck(this, MaterialRenderer);

	    if (!(gl instanceof WebGLRenderingContext)) {
	      throw new _utilsErrors.PompeiError('Bad argument: gl must be a WebGLRenderingContext. constructor(gl)');
	    }

	    this._gl = gl;
	    this._currentMaterial = null;
	  }

	  _createClass(MaterialRenderer, [{
	    key: 'setInt',
	    value: function setInt(uniform, int) {
	      var location = this._currentMaterial.uniformsLocations[uniform];
	      if (!location) {
	        return;
	      }

	      this._gl.uniform1i(location, int);
	    }
	  }, {
	    key: 'setMatrix',
	    value: function setMatrix(uniform, matrix) {
	      var location = this._currentMaterial.uniformsLocations[uniform];
	      if (!location) {
	        return;
	      }

	      this._gl.uniformMatrix4fv(location, false, matrix.m);
	    }
	  }, {
	    key: 'currentMaterial',
	    get: function get() {
	      return this._currentMaterial;
	    },
	    set: function set(currentMaterial) {
	      this._currentMaterial = currentMaterial;
	    }
	  }]);

	  return MaterialRenderer;
	})();

	exports['default'] = MaterialRenderer;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Renderer = __webpack_require__(2);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var Texture = (function () {
	  function Texture(renderer, url, image, texture) {
	    _classCallCheck(this, Texture);

	    this._renderer = renderer;
	    this._url = url;
	    this._texture = texture;
	    this._image = image;
	  }

	  _createClass(Texture, [{
	    key: 'clone',
	    value: function clone(onCloned) {
	      return this._renderer.createTexture(this._url, onCloned, true);
	    }
	  }, {
	    key: 'renderer',
	    get: function get() {
	      return this._renderer;
	    }
	  }, {
	    key: 'url',
	    get: function get() {
	      return this._url;
	    }
	  }, {
	    key: 'texture',
	    get: function get() {
	      return this._texture;
	    }
	  }, {
	    key: 'image',
	    get: function get() {
	      return this._image;
	    }
	  }]);

	  return Texture;
	})();

	exports['default'] = Texture;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utilsErrors = __webpack_require__(3);

	var _Renderer = __webpack_require__(2);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _Material2 = __webpack_require__(10);

	var _Material3 = _interopRequireDefault(_Material2);

	var SolidMaterial = (function (_Material) {
	  _inherits(SolidMaterial, _Material);

	  function SolidMaterial(renderer) {
	    _classCallCheck(this, SolidMaterial);

	    _get(Object.getPrototypeOf(SolidMaterial.prototype), 'constructor', this).call(this, renderer, 'Shaders/Solid.vertex.glsl', 'Shaders/Solid.fragment.glsl', ["a_position", "a_uv"], ["u_worldViewProjection", "u_diffuse"], [], false);

	    this.compile();
	  }

	  // Can be overrided

	  _createClass(SolidMaterial, [{
	    key: 'onSetConstants',
	    value: function onSetConstants(renderer, service) {
	      _get(Object.getPrototypeOf(SolidMaterial.prototype), 'onSetConstants', this).call(this, renderer, service);

	      // Textures
	      service.setInt("u_diffuse", 0);
	    }
	  }]);

	  return SolidMaterial;
	})(_Material3['default']);

	exports['default'] = SolidMaterial;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var _Renderer = __webpack_require__(2);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _SceneNodesSceneNode = __webpack_require__(17);

	var _SceneNodesSceneNode2 = _interopRequireDefault(_SceneNodesSceneNode);

	var Scene = (function () {
	  function Scene(renderer, options) {
	    _classCallCheck(this, Scene);

	    if (!renderer || !(renderer instanceof _Renderer2['default'])) {
	      throw new _utilsErrors.PompeiError('Bad parameters for Scene(renderer, [options])');
	    }
	    options = options || {};

	    this.activeCamera = null;

	    this._renderer = renderer;

	    this._rootSceneNode = new _SceneNodesSceneNode2['default']("root", this);
	    this._rootSceneNode.parent = null;
	  }

	  _createClass(Scene, [{
	    key: 'now',
	    value: function now() {
	      return this._renderer.now();
	    }
	  }, {
	    key: 'drawAll',
	    value: function drawAll() {
	      if (!this._renderer.defaultMaterial.programReady) {
	        return;
	      }

	      // Sort scene nodes here

	      // Render
	      this.drawSceneNode(this._rootSceneNode, true);
	    }
	  }, {
	    key: 'drawSceneNode',
	    value: function drawSceneNode(node, drawChildren) {
	      if (!drawChildren) {
	        drawChildren = false;
	      }

	      node.render();

	      if (!drawChildren) {
	        return;
	      }

	      for (var i = 0; i < node.children.length; i++) {
	        this.drawSceneNode(node.children[i], drawChildren);
	      }
	    }
	  }, {
	    key: 'renderer',
	    get: function get() {
	      return this._renderer;
	    }
	  }, {
	    key: 'rootSceneNode',
	    get: function get() {
	      return this._rootSceneNode;
	    }
	  }]);

	  return Scene;
	})();

	exports['default'] = Scene;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var _CoreVector = __webpack_require__(4);

	var _CoreMatrix = __webpack_require__(6);

	var _CoreMatrix2 = _interopRequireDefault(_CoreMatrix);

	var _AnimatorsAnimator = __webpack_require__(18);

	var _AnimatorsAnimator2 = _interopRequireDefault(_AnimatorsAnimator);

	var SceneNode = (function () {
		function SceneNode(name, scene, parent) {
			_classCallCheck(this, SceneNode);

			if (!name || !scene) {
				throw new _utilsErrors.PompeiError('Bad parameters: name and scene must be provided. constructor(name, scene, parent)');
			}

			this.name = name;
			this.isVisible = true;

			this._scene = scene;
			this._renderer = scene.renderer;

			// Parenting
			parent = parent instanceof SceneNode ? parent : scene.rootSceneNode;

			if (parent) {
				parent.addChild(this);
			}

			this._children = [];

			// Transformations
			this._position = new _CoreVector.Vector3();
			this._rotation = new _CoreVector.Vector3();
			this._scale = new _CoreVector.Vector3([1, 1, 1]);

			this._absoluteTransform = _CoreMatrix2['default'].Identity();

			// Animators
			this._animators = [];

			// Temp values
			this._tempWorldTransform = _CoreMatrix2['default'].Identity();
			this._tempRelativeTransform = _CoreMatrix2['default'].Identity();
			this._tempRelativeTransformScale = _CoreMatrix2['default'].Identity();
		}

		// To be overrided

		_createClass(SceneNode, [{
			key: 'render',
			value: function render() {
				this.updateAbsoluteTransformation();

				var now = this._scene.now();

				for (var i = 0; i < this._animators.length; i++) {
					this._animators[i].onAnimate(now);
				}
			}
		}, {
			key: 'addChild',
			value: function addChild(child) {
				if (child && child != this) {
					child._parent = this;
					this._children.push(child);
				}
			}
		}, {
			key: 'removeChild',
			value: function removeChild(child) {
				for (var i = 0; i < this._children.length; i++) {
					if (this._children[i] === child) {
						child._parent = null;
						this._children.splice(i, 1);
						return true;
					}
				}

				return false;
			}
		}, {
			key: 'remove',
			value: function remove() {
				if (this._parent) {
					this._parent.removeChild(this);
				}
			}
		}, {
			key: 'updateAbsoluteTransformation',
			value: function updateAbsoluteTransformation() {
				this._absoluteTransform.makeIdentity();

				if (this._parent) {
					this._absoluteTransform.set(this._parent.absoluteTransformation).multiply(this.relativeTransformation);
				} else {
					this._absoluteTransform.set(this.relativeTransformation);
				}
			}
		}, {
			key: 'addAnimator',
			value: function addAnimator(animator) {
				if (!(animator instanceof _AnimatorsAnimator2['default'])) {
					throw new _utilsErrors.PompeiError('Bad parameter: animator must be an Animator. addAnimator (animator)');
				}

				this._animators.push(animator);
			}
		}, {
			key: 'removeAnimator',
			value: function removeAnimator(animator) {
				var index = this._animators.indexOf(animator);

				if (index !== -1) {
					this._animators.splice(index, 1);
					return true;
				}

				return false;
			}
		}, {
			key: 'absoluteTransformation',
			get: function get() {
				return this._absoluteTransform;
			}
		}, {
			key: 'parent',
			get: function get() {
				return this._parent;
			},
			set: function set(parent) {
				this.remove();
				this._parent = parent;

				if (this._parent) {
					parent.addChild(this);
				}
			}
		}, {
			key: 'children',
			get: function get() {
				return this._children;
			}
		}, {
			key: 'position',
			get: function get() {
				return this._position;
			},
			set: function set(position) {
				if (!(position instanceof _CoreVector.Vector3)) {
					throw new _utilsErrors.PompeiError('Bad parameter. Position must be a Vector3. set position (position)');
				}

				this._position = position;
			}
		}, {
			key: 'rotation',
			get: function get() {
				return this._rotation;
			},
			set: function set(rotation) {
				if (!(rotation instanceof _CoreVector.Vector3)) {
					throw new _utilsErrors.PompeiError('Bad parameter. Rotation must be a Vector3. set rotation (rotation)');
				}

				this._rotation = rotation;
			}
		}, {
			key: 'scale',
			get: function get() {
				return this._scale;
			},
			set: function set(scale) {
				if (!(scale instanceof _CoreVector.Vector3)) {
					throw new _utilsErrors.PompeiError('Bad parameter. Scale must be a Vector3. set scale (scale)');
				}

				this._scale = scale;
			}

			// Transformations
		}, {
			key: 'worldMatrix',
			get: function get() {
				this._tempWorldTransform.setScale(this._scale);
				this._tempWorldTransform.setRotationDegrees(this._rotation);
				this._tempWorldTransform.setTranslation(this._position);

				return this._tempWorldTransform;
			},
			set: function set(worldMatrix) {
				worldMatrix.getScale(this._scale);
				worldMatrix.getRotationDegrees(this._rotation);
				worldMatrix.getTranslation(this._position);
			}

			// Animators
		}, {
			key: 'relativeTransformation',
			get: function get() {
				this._tempRelativeTransform.setRotationDegrees(this._rotation);
				this._tempRelativeTransform.setTranslation(this._position);

				if (this._scale.x !== 1.0 || this._scale.y !== 1.0 || this._scale.z !== 1.0) {
					this._tempRelativeTransformScale.makeIdentity();
					this._tempRelativeTransformScale.setScale(this._scale);
					this._tempRelativeTransform.multiply(this._tempRelativeTransformScale);
				}

				return this._tempRelativeTransform;
			}
		}, {
			key: 'animators',
			get: function get() {
				return this._animators;
			}
		}]);

		return SceneNode;
	})();

	exports['default'] = SceneNode;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var _SceneNodesSceneNode = __webpack_require__(17);

	var _SceneNodesSceneNode2 = _interopRequireDefault(_SceneNodesSceneNode);

	var Animator = (function () {

	  /**
	   * @constructor
	   * @param {Scene} scene
	   * @param {SceneNode} object
	   */

	  function Animator(scene, object) {
	    _classCallCheck(this, Animator);

	    if (!(object instanceof _SceneNodesSceneNode2['default'])) {
	      throw new _utilsErrors.PompeiError('Bad argument: object must be a SceneNode. constructor (scene, object)');
	    }

	    this._object = object;
	    this._scene = scene;
	  }

	  _createClass(Animator, [{
	    key: 'onAnimate',

	    // To be overrided
	    value: function onAnimate(timeMS) {}

	    // To be overrided
	  }, {
	    key: 'onFinished',
	    value: function onFinished() {}

	    // To be overrided
	  }, {
	    key: 'onRemove',
	    value: function onRemove() {}
	  }, {
	    key: 'object',
	    get: function get() {
	      return this._object;
	    }
	  }]);

	  return Animator;
	})();

	exports['default'] = Animator;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsErrors = __webpack_require__(3);

	var _CoreVertexBuffer = __webpack_require__(7);

	var _CoreVertexBuffer2 = _interopRequireDefault(_CoreVertexBuffer);

	var Mesh = (function () {
	  /**
	   * @constructor
	   * @param {object} geometry.
	   * @param {object} options
	   */

	  function Mesh(vertexBuffers, scene) {
	    _classCallCheck(this, Mesh);

	    if (!Array.isArray(vertexBuffers)) {
	      throw new _utilsErrors.PompeiError('Bad argument: vertexBuffers must be an array. constructor(vertexBuffers)');
	    }

	    this._vertexBuffers = vertexBuffers;
	    this._scene = scene;
	    this._renderer = scene.renderer;
	  }

	  _createClass(Mesh, [{
	    key: 'addVertexBuffer',
	    value: function addVertexBuffer(vertexBuffer) {
	      if (!(vertexBuffer instanceof _CoreVertexBuffer2['default'])) {
	        throw new _utilsErrors.PompeiError('Bad argument: vertexBuffer must be an instance of VertexBuffer. addVertexBuffer (vertexBuffer)');
	      }

	      this._vertexBuffers.push(vertexBuffer);
	    }
	  }, {
	    key: 'removeVertexBuffer',
	    value: function removeVertexBuffer(vertexBuffer) {
	      var indice = this._vertexBuffers.indexOf(vertexBuffer);

	      if (indice !== -1) {
	        this._vertexBuffers.splice(indice, 1);
	        return true;
	      }

	      return false;
	    }
	  }, {
	    key: 'finish',
	    value: function finish() {
	      for (var i = 0; i < this._vertexBuffers.length; i++) {
	        var vertexBuffer = this._vertexBuffers[i];
	        this._renderer.createVertexBuffer(vertexBuffer);
	        this._renderer.createIndexBuffer(vertexBuffer);
	      }
	    }
	  }, {
	    key: 'vertexBuffers',
	    get: function get() {
	      return this._vertexBuffers;
	    }
	  }]);

	  return Mesh;
	})();

	exports['default'] = Mesh;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utilsErrors = __webpack_require__(3);

	var _SceneNodesSceneNode = __webpack_require__(17);

	var _SceneNodesSceneNode2 = _interopRequireDefault(_SceneNodesSceneNode);

	var _Animator2 = __webpack_require__(18);

	var _Animator3 = _interopRequireDefault(_Animator2);

	var _CoreVector = __webpack_require__(4);

	var RotationAnimator = (function (_Animator) {
	  _inherits(RotationAnimator, _Animator);

	  /**
	   * @constructor
	   * @param {Scene} scene
	   * @param {SceneNode} object
	   * @param {Vector3} direction
	   */

	  function RotationAnimator(scene, object, direction) {
	    _classCallCheck(this, RotationAnimator);

	    _get(Object.getPrototypeOf(RotationAnimator.prototype), 'constructor', this).call(this, scene, object);

	    if (!(direction instanceof _CoreVector.Vector3)) {
	      throw new _utilsErrors.PompeiError('Bad argument: direction must be a Vector3. constructor (scene, object, direction)');
	    }

	    this._direction = direction;
	    this._tempDirection = new _CoreVector.Vector3();

	    this._startTime = performance.now();
	  }

	  _createClass(RotationAnimator, [{
	    key: 'onAnimate',
	    value: function onAnimate(timeMS) {
	      var diffTime = timeMS - this._startTime;

	      if (diffTime !== 0) {
	        this._tempDirection.set(this._object.rotation).plus(this._direction).multiplyScalar(diffTime * 0.1);

	        if (this._tempDirection.x > 360.0) {
	          this._tempDirection.x = this._tempDirection.x % 360.0;
	        }
	        if (this._tempDirection.y > 360.0) {
	          this._tempDirection.y = this._tempDirection.y % 360.0;
	        }
	        if (this._tempDirection.z > 360.0) {
	          this._tempDirection.z = this._tempDirection.z % 360.0;
	        }

	        this._object.rotation.set(this._tempDirection);
	        this._startTime = timeMS;
	      }
	    }
	  }]);

	  return RotationAnimator;
	})(_Animator3['default']);

	exports['default'] = RotationAnimator;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utilsErrors = __webpack_require__(3);

	var _SceneNodesCameraSceneNode = __webpack_require__(22);

	var _SceneNodesCameraSceneNode2 = _interopRequireDefault(_SceneNodesCameraSceneNode);

	var _SceneNodesSceneNode = __webpack_require__(17);

	var _SceneNodesSceneNode2 = _interopRequireDefault(_SceneNodesSceneNode);

	var _Animator2 = __webpack_require__(18);

	var _Animator3 = _interopRequireDefault(_Animator2);

	var _CoreVector = __webpack_require__(4);

	var RotationCameraAnimator = (function (_Animator) {
	  _inherits(RotationCameraAnimator, _Animator);

	  /**
	   * @constructor
	   * @param {Scene} scene
	   * @param {Camera} camera
	   */

	  function RotationCameraAnimator(scene, camera) {
	    _classCallCheck(this, RotationCameraAnimator);

	    _get(Object.getPrototypeOf(RotationCameraAnimator.prototype), 'constructor', this).call(this, scene, camera);

	    if (!(camera instanceof _SceneNodesCameraSceneNode2['default'])) {
	      throw new _utilsErrors.PompeiError('Bad argument: direction must be a Camera. constructor (scene, camera)');
	    }

	    this.rotateSpeed = -1.0;
	    this.translateSpeed = 1.0;
	    this.zoomSpeed = 200.0;

	    this._camera = camera;

	    this._mouseRotate = false;
	    this._mouseTranslate = false;
	    this._rotating = false;
	    this._translating = false;
	    this._moving = false;

	    this._rotX = 0.0;
	    this._rotY = 0.0;
	    this._currentZoom = 10;
	    this._currentMouseWheel = 0;

	    this._mousePosition = new _CoreVector.Vector2();
	    this._rotateStart = new _CoreVector.Vector2();
	    this._translateStart = new _CoreVector.Vector2();
	    this._zoomStart = new _CoreVector.Vector2();

	    this._lastCameraTarget = new _CoreVector.Vector3(camera.target);
	    this._oldTarget = new _CoreVector.Vector3(camera.target);

	    this._tempPositionTargetX = new _CoreVector.Vector3();
	    this._tempPositionTargetY = new _CoreVector.Vector3();
	    this._tempPosition = new _CoreVector.Vector3();
	    this._tempTranslate = new _CoreVector.Vector3();
	    this._tempUpVector = new _CoreVector.Vector3();
	    this._tempTarget = new _CoreVector.Vector3();
	    this._tempPositionTarget = new _CoreVector.Vector3();

	    // Configure events
	    scene.renderer.canvas.addEventListener('mousedown', this.onMouseDown());
	    scene.renderer.canvas.addEventListener('mouseup', this.onMouseUp());
	    scene.renderer.canvas.addEventListener('mousewheel', this.onMouseWheel());
	    scene.renderer.canvas.addEventListener('mousemove', this.onMouseMove());
	  }

	  _createClass(RotationCameraAnimator, [{
	    key: 'onMouseMove',
	    value: function onMouseMove() {
	      var _this = this;

	      return function (event) {
	        _this._mousePosition.x = event.clientX;
	        _this._mousePosition.y = event.clientY;
	      };
	    }
	  }, {
	    key: 'onMouseUp',
	    value: function onMouseUp() {
	      var _this2 = this;

	      return function (event) {
	        _this2._mouseTranslate = !(event.button === 2);
	        _this2._mouseRotate = !(event.button === 0);
	      };
	    }
	  }, {
	    key: 'onMouseDown',
	    value: function onMouseDown() {
	      var _this3 = this;

	      return function (event) {
	        _this3._mousePosition.x = event.clientX;
	        _this3._mousePosition.y = event.clientY;

	        _this3._mouseTranslate = event.button === 2;
	        _this3._mouseRotate = event.button === 0;
	      };
	    }
	  }, {
	    key: 'onMouseWheel',
	    value: function onMouseWheel() {
	      var _this4 = this;

	      return function (event) {
	        _this4._currentMouseWheel += event.wheelDeltaY * 0.01;
	      };
	    }
	  }, {
	    key: 'onAnimate',
	    value: function onAnimate(timeMS) {
	      var nRotX = this._rotX;
	      var nRotY = this._rotY;
	      var nZoom = this._currentZoom;

	      // Update old target
	      this._oldTarget.plus(this._camera.target).minus(this._lastCameraTarget);

	      // Zoom
	      var old = this._currentZoom;
	      this._currentZoom = this._currentZoom + this._currentMouseWheel * this.zoomSpeed;
	      this._currentMouseWheel = 0;
	      nZoom = this._currentZoom;

	      if (nZoom < 0) {
	        nZoom = this._currentZoom = old;
	      }

	      // Translation
	      this._tempTranslate.set(this._oldTarget);
	      this._tempUpVector.set(this._camera.upVector);
	      this._tempTarget.set(this._camera.target);

	      this._tempPosition.set(this._camera.position);
	      this._tempPositionTargetX.set(this._tempPosition).minus(this._tempTarget);
	      this._tempPositionTargetX.cross(this._tempUpVector);
	      this._tempPositionTargetX.normalize();

	      this._tempPositionTargetY.cross(this._tempUpVector.y > 0 ? this._tempPositionTarget.set(this._tempPosition).minus(this._tempPositionTarget) : this._tempPositionTarget.set(this._tempTarget).minus(this._tempPosition));
	      this._tempPositionTargetY.normalize();

	      // Rotation
	      if (this._mouseRotate) {
	        if (!this._rotating) {
	          this._rotateStart.set(this._mousePosition);
	          this._rotating = true;
	          nRotX = this._rotX;
	          nRotY = this._rotY;
	        } else {
	          nRotX += (this._rotateStart.x - this._mousePosition.x) * this.rotateSpeed;
	          nRotY += (this._rotateStart.y - this._mousePosition.y) * this.rotateSpeed;
	        }
	      } else if (this._rotating) {
	        this._rotX += (this._rotateStart.x - this._mousePosition.x) * this.rotateSpeed;
	        this._rotY += (this._rotateStart.y - this._mousePosition.y) * this.rotateSpeed;
	        nRotX = this._rotX;
	        nRotY = this._rotY;
	        this._rotating = false;
	      }

	      // Set pos
	      this._tempPosition.set(this._tempTranslate);
	      this._tempPosition.x += nZoom;

	      this._tempPosition.rotateXYBy(nRotY, this._tempTranslate);
	      this._tempPosition.rotateXZBy(-nRotX, this._tempTranslate);

	      this._camera.position.set(this._tempPosition);
	      this._camera.target = this._tempTranslate;

	      // Fix pos
	      this._tempPosition.set([0, 1, 0]);
	      this._tempPosition.rotateXYBy(-nRotY);
	      this._tempPosition.rotateXZBy(-nRotX + 180);
	      this._camera.upVector.set(this._tempPosition);
	      this._lastCameraTarget.set(this._camera.target);
	    }
	  }]);

	  return RotationCameraAnimator;
	})(_Animator3['default']);

	exports['default'] = RotationCameraAnimator;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utilsErrors = __webpack_require__(3);

	var _SceneNode2 = __webpack_require__(17);

	var _SceneNode3 = _interopRequireDefault(_SceneNode2);

	var _CoreMatrix = __webpack_require__(6);

	var _CoreMatrix2 = _interopRequireDefault(_CoreMatrix);

	var _CoreVector = __webpack_require__(4);

	var CameraSceneNode = (function (_SceneNode) {
	  _inherits(CameraSceneNode, _SceneNode);

	  function CameraSceneNode(name, scene, parent) {
	    _classCallCheck(this, CameraSceneNode);

	    _get(Object.getPrototypeOf(CameraSceneNode.prototype), 'constructor', this).call(this, name, scene, parent);

	    // Set as active camera
	    if (!scene.activeCamera) {
	      scene.activeCamera = this;
	    }

	    this._viewMatrix = _CoreMatrix2['default'].Identity();
	    this._projectionMatrix = _CoreMatrix2['default'].Identity();

	    this._target = new _CoreVector.Vector3([0, 0, 0]);
	    this._upVector = new _CoreVector.Vector3([0, 1, 0]);

	    this._fov = Math.PI / 2.5;
	    this._aspect = scene.renderer.canvas.width / scene.renderer.canvas.height;
	    this._zNear = 1.0;
	    this._zFar = 3000.0;

	    // Temporary vectors
	    this._tempUpVector = new _CoreVector.Vector3();
	    this._tempTarget = new _CoreVector.Vector3();

	    // Finish
	    this.buildProjectionMatrix();
	  }

	  _createClass(CameraSceneNode, [{
	    key: 'render',
	    value: function render() {
	      _get(Object.getPrototypeOf(CameraSceneNode.prototype), 'render', this).call(this);

	      var tgtv = this._tempTarget.set(this._target).minus(this._position).normalize();

	      var up = this._tempUpVector.set(this._upVector).normalize();
	      var dp = tgtv.dot(up);

	      if (Math.abs(dp) === 1.0) {
	        up.x += 0.5;
	      }

	      this._viewMatrix.buildCameraLookAtMatrix(this._position, this._target, up);

	      this._renderer.viewMatrix.set(this._viewMatrix);
	      this._renderer.projectionMatrix.set(this._projectionMatrix);
	    }
	  }, {
	    key: 'buildProjectionMatrix',
	    value: function buildProjectionMatrix() {
	      this._projectionMatrix.buildProjectionMatrix(this._fov, this._aspect, this._zNear, this._zFar);
	    }
	  }, {
	    key: 'viewMatrix',
	    value: function viewMatrix() {
	      return this._viewMatrix;
	    }
	  }, {
	    key: 'projectionMatrix',
	    value: function projectionMatrix() {
	      return this._projectionMatrix;
	    }
	  }, {
	    key: 'target',
	    get: function get() {
	      return this._target;
	    },
	    set: function set(target) {
	      this._target.set(target);

	      var toTarget = new _CoreVector.Vector3(this._target).minus(this._position);
	      this.rotation = toTarget.getHorizontalAngle();
	    }
	  }, {
	    key: 'upVector',
	    get: function get() {
	      return this._upVector;
	    },
	    set: function set(upVector) {
	      this._upVector.set(upVector);
	    }
	  }]);

	  return CameraSceneNode;
	})(_SceneNode3['default']);

	exports['default'] = CameraSceneNode;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utilsErrors = __webpack_require__(3);

	var _SceneNode2 = __webpack_require__(17);

	var _SceneNode3 = _interopRequireDefault(_SceneNode2);

	var _CoreVector = __webpack_require__(4);

	var _MeshMeshJs = __webpack_require__(19);

	var _MeshMeshJs2 = _interopRequireDefault(_MeshMeshJs);

	var MeshSceneNode = (function (_SceneNode) {
		_inherits(MeshSceneNode, _SceneNode);

		function MeshSceneNode(name, scene, parent, mesh) {
			_classCallCheck(this, MeshSceneNode);

			_get(Object.getPrototypeOf(MeshSceneNode.prototype), 'constructor', this).call(this, name, scene, parent);

			this._mesh = mesh;
		}

		_createClass(MeshSceneNode, [{
			key: 'render',
			value: function render() {
				if (!this.isVisible) {
					return;
				}

				_get(Object.getPrototypeOf(MeshSceneNode.prototype), 'render', this).call(this);

				// Transformations
				this._renderer.worldMatrix.set(this._absoluteTransform);

				// Draw buffers
				for (var i = 0; i < this._mesh.vertexBuffers.length; i++) {
					var vertexBuffer = this._mesh.vertexBuffers[i];

					this._renderer.setMaterial(vertexBuffer.material);
					this._renderer.drawBuffer(vertexBuffer);
				}
			}
		}, {
			key: 'mesh',
			get: function get() {
				return this._mesh;
			},
			set: function set(mesh) {
				if (!(mesh instanceof _MeshMeshJs2['default'])) {
					throw new _utilsErrors.PompeiError('Bad argument: mesh must be a Mesh. set mesh (mesh)');
				}

				this._mesh = mesh;
			}
		}]);

		return MeshSceneNode;
	})(_SceneNode3['default']);

	exports['default'] = MeshSceneNode;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;