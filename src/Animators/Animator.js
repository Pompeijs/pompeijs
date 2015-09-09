import { PompeiError } from '../utils/errors';

import SceneNode from '../SceneNodes/SceneNode';

export default class Animator {
  
  /**
   * @constructor
   * @param {Scene} scene
   * @param {SceneNode} object
   */
  constructor (scene, object) {
    if (!(object instanceof SceneNode)) {
      throw new PompeiError('Bad argument: object must be a SceneNode. constructor (scene, object)');
    }
    
    this._object = object;
    this._scene = scene;
  }
  
  get object () {
    return this._object;
  }

  // To be overrided
  onAnimate (timeMS) { }
  
  // To be overrided
  onFinished () { }
  
  // To be overrided
  onRemove () { }
}
