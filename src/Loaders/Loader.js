import { PompeiError } from '../utils/errors';

import Core from '../Core/Core';

export default class Loader {
  
  static RegisterPlugin (plugin) {
    this.plugins = this.plugins || [];
    this.plugins.push(plugin);
  }
  
  constructor (device) {
    this._device = device;
  }
  
  load (rootUrl, url, onSuccessCallback, onProgressCallback, onErrorCallback) {
    if (!Loader.plugins) {
      if (onErrorCallback) {
        onErrorCallback("There is 0 plugins registered");
      }
      return;
    }
    
    let extension = Core.GetFilenameExtension(rootUrl + url);
    
    for (let i=0; i < Loader.plugins.length; i++) {
      let plugin = Loader.plugins[i];
      
      if (plugin.extension === extension) {
        Core.LoadFile (rootUrl + url, false, (data) => {
          plugin.load(this._device, rootUrl, data, onSuccessCallback);
        });
        break;
      }
    }
    
  }
}

export class LoaderPlugin {
  constructor () {
    this.extension = '';
  }
  
  // To be overidded
  load (device, rootUrl, data)
  { }
}
