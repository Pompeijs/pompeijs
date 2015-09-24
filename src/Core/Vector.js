import Core from './Core';

export class Vector3 {
  static get Zero () {
    // UGLY WAY TO GO FAST
    // Works as a static member for Vector3 that is a Zero Vector (x=0, y=0, z=0)
    this._zeroVector = this._zeroVector || new Vector3(0, 0, 0);
    return this._zeroVector;
  }
  
  constructor (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toArray () {
    return [this.x, this.y, this.z];
  }

  set (other) {
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
  
  clone () {
    return new Vector3(this.x, this.y, this.z);
  }

  plus (other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;

    return this;
  }

  minus (other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;

    return this;
  }

  multiply (other) {
    this.x *= other.x;
    this.y *= other.y;
    this.z *= other.z;

    return this;
  }
  
  divide (other) {
    this.x /= other.x;
    this.y /= other.y;
    this.z /= other.z;
    
    return this;
  }
  
  multiplyScalar (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    
    return this;
  }
  
  divideScalar (scalar) {
    this.x /= scalar;
    this.y /= scalar;
    this.z /= scalar;
  }

  dot (other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  cross (other) {
    let x = this.y * other.z - this.z * other.y;
    let y = this.z * other.x - this.x * other.z;
    let z = this.x * other.y - this.y * other.x;

    return new Vector3(x, y, z);
  }

  length () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  lengthSQ () {
    return this.x * this.x + this.y + this.y + this.z * this.z;
  }

  getDistanceFrom (other) {
    const x = this.x - other.x;
    const y = this.y - other.y;
    const z = this.z - other.z;

    return Math.sqrt(x * x + y * y + z * z);
  }

  getDistanceFromSQ (other) {
    const x = this.x - other.x;
    const y = this.y - other.y;
    const z = this.z - other.z;

    return x * x + y * y + z * z;
  }
  
  getHorizontalAngle () {
    let angle = new Vector3(0, 0, 0);

    let tmp = (Math.atan2(this.x, this.z) * Core.RadToDeg());
    angle.y = tmp;

    if (angle.y < 0.0)
      angle.y += 360.0;
    if (angle.y >= 360.0)
      angle.y -= 360.0;

    let z1 = Math.sqrt(this.x * this.x + this.z * this.z);
    angle.x = (Math.atan2(z1, this.y) * Core.RadToDeg() - 90.0);

    if (angle.x < 0.0)
      angle.x += 360.0;
    if (angle.x >= 360.0)
      angle.x -= 360.0;

    return angle;
  }

  normalize () {
    let length = this.x * this.x + this.y * this.y + this.z * this.z;
    if (length === 0) {
      return this;
    }

    length = 1.0 / Math.sqrt(length);

    this.x *= length;
    this.y *= length;
    this.z *= length;

    return this;
  }
  
  equals (other) {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }
  
  rotateXYBy (degrees, center) {
    center = center || Vector3.Zero;
    
    degrees *= Core.DegToRad();
    let cs = Math.cos(degrees);
    let sn = Math.sin(degrees);
    this.x -= center.x;
    this.y -= center.y;
    this.set([(this.x*cs - this.y*sn), (this.x*sn + this.y*cs), this.z]);
    this.x += center.x;
    this.y += center.y;
    
    return this;
  }
  
  rotateXZBy (degrees, center) {
    center = center || Vector3.Zero;
    
    degrees *= Core.DegToRad();
    let cs = Math.cos(degrees);
    let sn = Math.sin(degrees);
    this.x -= center.x;
    this.z -= center.z;
    this.set([(this.x*cs - this.z*sn), this.y, (this.x*sn + this.z*cs)]);
    this.x += center.x;
    this.z += center.z;
    
    return this;
  }
}

export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toArray () {
    return [this.x, this.y];
  }

  set (other) {
    if (other instanceof Vector2) {
      this.x = other.x;
      this.y = other.y;
    } else if (other instanceof Array) {
      this.x = other[0];
      this.y = other[1];
    }
  }

  plus (other) {
    this.x += other.x;
    this.y += other.y;

    return this;
  }

  minus (other) {
    this.x -= other.x;
    this.y -= other.y;

    return this;
  }

  multiply (other) {
    this.x *= other.x;
    this.y *= other.y;

    return this;
  }

  divide (other) {
    this.x /= other.x;
    this.y /= other.y;
  }
}

export class Dimension2 extends Vector2 {
  constructor (width, height) {
    super(width, height);
  }
  
  set width (width) {
    this.x = width;
  }
  
  get width () {
    return this.x;
  }
  
  set height (height) {
    this.y = height;
  }
  
  get height () {
    return this.y;
  }
}