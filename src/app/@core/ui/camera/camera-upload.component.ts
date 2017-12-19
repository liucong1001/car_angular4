import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MessageService} from '../../utils/message.service';

@Component({
  selector: 'ngx-ys-camera-upload',
  templateUrl: './camera-upload.component.html',
  styles: [`
    p-fileupload input {
      position: absolute;
      z-index: 1;
      direction: rtl;
      top: 5px;
      right: 5px;
      margin: 0;
      opacity: 0;
      height: 30px;
      width: 30px;
      float: right;
      text-align: right;
      filter: alpha(opacity=0);
      cursor: pointer;
    }
    `],
  encapsulation: ViewEncapsulation.None,
})
export class CameraUploadComponent implements OnInit {
  @Input('upload_url') upload_url;
  @Output('_new_img_url') private _new_img_url = new EventEmitter();

  /**
   * 构造函数
   * 目前暂时只适配了开发环境[自己搭建的调试环境]
   * TODO: 需要在后端完成时进一步适配线上环境，对接后端程序
   * @param {MessageService} message
   */
  constructor(private message: MessageService) {
  }
  ngOnInit() {
  }
  uploadProgress($event) {
    // this.message.info('上传进度', $event.progress + '%');
  }
  uploadComplete($event) {
    const res = JSON.parse($event.xhr.responseText);
    this._new_img_url.emit(res.file[0]);
    this.message.info('上传', '上传完成');
  }
  triggerFileselect($event) {
    // this.message.info('文件选择', '点了我');
  }
}
