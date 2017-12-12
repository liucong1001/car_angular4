import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../utils/message.service';
import {WebcamService} from '../../device/webcam.service';

@Component({
  selector: 'ngx-ys-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
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
  constructor(private message: MessageService, private webcam: WebcamService) {
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
   * 目前暂时只适配了开发环境[自己搭建的线上调试环境]
   * TODO: 需要在后端完成时进一步适配线上环境，对接后端程序
   */
  paizhao() {
    this.message.info('摄像头', '拍照并上传');
    this.webcam.snapshot(false, 'a', 'b').then((res) => {
      this.source = res.file[0];
    });
  }

  /**
   * 上传客户端本地图片
   * 目前暂时只适配了开发环境[自己搭建的线上调试环境]
   * TODO: 需要在后端完成时进一步适配线上环境，对接后端程序
   */
  upload() {
    this.message.info('摄像头', '上传');
  }
}
