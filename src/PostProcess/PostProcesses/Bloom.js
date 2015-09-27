import { PompeiError } from '../../utils/errors';

import PostProcess from '../PostProcess';

import pixelShader from '../../Shaders/Bloom.fragment.glsl';

export default class BloomPostProcess extends PostProcess {
  constructor (name, scene) {
    super(name, scene, null, pixelShader, ["u_screenMapSampler"], [], false);
  }
  
  onSetConstants (renderer, service) {
    super.onSetConstants(renderer, service);
    
    service.setInt("u_screenMapSampler", 1);
  }
}
