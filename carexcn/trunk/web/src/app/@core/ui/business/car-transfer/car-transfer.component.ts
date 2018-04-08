import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Marketphotomap} from '../../../model/system/market-photo-map';
import {ErrorMessage} from '../../valid-error/valid-error.component';

@Component({
  selector: 'ngx-ys-car-transfer',
  templateUrl: './car-transfer.component.html',
  styleUrls: ['./car-transfer.component.scss'],
})
export class CarTransferComponent implements OnInit {

  /**
   * 拍照上传按钮是否显示
   * @type {boolean}
   */
  @Input() btn_show? = true;
  /**
   * 车辆过户表单
   */
  @Input() vehicleTransferObj: FormGroup;
  vehicleTransfer: FormGroup;
  /**
   * 证件表单配置
   */
  @Input() certificateFormConfig: Marketphotomap;
  /**
   * 错误实例
   * @type {{error}}
   */
  @Input() errors = {
    vehicleManagement: [new ErrorMessage('required', '必须填写车管所')],
    billMemo: [new ErrorMessage('required', '必须填写')],
    evaluatePrice: [new ErrorMessage('required', '必须填写')],
    bargainPrice: [new ErrorMessage('required', '必须填写')],
    fee: [new ErrorMessage('required', '必须填写')],
  };
  constructor() { }

  ngOnInit() {
    this.vehicleTransfer = this.vehicleTransferObj.get('vehicleTransfer') as FormGroup;
  }

  /**
   * 获取车辆管理
   */
  getSelectedVehicleManagement(event) {
    console.info(event);
  }
}
