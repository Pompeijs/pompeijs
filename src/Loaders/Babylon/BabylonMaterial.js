import { PompeiError } from '../../utils/errors';

import Renderer from '../../Renderer';
import Material from '../../Material/Material';

import Color from '../../Core/Color';

export default class BabylonMaterial extends Material {
	
	constructor (device) {
		super();
		this.setUsedTextures(8);
		
		// Public members
		this.ambientColor = new Color(0, 0, 0, 1);
		this.diffuseColor = new Color(1, 1, 1, 1);
		this.specularColor = new Color(1, 1, 1, 1);
		this.specularPower = 64;
		this.emissiveColor = new Color(0, 0, 0, 1);
		
		this.useAlphaFromDiffuseTexture = false;
		this.useEmissiveAsIllumination = false;
		this.useReflectionFresnelFromSpecular = false;
		this.useSpecularOverAlpha = true;
		
		this.roughness = 0;
		
		this.lightmapThreshold = 0;
		
		this.useGlossinessFromSpecularMapAlpha = false;
	}
	
	set diffuseTexture (diffuseTexture) {
		this._textures[0] = diffuseTexture;
	}
	
	get diffuseTexture () {
		return this._textures[0];
	}
	
	set ambientTexture (ambientTexture) {
		this._textures[1] = ambientTexture;
	}
	
	get ambienTexture () {
		return this._textures[1];
	}
	
	set opacityTexture (opacityTexture) {
		this._textures[2] = opacityTexture;
	}
	
	get opacityTexture () {
		return this._textures[2];
	}
	
	set reflectionTexture (reflectionTexture) {
		this._textures[3] = reflectionTexture;
	}
	
	get reflectionTexture () {
		return this._textures[3];
	}
	
	set emissiveTexture (emissiveTexture) {
		this._textures[4] = emissiveTexture;
	}
	
	get emissiveTexture () {
		return this._textures[4];
	}
	
	set specularTexture (specularTexture) {
		this._textures[5] = specularTexture;
	}
	
	get specularTexture () {
		return this._textures[5];
	}
	
	set bumpTexture (bumpTexture) {
		this._textures[6] = bumpTexture;
	}
	
	get bumpTexture () {
		return this._textures[6];
	}
	
	set lightmapTexture (lightMapTexture) {
		this._textures[7] = lightMapTexture;
	}
	
	get lightmapTexture () {
		return this._textures[7];
	}
}
