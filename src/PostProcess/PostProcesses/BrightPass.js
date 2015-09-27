import { PompeiError } from '../../utils/errors';

import PostProcess from '../PostProcess';

import pixelShader from '../../Shaders/BrightPass.fragment.glsl';

export default class BrightPassPostProcess extends PostProcess {
  constructor (name, scene) {
    super(name, scene, null, pixelShader, [], [], false);
  }
}
