import { PompeiError } from '../../utils/errors';

import Renderer from '../../Renderer';
import ShaderMaterial from '../../Material/ShaderMaterial';

import Matrix from '../../Core/Matrix';
import Color from '../../Core/Color';
import { Vector3, Vector2 } from '../../Core/Vector';

import SpotLightSceneNode from '../../SceneNodes/SpotLightSceneNode';

import vertexShader from './default.vertex.fx';
import pixelShader from './default.fragment.fx';

export default class GlTFMaterial extends ShaderMaterial {
	
	constructor (device) {
		super(device.renderer, vertexShader, pixelShader,
		// Attributes
		["position", "normal", "uv", "uv2"],
		// Uniforms
		["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vAmbientColor", "vDiffuseColor", "vSpecularColor", "vEmissiveColor",
			"vLightData0", "vLightDiffuse0", "vLightSpecular0", "vLightDirection0", "vLightGround0", "lightMatrix0",
			"vLightData1", "vLightDiffuse1", "vLightSpecular1", "vLightDirection1", "vLightGround1", "lightMatrix1",
			"vLightData2", "vLightDiffuse2", "vLightSpecular2", "vLightDirection2", "vLightGround2", "lightMatrix2",
			"vLightData3", "vLightDiffuse3", "vLightSpecular3", "vLightDirection3", "vLightGround3", "lightMatrix3",
			"vFogInfos", "vFogColor", "pointSize",
			"vDiffuseInfos", "vAmbientInfos", "vOpacityInfos", "vReflectionInfos", "vEmissiveInfos", "vSpecularInfos", "vBumpInfos", "vLightmapInfos",
			"mBones",
			"vClipPlane", "diffuseMatrix", "ambientMatrix", "opacityMatrix", "reflectionMatrix", "emissiveMatrix", "specularMatrix", "bumpMatrix", "lightmapMatrix",
			"shadowsInfo0", "shadowsInfo1", "shadowsInfo2", "shadowsInfo3",
			"diffuseLeftColor", "diffuseRightColor", "opacityParts", "reflectionLeftColor", "reflectionRightColor", "emissiveLeftColor", "emissiveRightColor",
			"roughness"
		],
		// Defines
		[], false);
		this._device = device;
	}
	
	onPreRender (renderer) {
		const scene = this._device.scene;
		const lightsCount = this._scene.lights.length;
		const vertexBuffer = renderer.currentVertexBuffer;
		const material = renderer.currentMaterial;
		
		this._defines = [];
		
		// Attributes
		if (vertexBuffer.normals.length > 0) {
			this._defines.push("NORMAL");
		}
		if (vertexBuffer.uvs.length > 0) {
			this._defines.push("UV1");
		}
		if (vertexBuffer.uvs2.length > 0) {
			this._defines.push("UV2");
		}
		if (vertexBuffer.colors.length > 0) {
			this._defines.push("VERTEXCOLOR");
		}
		
		// Lights
		for (let i=0; i < lightsCount; i++) {
			this._defines.push("LIGHT" + i);
			
			if (scene.lights[i] instanceof SpotLightSceneNode) {
				this._defines.push("SPOTLIGHT" + i);
			}
			else {
				this._defines.push("POINTDIRLIGHT" + i);
			}
		}
		
		// Samplers
		if (material.diffuseTexture) {
			this._defines.push("DIFFUSE");
		}
		if (material.ambientTexture) {
			this._defines.push("AMBIENT");
		}
		if (material.opacityTexture) {
			this._defines.push("OPACITY");
		}
		if (material.reflectionTexture) {
			this._defines.push("REFLECTION");
			
			if (material.roughness > 0) {
				this._defines.push("ROUGHNESS");
			}
		}
		if (material.emissiveTexture) {
			this._defines.push("EMISSIVE");
		}
		if (material.lightmapTexture) {
			this._defines.push("LIGHTMAP");
		}
		if (material.specularTexture) {
			this._defines.push("SPECULAR");
			this._defines.push("GLOSSINESS");
		}
		if (material.bumpTexture) {
			this._defines.push("BUMP");
		}
		
		this.compile();
	}
	
	onSetConstants (renderer, service) {
		service.setMatrix("world", renderer.worldMatrix);
		service.setMatrix("view", renderer.viewMatrix);
		service.setMatrix("viewProjection", Matrix.TempMatrix.set(renderer.projectionMatrix).multiply(renderer.viewMatrix));
		
		const scene = this._device.scene;
		const lightsCount = this._scene.lights.length;
		const vertexBuffer = renderer.currentVertexBuffer;
		const material = renderer.currentMaterial;
		
		
	}
}
