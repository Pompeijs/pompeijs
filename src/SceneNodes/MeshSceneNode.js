import { PompeiError } from '../utils/errors';

import SceneNode from './SceneNode';

import { Vector3 } from '../Core/Vector';
import Mesh from '../Mesh/Mesh.js';

export default class MeshSceneNode extends SceneNode {
	constructor (name, scene, parent, mesh) {
		super(name, scene, parent);
		
		this._mesh = mesh;
	}
	
	get mesh () {
		return this._mesh;
	}
	
	set mesh (mesh) {
		if (!(mesh instanceof Mesh)) {
			throw new PompeiError('Bad argument: mesh must be a Mesh. set mesh (mesh)');
		}
		
		this._mesh = mesh;
	}
	
	setMaterial (indice, material) {
		if (indice < 0 || indice >= this._mesh.vertexBuffers.length) {
			throw new PompeiError('Bad parameter: indice out of range. setMaterial (indice, material)');
		}
		
		this._mesh.vertexBuffers[indice].material = material;
	}
	
	getMaterial (indice, material) {
		if (indice < 0 || indice >= this._mesh.vertexBuffers.length) {
			throw new PompeiError('Bad parameter: indice out of range. setMaterial (indice, material)');
		}
		
		return this._mesh.vertexBuffers[indice].material;
	}
	
	render() {
		if (!this.isVisible) {
			return;
		}
		
		super.render();
		
		// Transformations
		this._renderer.worldMatrix.set(this._absoluteTransform);
		
		// Draw buffers
		for (let i=0; i < this._mesh.vertexBuffers.length; i++) {
			let vertexBuffer = this._mesh.vertexBuffers[i];
			
			this._renderer.setMaterial(vertexBuffer.material);
			this._renderer.drawBuffer(vertexBuffer);
		}
	}
}
