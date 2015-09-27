import { PompeiError } from '../../utils/errors';

import PostProcess from '../PostProcess';

import pixelShader from '../../Shaders/Blur.fragment.glsl';

export default class BlurPostProcess extends PostProcess {
  constructor (name, scene, vertical) {
    super(name, scene, null, pixelShader, ["u_screenX", "u_screenY"], vertical ? ["VERTICAL"] : [], false);
  }
  
  onSetConstants (renderer, service) {
    super.onSetConstants(renderer, service);
    
    service.setFloat("u_screenX", renderer.canvas.width);
    service.setFloat("u_screenY", renderer.canvas.height);
  }
}
