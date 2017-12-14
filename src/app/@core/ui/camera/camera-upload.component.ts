import {Component, EventEmitter, Input, isDevMode, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MessageService} from '../../utils/message.service';
import {FileUploadModule} from 'primeng/primeng';

@Component({
  selector: 'ngx-ys-camera-upload',
  templateUrl: './camera-upload.component.html',
  styles: [`
    p-fileupload input {
      position: absolute;
      top: 3px;
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
  providers: [FileUploadModule],
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
   * @param {FileUploadModule} upld
   */
  constructor(private message: MessageService, private upld: FileUploadModule) {
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
}
