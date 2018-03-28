import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {CameraCarexcnFileDescrption} from '../../data/system/file-system.service';
import {AbstractControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-ys-camera-carexcn',
  templateUrl: './camera-carexcn.component.html',
  styleUrls: ['./camera-carexcn.component.scss'],
})
export class CameraCarexcnComponent implements OnInit {

  /**
   * 传入参数
   * example:
   * title = '行驶证';
   * source = 'assets/images/camera1.jpg';
   * source = 'tmp:123456789.jpg';
   * source = 'id:12346156fd564';
   */
  @Input() _title: string;
  @Input() _source: CameraCarexcnFileDescrption;
  /**
   * 当照片值为空时显示示例照片
   */
  @Input() _example_source: string;
  /**
   * 是否显示上传按钮
   * @type {boolean}
   */
  @Input() _btn_show = true;
  @Input() _formControl: AbstractControl[];
  /**
   * 是否显示 check 按钮(一般用于审核操作)
   * @type {boolean}
   */
  @Input() _btn_check = false;
  @Input() _col_sm_6 = 'col-sm-6';
  /**
   * 图片新地址
   * @type {EventEmitter<any>}
   * @private
   */
  @Output() _changeSource = new EventEmitter();
  /**
   * 是否勾选当前照片
   * @type {EventEmitter<any>}
   * @private
   */
  @Output() _wrong_checked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  wrongChecked(event) {
    this._wrong_checked.emit(event);
  }
  changeSource(event) {
    this._changeSource.emit(event);
  }
}
