import { PompeiError } from '../utils/errors';

import { Vector3 } from './Vector';

export default class Plane3 {

  constructor(point1, point2, point3) {
	  this.point1 = point1;
	  this.point2 = point2;
	  this.point3 = point3;
	  this.normal = new Vector3(0, 1, 0);
	  this.d = 0;
	  
	  this.setPlane(point1, point2, point3);
  }
  
  setPlane (point1, point2, point3) {
	  this.normal = this.point2.minus(this.point1).cross(this.point3.minus(this.point1));
	  this.normal.normalize();
	  
	  this.recalculateD(point1);
  }
  
  recalculateD (point) {
	  this.d = point.dot(this.normal);
  }
}
