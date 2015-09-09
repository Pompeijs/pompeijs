import { PompeiError } from '../utils/errors';

export default class Animator {
  
  /**
   * @constructor
   * @param {object} object
   */
  constructor (scene, object) {
    this._object = object;
  }

  // To be overrided
  onAnimate (timeMS) { }

  // To be overidded
  onFinished () { }
}
