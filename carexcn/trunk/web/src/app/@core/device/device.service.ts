/**
 * Create by clh021@gmail.com On 2017.12.11
 */
import {Injectable, isDevMode} from '@angular/core';
import {MessageService} from '../utils/message.service';
import {UserService} from '../data/users.service';

@Injectable()
export class DeviceService {
  ws: WebSocket;
  /**
   * 初始化默认摄像头是否显示的状态值
   * @type {boolean}
   */
  opened = false;
  promiseMap = {};
  /**
   * 图片上传地址前缀
   * @type {string}
   */
  pre_api_url = location.protocol + '//' + location.host;
  /**
   * 图片访问地址前缀
   * @type {string}
   */
  pre_access_url = location.protocol + '//' + location.host;
  /**
   * 图片临时访问地址前缀
   * @type {string}
   */
  pre_access_url_tmp = location.protocol + '//' + location.host;
  public _message: MessageService;
  /**
   * 构造函数
   * 设备连接代理
   * 接口地址统一调度
   */
  constructor(
    public userService: UserService,
    message: MessageService,
  ) {
    this._message = message;
    this.conectAgent();
    // if (isDevMode()) {
      // this.pre_api_url = 'https://dongshenghuo.com/test.php';
    this.pre_api_url = location.protocol + '//' + location.host +
      '/rest/files/file?cloudUser=' +
      this.userService.getCurrentLoginUser().cloudUser;
    this.pre_access_url = '/rest/files/file/'; // 业务附件 /rest/files/file/{fileid}
    this.pre_access_url_tmp = '/rest/files/file/temp?cloudUser=' +
      this.userService.getCurrentLoginUser().cloudUser +
      '&filename='; // 临时文件 /rest/files/file/temp?cloudUser=0001&filename=xxx.jpg
    // }
  }

  /**
   * 设备连接代理
   */
  conectAgent() {
    if (this.opened) {
      return;
    }
    const self = this;
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
                /**
                 * 如果是初始化操作时为空，则抛出异常
                 * =====================================clh021@gmail.com ===== BEGIN
                 */
                if ('Init' === result.method) {
                  self.promiseMap[result.id].reject({
                    Error: false,
                    i: result.id,
                    'Message': '设备链接异常，请检查设备。',
                  });
                  delete self.promiseMap[result.id];
                }
                /**
                 * =====================================clh021@gmail.com ===== END
                 */
                // 不处理 promiseMap 则空
                // console.log('没有 result 不处理的情况');
              }
            }
          } else if ('event' === result.Command) {
            // console.log(result);
            // $rootScope.$broadcast(result.Type, result);
          }
        } catch (err) {
          console.info('无法解析的消息', err, e);
          // console.info('无法解析的消息', e.data, e);
        }
      }
      console.info('message', e);
    };
    this.ws.close = function () {
      console.info('closed,reopening');
      this.opened = false;
      setTimeout(self.conectAgent, 5000);
    };
    const messageService = this._message;
    this.ws.onerror = function (e) {
      if ( undefined !== messageService) {
        messageService.error('设备链接超时', '请链接好设备并刷新页面。');
      }
      console.info('error', e);
      if (!self.opened) {
        setTimeout(self.conectAgent, 5000);
      }
    };
  }

  /**
   * 发送命令
   * @param plugin      对应功能插件
   * @param method      发送命令的方法
   * @param args        命令对应的参数
   * @returns {Promise<any>}
   */
  sendCommond(plugin, method, args?: any): Promise<any> {
    const self = this;
    return new Promise(function(resolve, reject){
      const id = plugin + method + new Date().getTime();
      self.promiseMap[id] = {resolve, reject};
      self.sendCommondImpl(id, plugin, method, args);
    });
  }

  /**
   * 发送命令接口
   * @param id
   * @param plugin
   * @param method
   * @param args
   */
  sendCommondImpl(id, plugin, method, args?: any) {
    const self = this;
    if (!this.opened) {
      setTimeout(function () {
        self.sendCommondImpl(id, plugin, method, args);
      }, 100);
      return null;
    }

    const str = JSON.stringify({id, plugin, method, args});
    console.info('send', {id, plugin, method, args});
    this.ws.send(str);
  }

  /**
   * 关闭socket链接
   */
  close() {
    this.ws.close();
  }
}
