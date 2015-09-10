import { PompeiError } from '../utils/errors';

import Renderer from '../Renderer';
import Material from './Material';

export default class SolidMaterial extends Material {
  constructor (renderer) {
    super(renderer,
      'Shaders/Solid.vertex.glsl',
      'Shaders/Solid.fragment.glsl',
      ["a_position", "a_uv"],
      ["u_worldViewProjection", "u_diffuse"],
      [],
      false
    );
    
    this.compile();
  }
  
  // Can be overrided
  onSetConstants (renderer) {
	  super.onSetConstants(renderer);
    
    // Textures
    renderer.setInt("u_diffuse", 0);
  }
}
