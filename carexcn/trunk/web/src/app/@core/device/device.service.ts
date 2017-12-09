import {Injectable} from '@angular/core';

@Injectable()
export class DeviceService {
  ws: WebSocket;
  opened = false;
  promiseMap = {};

  constructor() {
    this.conectAgent();
  }

  conectAgent() {
    if (this.opened) {
      return;
    }
    let self = this;
    this.ws = new WebSocket('ws://127.0.0.1:18181');
    this.ws.onopen = function () {
      self.opened = true;
    };
    this.ws.onmessage = function (e) {
      if (e.data === 'close') {
        self.ws.close();
      } else {
        try {
          const result = JSON.parse(e.data);
          // if (result.method == "snapshot") {
          //     document.getElementById("uplaodedImg").setAttribute("src",
          //         "http://test.ystfin.com/common/download?file=/temp/" + result.result.replace(/"/g, ""))
          // }
          if (result.id) {
            if (self.promiseMap[result.id]) {
              if (result.result) {
                if (result.result.Error) {
                  self.promiseMap[result.id].reject(result.result);
                } else {
                  self.promiseMap[result.id].resolve(result.result);
                }
                delete self.promiseMap[result.id];
              } else {
                //不处理 promiseMap 则空
              }
            }
          } else if ('event' === result.Command) {
            console.log(result);
            // $rootScope.$broadcast(result.Type, result);
          }
        } catch (err) {
          console.log('无法解析的消息', err, e);
          // console.log('无法解析的消息', e.data, e);
        }
      }
      console.log('message', e);
    };
    this.ws.close = function () {
      console.log('closed,reopening');
      this.opened = false;
      setTimeout(self.conectAgent, 5000);
    };
    this.ws.onerror = function (e) {
      console.log('error', e);
      if (!self.opened) {
        setTimeout(self.conectAgent, 5000);
      }
    };
  }

  sendCommond(plugin, method, args?: any): Promise<any> {
    let self = this;
    return new Promise(function(resolve, reject){
      let id = plugin + method + new Date().getTime();
      self.promiseMap[id] = {resolve, reject};
      self.sendCommondImpl(id, plugin, method, args);
    });
  }
  sendCommondImpl(id,plugin, method, args?: any) {
    let self = this;
    if (!this.opened) {
      setTimeout(function () {
        self.sendCommondImpl(id, plugin, method, args)
      }, 100);
      return
    }

    let str = JSON.stringify({id, plugin, method, args});
    console.log('send', {id, plugin, method, args});
    this.ws.send(str);
  }
  close() {
    this.ws.close()
  }
}
