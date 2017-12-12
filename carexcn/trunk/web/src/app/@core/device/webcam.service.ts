import {Injectable, isDevMode} from '@angular/core';
import {DeviceService} from './device.service';

@Injectable()
export class WebcamService {

  constructor(private device: DeviceService) {
  }

  showWebcam(): Promise<any> {
    return this.device.sendCommond('WebCam', 'show');
  }

  hideWebcam(): Promise<any> {
    return this.device.sendCommond('WebCam', 'hide');
  }

  snapshot(rotate: boolean, user: string, mac: string): Promise<any> {
    let args: string;
    if (isDevMode()) {
      args = 'http://dongshenghuo.com/test.php?u=' + '/files/upload/user=' + user + '&mac=' + mac;
    } else {
      args = location.protocol + '//' + location.host + '/files/upload?user=' + user + '&mac=' + mac;
    }
    if (rotate) {
      args += '&xuanzhuan=true';
    }
    const self = this;
    return new Promise(function(resolve, reject){
      self.device.sendCommond('WebCam', 'snapshot', args).then(function (result) {
        resolve(JSON.parse(result));
      }, function (error) {
        reject(error);
      });
    });
  }
}
