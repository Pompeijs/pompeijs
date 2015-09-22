import { PompeiError } from '../utils/errors';

import ShaderMaterial from '../Material/ShaderMaterial';

import vertexShader from '../Shaders/ScreenQuad.vertex.glsl';
import pixelShader from '../Shaders/ScreenQuad.fragment.glsl';

export default class PostProcess extends ShaderMaterial {
  constructor (name, scene, vertexPath, pixelPath, uniforms, defines, fromDOM) {
    super(scene.renderer,
      vertexPath || vertexShader,
      pixelPath || pixelShader,
      ["a_position", "a_uv"],
      ["u_colorMapSampler"].concat(Array.isArray(uniforms) ? uniforms : []),
      [].concat(Array.isArray(defines) ? defines : []),
      fromDOM || false
    );
    
    this.compile();
  }
  
  onSetConstants (renderer, service) {
    service.setInt("u_colorMapSampler", 0);
  }
}
