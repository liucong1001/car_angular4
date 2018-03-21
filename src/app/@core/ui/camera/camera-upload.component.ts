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
    .ui-button-icon-left {
      left: 0em !important;
    }
    .ui-button-text {
      padding: .25em 1em .25em 0 !important;
    }
    .ui-button {
      background: rgba(68, 59, 113, 0) !important;
      height: 20px;
      border: none !important;
    }
    .ui-button-icon-only .fa, .ui-button-text-icon-left .fa, .ui-button-text-icon-right .fa {
      margin-top: -.35em !important;
    }
    `],
  encapsulation: ViewEncapsulation.None,
})
export class CameraUploadComponent implements OnInit {
  @Input('upload_url') upload_url;
  @Output('_new_img_url') private _new_img_url = new EventEmitter();
  @Output('_progress') private _progress = new EventEmitter();
  /**
   * 构造函数
   * 目前暂时只适配了开发环境[自己搭建的调试环境]
   * TODO: 需要在后端完成时进一步适配线上环境，对接后端程序
   * @param {MessageService} message
   */
  constructor(
    private message: MessageService,
  ) {
  }
  ngOnInit() {
  }
  uploadBefore($event) {
    this._progress.emit(1);
    $event.xhr.setRequestHeader ('Accept', 'application/json');
  }
  /**
   * 上传进度支持
   * @param $event
   */
  uploadProgress($event) {
    this._progress.emit($event.progress);
  }

  /**
   * 上传完成事件提醒
   * @param $event
   */
  uploadComplete($event) {
    const res = JSON.parse($event.xhr.responseText);
    this._new_img_url.emit(res.file[0]);
    this.message.info('上传', '上传完成');
  }

  /**
   * 选中文件事件提醒
   * @param $event
   */
  triggerFileselect($event) {
    // this.message.info('文件选择', '点了我');
  }
}
