import {Component, Input, isDevMode, OnInit} from '@angular/core';
import {MessageService} from '../../utils/message.service';
import {WebcamService} from '../../device/webcam.service';
import {FileUploadModule} from 'primeng/primeng';
import {DeviceService} from '../../device/device.service';

@Component({
  selector: 'ngx-ys-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  providers: [WebcamService, DeviceService, FileUploadModule],
})
export class CameraComponent implements OnInit {
  /**
   * 传入参数
   * example:
   * title = '行驶证';
   * source = 'assets/images/camera1.jpg';
   */
  @Input() title;
  @Input() source;
  private webcam_has_show = false;
  public upload_url: string;

  /**
   * 构造函数
   * @param {MessageService} message
   * @param {WebcamService} webcam
   * @param {FileUploadModule} upld
   */
  constructor(private message: MessageService, private webcam: WebcamService, private upld: FileUploadModule) {
    const self = this;
    // this.upld.progress.subscribe( data => {
    //   // console.log('progress = ' + data);
    //   self.message.info('当前上传:' + data, '上传');
    // });
    if (isDevMode()) {
      this.upload_url = 'http://dongshenghuo.com/test.php';
    } else {
      this.upload_url = location.protocol + '//' + location.host + '/files/upload';
    }
  }

  ngOnInit() {
  }
  /**
   *  显示或隐藏摄像头窗口
   */
  showCamera() {
    if (this.webcam_has_show) {
      this.webcam.hideWebcam();
      this.webcam_has_show = false;
      this.message.info('摄像头', '当前关闭');
    } else {
      this.webcam.showWebcam();
      this.webcam_has_show = true;
      this.message.info('摄像头', '当前开启');
    }
  }

  /**
   * 拍照并自动上传
   * 目前暂时只适配了开发环境[自己搭建的调试环境]
   * TODO: 需要在后端完成时进一步适配线上环境，对接后端程序
   */
  paizhao() {
    this.message.info('摄像头', '拍照并上传');
    this.webcam.snapshot(false, 'a', 'b').then((res) => {
      this.source = res.file[0];
    });
  }
  /**
   * 本地照片上传成功时显示
   * @param source
   */
  onUploadComplete(source) {
    this.source = source;
  }
}
