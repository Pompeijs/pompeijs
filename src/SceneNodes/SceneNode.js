import { PompeiError } from '../utils/errors';

import { Vector2, Vector3 } from '../Core/Vector';
import Matrix from '../Core/Matrix';

import Animator from '../Animators/Animator';

export default class SceneNode {
	constructor (name, scene, parent) {
		if (!name || !scene) {
			throw new PompeiError('Bad parameters: name and scene must be provided. constructor(name, scene, parent)');
		}
		
		this.name = name;
		this.isVisible = true;
		
		this._scene = scene;
		this._renderer = scene.renderer;
		
		// Parenting
		parent = parent instanceof SceneNode ? parent : scene.rootSceneNode;
		
		if (parent) {
			parent.addChild(this);
		}
		
		this._children = [];
		
		// Transformations
		this._position = new Vector3();
		this._rotation = new Vector3();
		this._scale = new Vector3([1, 1, 1]);
		
		this._absoluteTransform = Matrix.Identity();
		
		// Animators
		this._animators = [];
		
		// Materials
		this._materials = [];
		
		// Temp values
		this._tempWorldTransform = Matrix.Identity();
		this._tempRelativeTransform = Matrix.Identity();
		this._tempRelativeTransformScale = Matrix.Identity();
	}
	
	// To be overrided
	render () {
		this.updateAbsoluteTransformation();
		
		const now = this._scene.now();
		
		for (let i=0; i < this._animators.length; i++) {
			this._animators[i].onAnimate(this, now);
		}
	}
	
	addChild (child) {
		if (child && child != this) {
			child._parent = this;
			this._children.push(child);
		}
	}
	
	removeChild (child) {
		for (let i=0; i < this._children.length; i++) {
			if (this._children[i] === child) {
				child._parent = null;
				this._children.splice(i, 1);
				return true;
			}
		}
		
		return false;
	}
	
	remove () {
		if (this._parent) {
			this._parent.removeChild(this);
		}
	}
	
	updateAbsoluteTransformation () {
		this._absoluteTransform.makeIdentity();
		
		if (this._parent) {
			this._absoluteTransform.set(this._parent.absoluteTransformation)
				.multiply(this.relativeTransformation);
		}
		else {
			this._absoluteTransform.set(this.relativeTransformation);
		}
	}
	
	clone () {
		return null;
	}
	
	get absoluteTransformation () {
		return this._absoluteTransform;
	}
	
	get parent () {
		return this._parent;
	}
	
	set parent (parent) {
		this.remove();
		this._parent = parent;
		
		if (this._parent) {
			parent.addChild(this);
		}
	}
	
	get children () {
		return this._children;
	}
	
	get materials () {
		return this._materials;
	}
	
	get position () {
		return this._position;
	}
	
	set position (position) {
		if (!(position instanceof Vector3)) {
			throw new PompeiError('Bad parameter. Position must be a Vector3. set position (position)');
		}
		
		this._position = position;
	}
	
	get rotation () {
		return this._rotation;
	}
	
	set rotation (rotation) {
		if (!(rotation instanceof Vector3)) {
			throw new PompeiError('Bad parameter. Rotation must be a Vector3. set rotation (rotation)');
		}
		
		this._rotation = rotation;
	}
	
	get scale () {
		return this._scale;
	}
	
	set scale (scale) {
		if (!(scale instanceof Vector3)) {
			throw new PompeiError('Bad parameter. Scale must be a Vector3. set scale (scale)');
		}
		
		this._scale = scale;
	}
	
	// Transformations
	get worldMatrix () {
		this._tempWorldTransform.setScale(this._scale);
		this._tempWorldTransform.setRotationDegrees(this._rotation);
		this._tempWorldTransform.setTranslation(this._position);
		
		return this._tempWorldTransform;
	}
	
	get relativeTransformation () {
		this._tempRelativeTransform.setRotationDegrees(this._rotation);
		this._tempRelativeTransform.setTranslation(this._position);
		
		if (this._scale.x !== 1.0 || this._scale.y !== 1.0 || this._scale.z !== 1.0) {
			this._tempRelativeTransformScale.makeIdentity();
			this._tempRelativeTransformScale.setScale(this._scale);
			this._tempRelativeTransform.multiply(this._tempRelativeTransformScale);
		}
		
		return this._tempRelativeTransform;
	}
	
	set worldMatrix (worldMatrix) {
		worldMatrix.getScale(this._scale);
		worldMatrix.getRotationDegrees(this._rotation);
		worldMatrix.getTranslation(this._position);
	}
	
	// Animators
	get animators () {
		return this._animators;
	}
	
	addAnimator (animator) {
		if (!(animator instanceof Animator)) {
			throw new PompeiError('Bad parameter: animator must be an Animator. addAnimator (animator)');
		}
		
		this._animators.push(animator);
	}
	
	removeAnimator (animator) {
		let index = this._animators.indexOf(animator);
		
		if (index !== -1) {
			this._animators.splice(index, 1);
			return true;
		}
		
		return false;
	}
}
