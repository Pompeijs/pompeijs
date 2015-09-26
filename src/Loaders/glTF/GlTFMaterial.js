import { PompeiError } from '../../utils/errors';

import Renderer from '../../Renderer';
import ShaderMaterial from '../../Material/ShaderMaterial';

import Matrix from '../../Core/Matrix';
import Color from '../../Core/Color';
import { Vector3, Vector2 } from '../../Core/Vector';

export default class GlTFMaterial extends ShaderMaterial {
	
	static get UniformType () {
		return {
			BYTE: 5120,
			UNSIGNED_BYTE: 5121,
			SHORT: 5122,
			UNSIGNED_SHORT: 5123,
			INT: 5124,
			UNSIGNED_INT: 5125,
			FLOAT: 5126,
			FLOAT_VEC2: 35664,
			FLOAT_VEC3: 35665,
			FLOAT_VEC4: 35666,
			INT_VEC2: 35667,
			INT_VEC3: 35668,
			INT_VEC4: 35669,
			BOOL: 35670,
			BOOL_VEC2: 35671,
			BOOL_VEC3: 35672,
			BOOL_VEC4: 35673,
			FLOAT_MAT2: 35674,
			FLOAT_MAT3: 35675,
			FLOAT_MAT4: 35676,
			SAMPLER_2D: 35678
		}
	}
	
	constructor (device, config, gltfRuntime, glTFPass ,glTFMaterial) {
		super(device.renderer, config.vertexShader, config.pixelShader, config.attributes, config.uniforms, config.defines, false);
		this.compile();
		
		this._device = device;
		this._gltfRuntime = gltfRuntime;
		this._gltfPass = glTFPass;
		this._gltfMaterial = glTFMaterial;
		
		// Temporary
		this._tempMat = new Matrix().makeIdentity();
	}
	
	onSetConstants (renderer, service) {
		let materialValues = this._gltfMaterial.instanceTechnique.values;
		let instanceProgramUniforms = this._gltfPass.instanceProgram.uniforms;
		let technique = this._gltfRuntime.techniques[this._gltfMaterial.instanceTechnique.technique];
		let parameters = technique.parameters;
		
		for (let i=0; i < this._uniforms.length; i++) {
			let unif = this._uniforms[i];
			let type = parameters[instanceProgramUniforms[unif]].type;
			let value = materialValues[instanceProgramUniforms[unif]] || parameters[instanceProgramUniforms[unif]].value;
			
			switch (type) {
				case GlTFMaterial.UniformType.FLOAT_VEC4:
					service.setColor4(unif, new Color(value[0], value[1], value[2], value[3]));
					break;
				case GlTFMaterial.UniformType.FLOAT:
					service.setFloat(unif, value);
					break;
				case GlTFMaterial.UniformType.SAMPLER_2D:
					{
						let gltfTexture = this._gltfRuntime.textures[value];
						let source = this._gltfRuntime.images[gltfTexture.source];
						
						this._renderer.currentMaterial.textures[0] = this._renderer.createTexture(this._gltfRuntime.rootUrl + source.uri);
						service.setInt(unif, 0);
					}
					break;
				case GlTFMaterial.UniformType.FLOAT_VEC2:
					service.setVector2(unif, new Vector2(value[0], value[1]));
					break;
				case GlTFMaterial.UniformType.FLOAT_VEC3:
					service.setVector3(unif, new Vector3(value[0], value[1], value[2]));
					break;
				case GlTFMaterial.UniformType.FLOAT_MAT4:
				case GlTFMaterial.UniformType.FLOAT_MAT3:
				case GlTFMaterial.UniformType.FLOAT_MAT2:
					{
						let parameter = parameters[instanceProgramUniforms[unif]];
						let mat = this._tempMat;
						let renderer = this._renderer;
						let source = this._device.scene.getNodeById(parameter.source || parameter.node) || renderer;
						
						if (parameter.semantic === "MODEL") {
							mat.set(source.worldMatrix);
						}
						else if (parameter.semantic === "PROJECTION") {
							mat.set(renderer.projectionMatrix);
						}
						else if (parameter.semantic === "MODELVIEWINVERSETRANSPOSE") {
							mat.set(renderer.viewMatrix).multiply(source.worldMatrix).inverse().transpose();
						}
						else if (parameter.semantic === "MODELVIEW") {
							mat.set(renderer.viewMatrix).multiply(source.worldMatrix);
						}
						else if (parameter.semantic === "MODELVIEWPROJECTION") {
							mat.set(renderer.projectionMatrix).multiply(renderer.viewMatrix).multiply(source.worldMatrix);
						}
						else if (parameter.semantic === "MODELINVERSE") {
							mat.set(source.worldMatrix).inverse();
						}
						else if (parameter.semantic === "VIEWINVERSE") {
							mat.set(renderer.viewMatrix).inverse();
						}
						else if (parameter.semantic === "PROJECTIONINVERSE") {
							mat.set(renderer.projectionMatrix).inverse();
						}
						else if (parameter.semantic === "MODELVIEWINVERSE") {
							mat.set(renderer.viewMatrix).multiply(source.worldMatrix).inverse();
						}
						else if (parameter.semantic === "MODELVIEWPROJECTIONINVERSE") {
							mat.set(renderer.projectionMatrix).multiply(renderer.viewMatrix).multiply(source.worldMatrix).inverse();
						}
						else if (parameter.semantic === "MODELINVERSETRANSPOSE") {
							mat.set(source.worldMatrix).inverse().transpose();
						}
						
						switch (parameter.type) {
							case GlTFMaterial.UniformType.FLOAT_MAT2:
								service.setMatrix2(unif, mat.getAsMatrix2x2());
								break;
							case GlTFMaterial.UniformType.FLOAT_MAT3:
								service.setMatrix3(unif, mat.getAsMatrix3x3());
								break;
							case GlTFMaterial.UniformType.FLOAT_MAT4:
								service.setMatrix(unif, mat);
								break;
							default:
								break;
						}
					}
					break;
				default:
					break;
			}
		}
	}
}
