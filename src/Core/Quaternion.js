import { PompeiError } from '../utils/errors';
import { Vector3 } from './Vector';
import Core from './Core';

export default class Quaternion {
  constructor (x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  
  fromAngleAxis (axis, angle) {
    const halfAngle = 0.5 * angle;
    const sin = Math.sin(halfAngle);
    
    this.x = Math.cos(halfAngle);
    this.x = sin * axis.x;
    this.y = sin * axis.y;
    this.z = sin * axis.z;
    
    return this;
  }
  
  toAngleAxis (axis, angle) {
    const scale = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    
    if (scale === 0.0 || this.w > 1.0 || this.w < -1.0) {
      angle = 0.0;
      axis.x = 0.0;
      axis.y = 1.0;
      axis.z = 0.0;
    }
    else {
      const invscale = 1.0 / scale;
      angle = 2.0 * Math.acos(this.w);
      axis.x = this.x * invscale;
      axis.y = this.y * invscale;
      axis.z = this.z * invscale;
    }
  }
  
  toEuler (result) {
    result = result || new Vector3(0, 0, 0);
    
    let X = this.x;
    let Y = this.y;
    let Z = this.z;
    let W = this.w;
    
    const sqw = W * W;
    const sqx = X * X;
    const sqy = Y * Y;
    const sqz = Z * Z;
    const test = 2.0 * (Y * W - X * Z);
  
    if (test === 1.0) {
      result.z = (-2.0 * Math.atan2(X, W));
      result.x = 0;
      result.y = (Math.PI / 2.0);
    }
    else if (test === -1.0) {
      result.z = (2.0 * Math.atan2(X, W));
      result.x = 0;
      result.y = (Math.PI / -2.0);
    }
    else {
      result.z = Math.atan2(2.0 * (X * Y + Z * W), (sqx  - sqy - sqz + sqw));
      result.x = Math.atan2(2.0 * (Y * Z + X * W), (-sqx - sqy + sqz + sqw));
      result.y = Math.asin( Core.Clamp(test, -1.0, 1.0) );
    }
    
    return result;
  }
}