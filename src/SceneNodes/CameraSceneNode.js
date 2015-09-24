import { PompeiError } from '../utils/errors';

import Scene from '../Scene';
import SceneNode from './SceneNode';

import Matrix from '../Core/Matrix';
import { Vector3 } from '../Core/Vector';

export default class CameraSceneNode extends SceneNode {
  constructor(name, scene, parent) {
    super(name, scene, parent);
    
    // Set as active camera
    if (!scene.activeCamera) {
      scene.activeCamera = this;
    }
    
    this._viewMatrix = Matrix.Identity();
    this._projectionMatrix = Matrix.Identity();
    
    this._target = new Vector3(0, 0, 0);
    this._upVector = new Vector3(0, 1, 0);
    
    this._fov = Math.PI / 2.5;
    this._aspect = scene.renderer.canvas.width / scene.renderer.canvas.height;
    this._zNear = 1.0;
    this._zFar = 3000.0;
    
    // Temporary vectors
    this._tempUpVector = new Vector3(0, 0, 0);
    this._tempTarget = new Vector3(0, 0, 0);
    
    // Finish
    this.buildProjectionMatrix();
    
    // Events
    window.addEventListener('resize', (event) => {
      this._aspect = scene.renderer.canvas.width / scene.renderer.canvas.height;
      this.buildProjectionMatrix();
    });
  }
  
  get type () {
		return Scene.SceneNodeType.CAMERA_SCENE_NODE;
	}
  
  render () {
    super.render();
    
    let tgtv = this._tempTarget.set(this._target)
      .minus(this._position)
      .normalize();
    
    let up = this._tempUpVector.set(this._upVector).normalize();
    let dp = tgtv.dot(up);
    
    if (Math.abs(dp) === 1.0) {
      up.x += 0.5;
    }
    
    this._viewMatrix.buildCameraLookAtMatrix(this._position, this._target, up);
    
    this._renderer.viewMatrix.set(this._viewMatrix);
    this._renderer.projectionMatrix.set(this._projectionMatrix);
  }
  
  buildProjectionMatrix () {
    this._projectionMatrix.buildProjectionMatrix(this._fov, this._aspect, this._zNear, this._zFar)
  }
  
  get aspect () {
    return this._aspect;
  }
  
  set aspect (aspect) {
    this._aspect = aspect;
    this.buildProjectionMatrix();
  }
  
  get target () {
    return this._target;
  }
  
  set target (target) {
    this._target.set(target);
    
    let toTarget = new Vector3().set(this._target).minus(this._position);
		this.rotation = toTarget.getHorizontalAngle();
  }
  
  get upVector () {
    return this._upVector;
  }
  
  set upVector (upVector) {
    this._upVector.set(upVector);
  }
  
  viewMatrix () {
    return this._viewMatrix;
  }
  
  projectionMatrix () {
    return this._projectionMatrix;
  }
  
}
