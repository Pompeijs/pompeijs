import { PompeiError } from '../utils/errors';

import SceneNode from '../SceneNodes/SceneNode';
import Animator from './Animator';

import Core from '../Core/Core';
import { Vector3 } from '../Core/Vector';

export default class RotationAnimator extends Animator {
  
  /**
   * @constructor
   * @param {Scene} scene
   * @param {SceneNode} object
   * @param {Vector3} direction
   */
  constructor (scene, object, direction) {
	  super(scene, object);
    
    if (!(direction instanceof Vector3)) {
      throw new PompeiError('Bad argument: direction must be a Vector3. constructor (scene, object, direction)');
    }
    
    this._direction = direction;
    this._tempDirection = new Vector3();
    
    this._startTime = scene.now();
  }
  
  onAnimate (object, timeMS) {
    if (!object || !object.rotation) {
      return;
    }
    
    const diffTime = timeMS - this._startTime;
    
    if (diffTime !== 0) {
      this._tempDirection.set(this._object.rotation).plus(this._direction).multiplyScalar(diffTime * 0.1);
      
      if (this._tempDirection.x > 360.0) {
        this._tempDirection.x = Core.Fmod(this._tempDirection.x, 360.0);
      }
      if (this._tempDirection.y > 360.0) {
        this._tempDirection.y = Core.Fmod(this._tempDirection.y, 360.0);
      }
      if (this._tempDirection.z > 360.0) {
        this._tempDirection.z = Core.Fmod(this._tempDirection.z, 360.0);
      }
      
      this._object.rotation.set(this._tempDirection);
      this._startTime = timeMS;
    }
  }
}
