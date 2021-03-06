import { PompeiError } from '../utils/errors';
import { Vector3 } from './Vector';
import Core from './Core';

export default class Matrix {
  static get TempMatrix () {
    this._tempMatrix = this._tempMatrix || new Matrix();
    return this._tempMatrix;
  }
  
  constructor(array) {
    this.m = new Float32Array(16);

    if (array && array.length === 16) {
      for ( let i = 0; i < array.length; i++ ) {
        this.m[i] = array[i];
      }
    }
  }

  static Identity(result) {
    return Matrix.FromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  
  static FromValues () {
    if (arguments.length !== 16) {
      throw new PompeiError(
        'Bad parameters: arguments.length = 16. FromValues()'
      );
    }
    
    var mat = new Matrix();
    
    for ( let i = 0; i < arguments.length; i++ ) {
      mat.m[i] = arguments[i];
    }
    
    return mat;
  }
  
  set(other) {
    for (let i=0; i < 16; i++) {
      this.m[i] = other.m[i];
    }
    
    return this;
  }
  
  getAsMatrix3x3() {
      return new Float32Array([
          this.m[0], this.m[1], this.m[2],
          this.m[4], this.m[5], this.m[6],
          this.m[8], this.m[9], this.m[10]
      ]);
  }
  
  getAsMatrix2x2() {
      return new Float32Array([
          this.m[0], this.m[1],
          this.m[4], this.m[5]
      ]);
  }
  
  fromArray(array) {
    for (let i=0; i < 16; i++) {
      this.m[i] = array[i];
    }
  }
  
  makeIdentity() {
    let m = this.m;
    
    for (let i=0; i < 16; i++) {
      m[i] = 0;
    }
    
    m[0] = m[5] = m[10] = m[15] = 1.0;
    
    return this;
  }

  multiply(other) {
    // Simplify the reading by creating temporary variables
    let tempMatrix = new Matrix().set(this);
    
    let m1 = tempMatrix.m;
    let m2 = other.m;
    let m3 = this.m;

		m3[0] = m1[0]*m2[0] + m1[4]*m2[1] + m1[8]*m2[2] + m1[12]*m2[3];
		m3[1] = m1[1]*m2[0] + m1[5]*m2[1] + m1[9]*m2[2] + m1[13]*m2[3];
		m3[2] = m1[2]*m2[0] + m1[6]*m2[1] + m1[10]*m2[2] + m1[14]*m2[3];
		m3[3] = m1[3]*m2[0] + m1[7]*m2[1] + m1[11]*m2[2] + m1[15]*m2[3];

		m3[4] = m1[0]*m2[4] + m1[4]*m2[5] + m1[8]*m2[6] + m1[12]*m2[7];
		m3[5] = m1[1]*m2[4] + m1[5]*m2[5] + m1[9]*m2[6] + m1[13]*m2[7];
		m3[6] = m1[2]*m2[4] + m1[6]*m2[5] + m1[10]*m2[6] + m1[14]*m2[7];
		m3[7] = m1[3]*m2[4] + m1[7]*m2[5] + m1[11]*m2[6] + m1[15]*m2[7];

		m3[8] = m1[0]*m2[8] + m1[4]*m2[9] + m1[8]*m2[10] + m1[12]*m2[11];
		m3[9] = m1[1]*m2[8] + m1[5]*m2[9] + m1[9]*m2[10] + m1[13]*m2[11];
		m3[10] = m1[2]*m2[8] + m1[6]*m2[9] + m1[10]*m2[10] + m1[14]*m2[11];
		m3[11] = m1[3]*m2[8] + m1[7]*m2[9] + m1[11]*m2[10] + m1[15]*m2[11];

		m3[12] = m1[0]*m2[12] + m1[4]*m2[13] + m1[8]*m2[14] + m1[12]*m2[15];
		m3[13] = m1[1]*m2[12] + m1[5]*m2[13] + m1[9]*m2[14] + m1[13]*m2[15];
		m3[14] = m1[2]*m2[12] + m1[6]*m2[13] + m1[10]*m2[14] + m1[14]*m2[15];
		m3[15] = m1[3]*m2[12] + m1[7]*m2[13] + m1[11]*m2[14] + m1[15]*m2[15];

    return this;
  }

  multiplyScalar(scalar) {
    for ( let i = 0; i < 16; i++ ) {
      this.m[i] *= scalar;
    }

    return this;
  }

  plus(other) {
    for ( let i = 0; i < 16; i++ ) {
      this.m[i] += other.m[i];
    }

    return this;
  }

  minus(other) {
    for ( let i = 0; i < 16; i++ ) {
      this.m[i] -= other.m[i];
    }

    return this;
  }
  
  buildProjectionMatrix(fov, aspect, zNear, zFar) {
    let h = 1.0 / Math.tan(fov * 0.5);
    let w = h / aspect;
    let m = this.m;
    
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
  
  buildCameraLookAtMatrix(position, target, up) {
    let zaxis = new Vector3().set(target).minus(position).normalize();
		let xaxis = new Vector3().set(up).cross(zaxis).normalize();
    let yaxis = new Vector3().set(zaxis).cross(xaxis);
    let m = this.m;

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

  getTranslation(result) {
    if (result) {
      result.x = this.m[12];
      result.y = this.m[13];
      result.z = this.m[14];
      return result;
    }

    return new Vector3(this.m[12], this.m[13], this.m[14]);
  }

  setTranslation(translation) {
    this.m[12] = translation.x;
    this.m[13] = translation.y;
    this.m[14] = translation.z;

    return this;
  }

  setScale(scale) {
    this.m[0] = scale.x;
    this.m[5] = scale.y;
    this.m[10] = scale.z;

    return this;
  }

  getScale(result) {
    let x, y, z;
    // Rotation before
    if (
      this.m[1] === 0 &&
      this.m[2] === 0 &&
      this.m[4] === 0 &&
      this.m[6] === 0 &&
      this.m[8] === 0 &&
      this.m[9] === 0
    ) {
      x = this.m[0];
      y = this.m[5];
      z = this.m[10];

      if (result) {
        result.x = x;
        result.y = y;
        result.z = z;

        return result;
      }

      return new Vector3(x, y, z);
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

    return new Vector3(x, y, z);
  }

  setRotationDegrees (rotation) {
    this.setRotation(new Vector3().set(rotation).multiplyScalar(Core.DegToRad()));
  }

  setRotation (rotation) {
    const cr = Math.cos( rotation.x );
    const sr = Math.sin( rotation.x );
    const cp = Math.cos( rotation.y );
    const sp = Math.sin( rotation.y );
    const cy = Math.cos( rotation.z );
    const sy = Math.sin( rotation.z );

    this.m[0] = cp * cy;
    this.m[1] = cp * sy;
    this.m[2] = -sp;

    const srsp = sr * sp;
    const crsp = cr * sp;

    this.m[4] = srsp * cy - cr * sy;
    this.m[5] = srsp * sy + cr * cy;
    this.m[6] = sr * cp;

    this.m[8] = crsp * cy + sr * sy;
    this.m[9] = crsp * sy - sr * cy;
    this.m[10] = cr * cp;

    return this;
  }

  getRotationDegrees (result) {
    result = this.getRotation(result);

    result.x *= Core.RadToDeg();
    result.y *= Core.RadToDeg();
    result.z *= Core.RadToDeg();

    return result;
  }

  getRotation (result) {
    let mat = this.m;
    let scale = this.getScale();

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

    let invScale = new Vector3(1.0 / scale.x, 1.0 / scale.y, 1.0 / scale.z);

    let Y = -Math.asin(Core.Clamp(mat[2] * invScale.x, -1.0, 1.0));
    let C = Math.cos(Y);
    Y *= Core.RadToDeg();

    let rotx, roty, X, Z;

    if (C !== 0.0) {
      let invC = 1.0 / C;
      rotx = mat[10] * invC * invScale.z;
      roty = mat[6] * invC * invScale.y;
      X = Math.atan2(roty, rotx) * Core.RadToDeg();
      rotx = mat[0] * invC * invScale.x;
      roty = mat[1] * invC * invScale.x;
      Z = Math.atan2(roty, rotx) * Core.RadToDeg();
    } else {
      X = 0.0;
      rotx = mat[5] * invScale.y;
      roty = -mat[4] * invScale.y;
      Z = Math.atan2(roty, rotx) * Core.RadToDeg();
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

    return new Vector3(X, Y, Z);
  }
  
  inverse () {
    let l1 = this.m[0];
    let l2 = this.m[1];
    let l3 = this.m[2];
    let l4 = this.m[3];
    let l5 = this.m[4];
    let l6 = this.m[5];
    let l7 = this.m[6];
    let l8 = this.m[7];
    let l9 = this.m[8];
    let l10 = this.m[9];
    let l11 = this.m[10];
    let l12 = this.m[11];
    let l13 = this.m[12];
    let l14 = this.m[13];
    let l15 = this.m[14];
    let l16 = this.m[15];
    let l17 = (l11 * l16) - (l12 * l15);
    let l18 = (l10 * l16) - (l12 * l14);
    let l19 = (l10 * l15) - (l11 * l14);
    let l20 = (l9 * l16) - (l12 * l13);
    let l21 = (l9 * l15) - (l11 * l13);
    let l22 = (l9 * l14) - (l10 * l13);
    let l23 = ((l6 * l17) - (l7 * l18)) + (l8 * l19);
    let l24 = -(((l5 * l17) - (l7 * l20)) + (l8 * l21));
    let l25 = ((l5 * l18) - (l6 * l20)) + (l8 * l22);
    let l26 = -(((l5 * l19) - (l6 * l21)) + (l7 * l22));
    let l27 = 1.0 / ((((l1 * l23) + (l2 * l24)) + (l3 * l25)) + (l4 * l26));
    let l28 = (l7 * l16) - (l8 * l15);
    let l29 = (l6 * l16) - (l8 * l14);
    let l30 = (l6 * l15) - (l7 * l14);
    let l31 = (l5 * l16) - (l8 * l13);
    let l32 = (l5 * l15) - (l7 * l13);
    let l33 = (l5 * l14) - (l6 * l13);
    let l34 = (l7 * l12) - (l8 * l11);
    let l35 = (l6 * l12) - (l8 * l10);
    let l36 = (l6 * l11) - (l7 * l10);
    let l37 = (l5 * l12) - (l8 * l9);
    let l38 = (l5 * l11) - (l7 * l9);
    let l39 = (l5 * l10) - (l6 * l9);

    this.m[0] = l23 * l27;
    this.m[4] = l24 * l27;
    this.m[8] = l25 * l27;
    this.m[12] = l26 * l27;
    this.m[1] = -(((l2 * l17) - (l3 * l18)) + (l4 * l19)) * l27;
    this.m[5] = (((l1 * l17) - (l3 * l20)) + (l4 * l21)) * l27;
    this.m[9] = -(((l1 * l18) - (l2 * l20)) + (l4 * l22)) * l27;
    this.m[13] = (((l1 * l19) - (l2 * l21)) + (l3 * l22)) * l27;
    this.m[2] = (((l2 * l28) - (l3 * l29)) + (l4 * l30)) * l27;
    this.m[6] = -(((l1 * l28) - (l3 * l31)) + (l4 * l32)) * l27;
    this.m[10] = (((l1 * l29) - (l2 * l31)) + (l4 * l33)) * l27;
    this.m[14] = -(((l1 * l30) - (l2 * l32)) + (l3 * l33)) * l27;
    this.m[3] = -(((l2 * l34) - (l3 * l35)) + (l4 * l36)) * l27;
    this.m[7] = (((l1 * l34) - (l3 * l37)) + (l4 * l38)) * l27;
    this.m[11] = -(((l1 * l35) - (l2 * l37)) + (l4 * l39)) * l27;
    this.m[15] = (((l1 * l36) - (l2 * l38)) + (l3 * l39)) * l27;

    return this;
  }
  
  transpose () {
    let m = this.m;
    let o = Matrix.TempMatrix.set(this).m;
    
    m[ 0] = o[ 0];
		m[ 1] = o[ 4];
		m[ 2] = o[ 8];
		m[ 3] = o[12];

		m[ 4] = o[ 1];
		m[ 5] = o[ 5];
		m[ 6] = o[ 9];
		m[ 7] = o[13];

		m[ 8] = o[ 2];
		m[ 9] = o[ 6];
		m[ 0] = o[10];
		m[ 1] = o[14];

		m[ 2] = o[ 3];
		m[ 3] = o[ 7];
		m[ 4] = o[11];
		m[ 5] = o[15];
    
    return this;
  }
}
