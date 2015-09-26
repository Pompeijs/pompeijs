import { PompeiError } from '../utils/errors';

import Camera from '../SceneNodes/CameraSceneNode';
import SceneNode from '../SceneNodes/SceneNode';
import Animator from './Animator';

import { Vector3, Vector2 } from '../Core/Vector';

export default class RotationCameraAnimator extends Animator {
  
  /**
   * @constructor
   * @param {Scene} scene
   * @param {Camera} camera
   */
  constructor (scene, camera) {
	  super(scene, camera);
    
    if (!(camera instanceof Camera)) {
      throw new PompeiError('Bad argument: direction must be a Camera. constructor (scene, camera)');
    }
    
    this.rotateSpeed = -1.0;
    this.translateSpeed = 0.1;
    this.zoomSpeed = 1.0;
    
    // Members
    this._camera = camera;
    
    this._mouseRotate = false;
    this._mouseTranslate = false;
    this._rotating = false;
    this._translating = false;
    this._moving = false;
    
    this._rotX = 0.0;
    this._rotY = 0.0;
    this._currentZoom = 10;
    this._currentMouseWheel = 0;
    
    this._mousePosition = new Vector2(0, 0);
    this._rotateStart = new Vector2(0, 0);
    this._translateStart = new Vector2(0, 0);
    this._zoomStart = new Vector2(0, 0);
    
    this._lastCameraTarget = new Vector3().set(camera.target);
    this._oldTarget = new Vector3().set(camera.target);
    
    // Temporary vectors
    this._tempPositionTargetX = new Vector3(0, 0, 0);
    this._tempPositionTargetY = new Vector3(0, 0, 0);
    this._tempPosition = new Vector3(0, 0, 0);
    this._tempTranslate = new Vector3(0, 0, 0);
    this._tempUpVector = new Vector3(0, 0, 0);
    this._tempTarget = new Vector3(0, 0, 0);
    this._tempPositionTarget = new Vector3(0, 0, 0);
    
    // Configure events
    scene.renderer.canvas.addEventListener('mousedown', this._onMouseDown());
    scene.renderer.canvas.addEventListener('mouseup', this._onMouseUp());
    scene.renderer.canvas.addEventListener('mousewheel', this._onMouseWheel());
    scene.renderer.canvas.addEventListener('mousemove', this._onMouseMove());
  }
  
  _onMouseMove () {
    return (event) => {
      this._mousePosition.x = event.clientX;
      this._mousePosition.y = event.clientY;
    };
  }
  
  _onMouseUp () {
    return (event) => {
      let button = event.button;
      
      if (button === 2) {
        this._mouseTranslate = false;
      }
      else if (button === 0) {
        this._mouseRotate = false;
      }
    };
  }
  
  _onMouseDown () {
    return (event) => {
      this._mousePosition.x = event.clientX;
      this._mousePosition.y = event.clientY;
      
      this._mouseTranslate = event.button === 2;
      this._mouseRotate = event.button === 0;
    };
  }
  
  _onMouseWheel () {
    return (event) => {
      this._currentMouseWheel += event.wheelDeltaY * 0.01;
    };
  }
  
  onAnimate (object, timeMS) {
    let nRotX = this._rotX;
    let nRotY = this._rotY;
    let nZoom = this._currentZoom;
    
    // Update old target
    this._oldTarget.plus(this._camera.target).minus(this._lastCameraTarget);
    
    // Zoom
    const old = this._currentZoom;
		this._currentZoom = this._currentZoom + (-this._currentMouseWheel) * this.zoomSpeed;
    this._currentMouseWheel = 0;
		nZoom = this._currentZoom;

		if (nZoom < 0) {
			nZoom = this._currentZoom = old;
    }
    
    // Translation
    this._tempTranslate.set(this._oldTarget);
    this._tempUpVector.set(this._camera.upVector);
    this._tempTarget.set(this._camera.target);
    
    this._tempPosition.set(this._camera.position);
    this._tempPositionTargetX.set(this._tempPosition).minus(this._tempTarget);
    this._tempPositionTargetX.cross(this._tempUpVector);
    this._tempPositionTargetX.normalize();
    
    this._tempPositionTargetY.set([0, 0, 0]);
    this._tempPositionTargetY.cross(this._tempUpVector.y > 0
      ? this._tempPositionTarget.set(this._tempPosition).minus(this._tempPositionTarget)
      : this._tempPositionTarget.set(this._tempTarget).minus(this._tempPosition));
    this._tempPositionTargetY.normalize();
    
    if (this._mouseTranslate) {
      if (!this._translating) {
        this._translateStart.set(this._mousePosition);
        this._translating = true;
      }
      else {
        this._tempTranslate.plus(this._tempPositionTargetX)
          .multiplyScalar(this._translateStart.x - this._mousePosition.x)
          .multiplyScalar(this.translateSpeed)
          .plus(this._tempPositionTargetY)
          .multiplyScalar(this._translateStart.y - this._mousePosition.y)
          .multiplyScalar(this.translateSpeed);
      }
    }
    else if (this._translating) {
      this._tempTranslate.plus(this._tempPositionTargetX)
          .multiplyScalar(this._translateStart.x - this._mousePosition.x)
          .multiplyScalar(this.translateSpeed)
          .plus(this._tempPositionTargetY)
          .multiplyScalar(this._translateStart.y - this._mousePosition.y)
          .multiplyScalar(this.translateSpeed);
      
      this._oldTarget.set(this._tempTranslate);
      this._translating = false;
    }
    
    // Rotation
    if (this._mouseRotate) {
      if (!this._rotating) {
        this._rotateStart.set(this._mousePosition);
        this._rotating = true;
        nRotX = this._rotX;
        nRotY = this._rotY;
      }
      else {
        nRotX += (this._rotateStart.x - this._mousePosition.x) * this.rotateSpeed;
        nRotY += (this._rotateStart.y - this._mousePosition.y) * this.rotateSpeed;
      }
    }
    else if (this._rotating) {
      this._rotX += (this._rotateStart.x - this._mousePosition.x) * this.rotateSpeed;
      this._rotY += (this._rotateStart.y - this._mousePosition.y) * this.rotateSpeed;
      nRotX = this._rotX;
      nRotY = this._rotY;
      this._rotating = false;
    }
    
    // Set pos
    this._tempPosition.set(this._tempTranslate);
    this._tempPosition.x += nZoom;
  
    this._tempPosition.rotateXYBy(nRotY, this._tempTranslate);
    this._tempPosition.rotateXZBy(-nRotX, this._tempTranslate);
    
    this._camera.position.set(this._tempPosition);
    this._camera.target = this._tempTranslate;
    
    // Fix pos
    this._tempPosition.set([0, 1, 0]);
    this._tempPosition.rotateXYBy(-nRotY);
    this._tempPosition.rotateXZBy(-nRotX + 180);
    this._camera.upVector.set(this._tempPosition);
    this._lastCameraTarget.set(this._camera.target);
  }
}
