import { PompeiError } from '../utils/errors';

export default class Core {
  static Clamp (value, low, high) {
    return Math.min(Math.max(value, low), high);
  }

  static RadToDeg () {
    return 180.0 / Math.PI;
  }

  static DegToRad () {
    return Math.PI / 180.0;
  }
  
  static PowerOfTwo (size, max) {
    let count = 1;
    while (count < size) {
      count = count << 1;
    }
    
    return count;
  }

  // TO REVIEW
  static LoadFile (url, asArrayBuffer, onLoadedFile) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    
    if (asArrayBuffer) {
      request.responseType = 'arrayBuffer';
    }
    
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        onLoadedFile(asArrayBuffer ? request.response : request.responseText);
      } else {
        throw new PompeiError('Cannot load file at: ' + url + ' => ' + request.status);
      }
    };
  }
}
