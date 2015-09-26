import { PompeiError } from '../../utils/errors';

import Core from '../../Core/Core';
import Tokenizer from '../Tokenizer';

import Renderer from '../../Renderer';

import GlTFMaterial from './GlTFMaterial';

let getAttribute = (attributeParameter) => {
	if (attributeParameter.semantic === "NORMAL") {
		return "a_normal";
	}
	else if (attributeParameter.semantic === "POSITION") {
		return "a_position";
	}
	else if (attributeParameter.semantic.indexOf("TEXCOORD_") !== -1) {
		var channel = Number(attributeParameter.semantic.split("_")[1]);
		return "a_uv" + (channel === 0 ? "" : channel + 1);
	}
};

let onShadersLoaded = (gltfRuntime, device, onSuccessCallback) => {
	for (let mat in gltfRuntime.materials) {
		let material = gltfRuntime.materials[mat];
		let instanceTechnique = material.instanceTechnique;
		let technique = gltfRuntime.techniques[instanceTechnique.technique];
		let pass = technique.passes[technique.pass];
		let instanceProgram = pass.instanceProgram;
		let program = gltfRuntime.programs[instanceProgram.program];
	
		let vertexShader = gltfRuntime.loadedShaders[program.vertexShader];
		let pixelShader = gltfRuntime.loadedShaders[program.fragmentShader];
		let newVertexShader = "";
	
		let vertexTokenizer = new Tokenizer(vertexShader);
		
		let attributes = [];
		let uniforms = [];
		let defines = [];
	
		// Uniforms
		for (var unif in instanceProgram.uniforms) {
			uniforms.push(unif);
		}
		
		// Attributes
		for (let attr in instanceProgram.attributes) {
			let attribute = instanceProgram.attributes[attr];
			let attributeParameter = technique.parameters[attribute];
			
			if (attributeParameter.semantic) {
				attributes.push(getAttribute(attributeParameter));
			}
		}
	
		// Configure vertex shader
		while (!vertexTokenizer.isEnd() && vertexTokenizer.getNextToken()) {
			let tokenType = vertexTokenizer.currentToken;
	
			if (tokenType !== Tokenizer.TokenType.IDENTIFIER) {
				newVertexShader += vertexTokenizer.currentString;
				continue;
			}
	
			let foundAttribute = false;
	
			for (let attr in instanceProgram.attributes) {
				let attribute = instanceProgram.attributes[attr];
				let attributeParameter = technique.parameters[attribute];
	
				if (vertexTokenizer.currentIdentifier === attr && attributeParameter.semantic) {
					newVertexShader += getAttribute(attributeParameter);
					foundAttribute = true;
					break;
				}
			}
	
			if (foundAttribute) {
				continue;
			}
	
			newVertexShader += vertexTokenizer.currentIdentifier;
		}
		
		gltfRuntime.loadedShaders[program.vertexShader] = newVertexShader;
		
		// Create shader material
		// Here...
		let config = {
			vertexShader: newVertexShader,
			pixelShader: pixelShader,
			attributes: attributes,
			uniforms: uniforms,
			defines: defines,
		};
		
		let gltfMaterial = new GlTFMaterial(device, config, gltfRuntime, pass, material);
		gltfMaterial.id = mat;
	}
		
	if (onSuccessCallback) {
		onSuccessCallback();
	}
};

export default class GlTFShadersSupport {
	constructor (device) {
		this._device = device;
	}
	
	load (gltfRuntime, rootUrl, onSuccessCallback) {
		let loadedShaders = 0;
		
		let loadShader = (shaderKey) => {
			let gltfShader = gltfRuntime.shaders[shaderKey];
			
			if (Core.isBase64(gltfShader.uri)) {
				gltfRuntime.loadedShaders[shaderKey] = atob(gltfShader.uri.split(",")[1]);
				loadedShaders++;
				
				if (loadedShaders === gltfRuntime.shadersCount) {
					onShadersLoaded(gltfRuntime, this._device, onSuccessCallback);
				}
			}
			else {
				Core.LoadFile(rootUrl + gltfShader.uri, false, (data) => {
					gltfRuntime.loadedShaders[shaderKey] = data;
					loadedShaders++;
					
					if (loadedShaders === gltfRuntime.shadersCount) {
						onShadersLoaded(gltfRuntime, this._device, onSuccessCallback);
					}
				});
			}
		};
		
		for (let shaderKey in gltfRuntime.shaders) {
			loadShader(shaderKey);
			gltfRuntime.shadersCount++;
		}
	}
}
