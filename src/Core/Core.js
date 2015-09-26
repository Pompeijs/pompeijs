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
  
  static isBase64 (uri) {
    return uri.length < 5 ? false : uri.substr(0, 5) === "data:";
  }
  
  static decodeArrayBuffer (base64) {
        let decodedString = atob(base64);
        let bufferLength = decodedString.length;
        let arraybuffer = new Uint8Array(new ArrayBuffer(bufferLength));

        for (let i = 0; i < bufferLength; i++) {
            arraybuffer[i] = decodedString.charCodeAt(i);
        }

        return arraybuffer.buffer;
    };
  
  static Fmod (x, y) {
    return Number((x - (Math.floor(x / y) * y)).toPrecision(8));
  }
  
  static GetFilenameExtension (filename) {
    let dot = filename.lastIndexOf(".");
    let extension = filename.substring(dot, filename.length).toLowerCase();
    
    return extension;
  }

  // TO REVIEW
  static LoadFile (url, asArrayBuffer, onLoadedFileCallback, onErrorCallback, async) {
    let request = new XMLHttpRequest();
    async = async === undefined ? true : async;
    
    request.open('GET', url, async);
    
    if (asArrayBuffer) {
      request.responseType = "arraybuffer";
    }
    
    if (async) {
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            onLoadedFileCallback(asArrayBuffer ? request.response : request.responseText);
          } else {
            onErrorCallback();
            throw new PompeiError('Cannot load file at: ' + url + ' => ' + request.status);
          }
        }
      };
    }
    
    request.send(null);
    
    if (!async) {
      onLoadedFileCallback(asArrayBuffer ? request.response : request.responseText);
    }
  }
}
