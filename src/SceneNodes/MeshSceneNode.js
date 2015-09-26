import { PompeiError } from '../utils/errors';

import Scene from '../Scene';

import SceneNode from './SceneNode';
import Mesh from '../Mesh/Mesh.js';

import Material from '../Material/Material';

export default class MeshSceneNode extends SceneNode {
	constructor (name, scene, parent, mesh) {
		super(name, scene, parent);
		
		this._meshes = [];
		
		if (mesh) {
			this.mesh = mesh;
		}
	}
	
	get type () {
		return Scene.SceneNodeType.MESH_SCENE_NODE;
	}
	
	get meshes () {
		return this._meshes;
	}
	
	set mesh (mesh) {
		if (mesh && !(mesh instanceof Mesh)) {
			throw new PompeiError('Bad argument: mesh must be a Mesh. set mesh (mesh)');
		}
		
		this._meshes = [mesh];
		this._updateMaterials();
	}
	
	set meshes (meshes) {
		if (!Array.isArray(meshes)) {
			throw new PompeiError('');
		}
		
		this._meshes = meshes;
		this._updateMaterials();
	}
	
	clone () {
		return null;
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
