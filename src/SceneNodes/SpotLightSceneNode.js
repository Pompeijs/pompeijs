import { PompeiError } from '../utils/errors';

import Scene from '../Scene';
import LightSceneNode from './LightSceneNode';

import Core from '../Core/Core';

import Color from '../Core/Color';
import { Dimension2, Vector3 } from '../Core/Vector';
import Matrix from '../Core/Matrix';

export default class SpotLightSceneNode extends LightSceneNode {
	constructor (name, scene, parent, shadowMapSize) {
		super(name, scene, parent);
		scene.lights.push(this);
		
		// Configure this
		this._computesShadows = true;
		this._shadowMapSize = shadowMapSize;
		this._farValue = 100.0;
		this._nearValue = 1.0;
		this._fov = 90.0 * Core.DegToRad();
		
		this._target = new Vector3(0, 0, 0);
		this._upVector = new Vector3(0, 1, 0);
		
		this._projectionMatrix = new Matrix().buildProjectionMatrix(this._fov, 1.0, this._nearValue, this._farValue);
		this._viewMatrix = new Matrix();
		this._tempMatrix = new Matrix();
		
		this._shadowMap = this._renderer.createRenderTarget("ShadowLight" + name, new Dimension2(shadowMapSize, shadowMapSize), true, true);
	}
	
	get shadowMap () {
		return this._shadowMap;
	}
	
	get shadowMapSize () {
		return this._shadowMapSize;
	}
	
	get target () {
		return this._target;
	}
	
	set target (target) {
		this._target = target;
	}
	
	get viewMatrix () {
		return this._viewMatrix;
	}
	
	set viewMatrix (viewMatrix) {
		this._viewMatrix = viewMatrix;
		this._tempMatrix.set(viewMatrix).inverse();
		this._tempMatrix.getTranslation(this._position);
	}
	
	get projectionMatrix () {
		return this._projectionMatrix;
	}
	
	set projectionMatrix (projectionMatrix) {
		this._projectionMatrix = projectionMatrix;
	}
	
	get type () {
		return Scene.SceneNodeType.SPOT_LIGHT_SCENE_NODE;
	}
	
	get farValue () {
		return this._farValue;
	}
	
	set farValue (farValue) {
		if (farValue > this._nearValue) {
			this._farValue = farValue;
		}
		else {
			this._farValue = this._nearValue + 1.0;
		}
		
		this._updateProjectionMatrix();
	}
	
	get nearValue () {
		return this._nearValue;
	}
	
	set nearValue (nearValue) {
		nearValue = nearValue <= 0.0 ? 0.1 : nearValue;
		this._nearValue = nearValue;
		this._updateProjectionMatrix();
	}
	
	get fov () {
		return this._fov;
	}
	
	set fov (fov) {
		if (fov != 0.0) {
			this._fov = fov;
		}
		else {
			this._fov = 0.1;
		}
		this._updateProjectionMatrix();
	}
	
	updateViewMatrix () {
		this._upVector.setXYZ(1, 0, 1);
		let dot = Vector3.TempVector.set(this._position).minus(this._target).dot(this._upVector);
		
		if (dot === 0) {
			this._upVector.setXYZ(0, 1, 0);
		}
		else {
			this._upVector.setXYZ(0, 0, 1);
		}
		
		this._viewMatrix.buildCameraLookAtMatrix(this._position, this._target, this._upVector);
	}
	
	remove () {
		super.remove();
		
		// Remove shadow map here
	}
	
	_updateProjectionMatrix () {
		this.updateViewMatrix();
		this._projectionMatrix.buildProjectionMatrix(this._fov, 1.0, this._nearValue, this._farValue);
	}
}
