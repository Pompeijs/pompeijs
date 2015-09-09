import { PompeiError } from '../utils/errors';

export default class Color {
  constructor (other) {
    this.r = 0.0;
    this.g = 0.0;
    this.b = 0.0;
    this.a = 0.0;

    if (other) {
      this.set(other);
    }
  }

  toArray () {
    return [this.r, this.g, this.b, this.a];
  }
  
  set (other) {
    if (other instanceof Color) {
      this.r = other.r;
      this.g = other.g;
      this.b = other.b;
      this.a = other.a;
    }
    else if (other instanceof Array) {
      this.r = other[0];
      this.g = other[1];
      this.b = other[2];
      this.a = other[3];
    }
  }

  fromArray (other) {
    this.r = other[0];
    this.g = other[1];
    this.b = other[2];
    this.a = other[3];
  }

  plus (other) {
    this.r += other.r;
    this.g += other.g;
    this.b += other.b;
    this.a += other.a;
  }

  minus (other) {
    this.r -= other.r;
    this.g -= other.g;
    this.b -= other.b;
    this.a -= other.a;
  }

  multiply (other) {
    this.r *= other.r;
    this.g *= other.g;
    this.b *= other.b;
    this.a *= other.a;
  }
}
