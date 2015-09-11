export class PompeiError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

export class WebGLSupportError extends PompeiError {
  constructor(m) {
    super(m);
    this.message = m || 'WebGL is not supported';
  }
}

export default {
  PompeiError,
  WebGLSupportError
};
