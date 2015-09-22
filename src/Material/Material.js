import { PompeiError } from '../utils/errors';
import Renderer from '../Renderer';

import Core from '../Core/Core.js';

export default class Material {
  constructor (other) {
    if (other) {
      for (let thing in other) {
        if (typeof other[thing] !== 'function') {
          this[thing] = other[thing];
        }
      }
    }
    else {
      this.shaderMaterial = null;
      
      this.backFaceCulling = true;
      this.frontFaceCulling = false;
    }
  }
}
