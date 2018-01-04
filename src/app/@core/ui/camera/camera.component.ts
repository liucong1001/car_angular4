import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {MessageService} from '../../utils/message.service';
import {WebcamService} from '../../device/webcam.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-ys-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CameraComponent),
  }],
})
export class CameraComponent implements OnInit, ControlValueAccessor {
  /**
   * 传入参数
   * example:
   * title = '行驶证';
   * source = 'assets/images/camera1.jpg';
   */
  @Input() title;
  @Input() source;
  @Input() btn_show = true;
  @Input() col_sm_6 = 'col-sm-6';
  @Output() _changeSource = new EventEmitter();
  private webcam_has_show = false;

  /**
   * 构造函数
   * @param {MessageService} message
   * @param {WebcamService} webcam
   * @param {FileUploadModule} upld
   */
  constructor(private message: MessageService, private webcam: WebcamService) {
  }

  writeValue(obj: any): void {
    this.source = obj;
  }

  registFunc(value: any) {}
  registerOnChange(fn: any): void {
    this.registFunc = fn;
  }

  registerOnTouched(fn: any): void {
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
      this._changeSource.emit(res.file[0]);
    });
  }
  /**
   * 本地照片上传成功时显示
   * @param source
   */
  onUploadComplete(source) {
    this.source = source;
    this.registFunc(source);
    this._changeSource.emit(source);
  }
}
