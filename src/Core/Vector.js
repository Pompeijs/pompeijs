import Core from './Core';

export class Vector3 {
  constructor (other) {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;

    if (other) {
      this.set(other);
    }
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

  dot (other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  cross (other) {
    let x = this.y * other.z - this.z * other.y;
    let y = this.z * other.x - this.x * other.z;
    let z = this.x * other.y - this.y * other.x;

    return new Vector3([x, y, z]);
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
    let angle = new Vector3();

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
}

export class Vector2 {
  constructor(other) {
    this.x = 0.0;
    this.y = 0.0;

    if (other) {
      this.set(other);
    }
  }

  toArray () {
    return [this.x, this.y];
  }

  set (other) {
    if (other instanceof Vector3) {
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
