import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {MessageService} from '../../utils/message.service';
import {WebcamService} from '../../device/webcam.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CameraModalComponent} from './camera-modal/camera-modal.component';
import {DeviceService} from '../../device/device.service';

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
  constructor(
    private message: MessageService,
    private webcam: WebcamService,
    private modalService: NgbModal,
    private device: DeviceService,
  ) {
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

  showPicModal(picSource) {
    console.info('this.showPicModal url : ' + picSource);
    const activeModal = this.modalService.open(CameraModalComponent, { size: 'lg', container: 'nb-layout', windowClass: 'text-center'});
    activeModal.componentInstance.modalHeader = '查看图片';
    activeModal.componentInstance.pic_source = picSource;
  }

  /**
   * 拿到图片后统一处理的事
   * @param {string} file
   */
  afterGetFileName(file: string) {
    /**
     * 显示当前新图片
     */
    this.source = this.device.pre_access_url_tmp + file;
    this._changeSource.emit(file);
    this.registFunc(file);
  }

  /**
   * 拍照并自动上传
   */
  paizhao() {
    this.message.info('摄像头', '拍照并上传');
    this.webcam.snapshot(false, 'a', 'b').then((res) => {
      this.afterGetFileName(res.file[0]);
    });
  }
  /**
   * 本地照片上传成功时显示
   * @param source
   */
  onUploadComplete(source) {
    this.afterGetFileName(source);
  }
}
