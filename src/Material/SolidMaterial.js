import { PompeiError } from '../utils/errors';

import Renderer from '../Renderer';
import ShaderMaterial from './ShaderMaterial';

import vertexShader from '../Shaders/Solid.vertex.glsl';
import pixelShader from '../Shaders/Solid.fragment.glsl';

export default class SolidMaterial extends ShaderMaterial {
  constructor (renderer) {
    super(renderer,
      vertexShader,
      pixelShader,
      ["a_position", "a_uv"],
      ["u_worldViewProjection", "u_diffuse"],
      [],
      false
    );
    
    this.compile();
  }
  
  // Can be overrided
  onSetConstants (renderer, service) {
	  super.onSetConstants(renderer, service);
    
    // Textures
    service.setInt("u_diffuse", 0);
  }
}
