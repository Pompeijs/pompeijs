import { PompeiError } from '../utils/errors';

import { Vector3 } from './Vector';
import { Vector2 } from './Vector';

export default class Line {
  static get TempLine () {
    this.templine = this.templine || new Line();
    return this.templine;
  }
  
  constructor(start, end) {
	  this.start = start || new Vector3(0, 0, 0);
	  this.end = end || new Vector3(1, 1, 1);
  }
  
  set (other) {
    this.start.set(other.start);
    this.end.set(other.end);
  }
  
  plus (other) {
    this.start.plus(other.start);
    this.end.plus(other.end);
  }
  
  minus (other) {
    this.start.minus(other.start);
    this.end.minus(other.end);
  }
  
  getLength () {
	 return this.start.getDistanceFrom(this.end);
  }
  
  getLengthSQ () {
    return this.start.getDistanceFromSQ(this.end);
  }
  
  getMiddle () {
    return Line.TempLine.set(this.start).plus(this.end).divideScalar(2);
  }
  
  getVector () {
    return Line.TempLine.set(this.end).minus(this.start);
  }
}
