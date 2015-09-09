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
	
	render() {
		if (!this.isVisible) {
			return;
		}
		
		// Transformations
		this._renderer.worldMatrix.setScale(this._scale);
		this._renderer.worldMatrix.setRotation(this._rotation);
		this._renderer.worldMatrix.setTranslation(this._position);
		
		// Draw buffers
		for (let i=0; i < this._mesh.vertexBuffers.length; i++) {
			let vertexBuffer = this._mesh.vertexBuffers[i];
			
			this._renderer.setMaterial(vertexBuffer.material);
			this._renderer.drawBuffer(vertexBuffer);
		}
	}
}
