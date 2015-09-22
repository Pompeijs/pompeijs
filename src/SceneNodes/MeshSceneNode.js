import { PompeiError } from '../utils/errors';

import SceneNode from './SceneNode';

import { Vector3 } from '../Core/Vector';
import Mesh from '../Mesh/Mesh.js';

import Material from '../Material/Material';

export default class MeshSceneNode extends SceneNode {
	constructor (name, scene, parent, mesh) {
		super(name, scene, parent);
		
		this._meshes = [mesh];
	}
	
	get meshes () {
		return this._meshes;
	}
	
	set mesh (mesh) {
		if (!(mesh instanceof Mesh)) {
			throw new PompeiError('Bad argument: mesh must be a Mesh. set mesh (mesh)');
		}
		
		this._meshes = [mesh];
		this._updateMaterials();
	}
	
	set meshes (meshes) {
		if (!Array.isArray(meshes)) {
			
		}
		
		this._meshes = meshes;
		this._updateMaterials();
	}
	
	clone () {
		let mesh = new Mesh(this.name, this._scene, this._parent, this._meshes);
		return mesh;
	}
	
	render() {
		if (!this.isVisible) {
			return;
		}
		
		super.render();
		
		// Transformations
		this._renderer.worldMatrix.set(this._absoluteTransform);
		
		// Draw buffers
		let materialIndex = 0;
		for (let meshIndex = 0; meshIndex < this._meshes.length; meshIndex++) {
			for (let vbIndex=0; vbIndex < this._meshes[meshIndex].vertexBuffers.length; vbIndex++) {
				let vertexBuffer = this._meshes[meshIndex].vertexBuffers[vbIndex];
				
				this._renderer.setMaterial(this._materials[materialIndex]);
				this._renderer.drawBuffer(vertexBuffer);
				
				materialIndex++;
			}
		}
	}
	
	_updateMaterials() {
		this._materials = [];
		
		let materialIndex = 0;
		
		for (let meshIndex = 0; meshIndex < this._meshes.length; meshIndex++) {
			for (let vbIndex=0; vbIndex < this._meshes[meshIndex].vertexBuffers.length; vbIndex++) {
				this._materials.push(new Material());
				materialIndex++;
			}
		}
	}
}
