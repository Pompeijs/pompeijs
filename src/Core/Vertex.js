import { PompeiError } from '../utils/errors';

import { Vector3 } from './Vector';
import { Vector2 } from './Vector';
import Color from './Color';

export default class Vertex {
  constructor(position, normal, uv, color) {
    if (position && !(position instanceof Vector3)) {
      throw new PompeiError('Bad Parameter: position is not a Vector3. constructor(position, normal, uv, color)');
    }

    if (normal && !(normal instanceof Vector3)) {
      throw new PompeiError('Bad Parameter: normal is not a Vector3. constructor(position, normal, uv, color)');
    }

    if (uv && !(uv instanceof Vector2)) {
      throw new PompeiError('Bad Parameter: uv is not a Vector2. constructor(position, normal, uv, color)');
    }
    
    if (color && !(color instanceof Color)) {
      throw new PompeiError('Bad Parameter: color is not a Color. constructor(position, normal, uv, color)');
    }

    this._position = position;
    this._normal = normal;
    this._uv = uv;
    this._color = color;
  }

  // Position
  get position () {
    return this._position;
  }

  set position (position) {
    if (!(position instanceof Vector3)) {
      throw new PompeiError('Bad Parameter: position is not a Vector3. set position (position)');
    }

    this._position = Position;
  }

  // Normal
  get normal () {
    return this._normal;
  }

  set normal (normal) {
    if (!(normal instanceof Vector3)) {
      throw new PompeiError('Bad Parameter: normal is not a Vector3. set normal (normal)');
    }

    this._normal = normal;
  }

  // UV
  get uv () {
    return this._uv;
  }

  set uv (uv) {
    if (!(uv instanceof Vector2)) {
      throw new PompeiError('Bad Parameter: uv is not a Vector2. set uv (uv)');
    }

    this._uv = uv;
  }
  
  // Color
  get color () {
    return this._color;
  }
  
  set color (color) {
    if (!(color instanceof Color)) {
      throw new PompeiError('Bad parameter: color is not a Color. set color (color)');
    }
    
    this._color = color;
  }
}
