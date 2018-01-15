import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../../utils/message.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Codeitem} from "../../../model/system/codeitem";
import {FilingInfoModel} from "../../../model/bussiness/filing.info.model";
import {CodeitemService} from "../../../data/system/codeitem.service";
import {ErrorMessage} from "../../valid-error/valid-error.component";

@Component({
  selector: 'ngx-ys-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.scss'],
})
export class CardetailComponent implements OnInit {
  /**
   * 拍照上传按钮是否显示
   * @type {boolean}
   */
  @Input() btn_show? = true;
  /**
   * 卖家表单
   */
  @Input() vehicle: FormGroup;
  /**
   * 错误实例
   * @type {{error}}
   */
  @Input() errors?: object;
  @Input() car;
  @Input() car_detail_title?: string;
  @Input() photos: Array<object>;
  @Input() useCharacter?: Codeitem[];
  @Input() vehicleType?: Codeitem[];
  @Input() vehicleSize?: Codeitem[];

  public useCharacterSelected: Codeitem;
  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private _codeitem: CodeitemService,
  ) { }

  ngOnInit() {
    if (! this.useCharacter) {
      this._codeitem.list('useCharacter').then(res => this.useCharacter = res as Codeitem[]);
    }
    if (! this.useCharacter) {
      this._codeitem.list('vehicleType').then(res => this.vehicleType = res as Codeitem[]);
    }
    if (! this.useCharacter) {
      this._codeitem.list('vehicleSize').then(res => this.vehicleSize = res as Codeitem[]);
    }
    if (! this.errors) {
      this.errors = {
        brandModel: [
          new ErrorMessage('required', '必须填写厂牌型号！'),
        ],
        labelCode: [
          new ErrorMessage('required', '必须填写厂牌型号！'),
        ],
        vehicleType: [
          new ErrorMessage('required', '必须填写车辆类型！'),
        ],
        plateNumber: [
          new ErrorMessage('required', '必须填写车牌号！'),
        ],
        frameNumber: [
          new ErrorMessage('required', '必须填写车架号！'),
        ],
        engineNumber: [
          new ErrorMessage('required', '必须填写发动机号！'),
        ],
        registration: [
          new ErrorMessage('required', '必须填写登记证书号！'),
        ],
        useCharacter: [
          new ErrorMessage('required', '必填'),
        ],
        useNature: [
          new ErrorMessage('required', '必须填写车辆性质！'),
        ],
        displacement: [
          new ErrorMessage('required', '必须填写排量！'),
        ],
        range: [
          new ErrorMessage('required', '必须填写排量区间！'),
        ],
        size: [
          new ErrorMessage('required', '必须填写车辆大小！'),
        ],
        mileage: [
          new ErrorMessage('required', '必须填写行驶里程！'),
        ],
        otherConditions: [
          new ErrorMessage('required', '必须填写其他状况！'),
        ],
        origin: [
          new ErrorMessage('required', '必须填写车辆产地！'),
        ],
        fee: [
          new ErrorMessage('required', '必须填写业务手续费！'),
        ],
        review: [
          new ErrorMessage('required', '必须填写审核状态！'),
        ],
        invalid: [
          new ErrorMessage('required', '必须填写业务状态！'),
        ],
        eeee: [
          new ErrorMessage('maxLength', '太长了！'),
        ],
      };
    }
  }
  readVehicleCard() {
    console.info('读取行驶证');
  }
  useCharacterCompareWithFunc(code1: Codeitem, code2: Codeitem) {
    return (code1 && code2) ? code1.code === code2.code : false;
  }
  useCharacterSelecteFunc() {
    console.info('useCharacterSelecteFunc');
  }
}
