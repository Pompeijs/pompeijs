import { PompeiError } from '../utils/errors';

import Scene from '../Scene';
import SceneNode from './SceneNode';

import Color from '../Core/Color';

export default class LightSceneNode extends SceneNode {
	constructor (name, scene, parent) {
		super(name, scene, parent);
		scene.lights.push(this);
		
		this.diffuseColor = new Color(1, 1, 1 ,1);
		this.intensity = 1.0
		this.specularPower = 32;
		
		this._computesShadows = false;
	}
	
	get type () {
		return Scene.SceneNodeType.LIGHT_SCENE_NODE;
	}
	
	get isComputingShadows () {
		return this._computesShadows;
	}
	
	remove () {
		super.remove();
		
		let index = this._scene.lights.indexOf(this);
		if (index !== -1) {
			this._scene.lights.splice(index, 1);
		}
	}
}
