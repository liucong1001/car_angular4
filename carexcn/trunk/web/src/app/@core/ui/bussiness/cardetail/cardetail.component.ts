import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../../utils/message.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Codeitem} from '../../../model/system/codeitem';
import {FilingInfoModel} from '../../../model/bussiness/filing.info.model';
import {CodeitemService} from '../../../data/system/codeitem.service';
import {ErrorMessage} from '../../valid-error/valid-error.component';
import {Marketphotomap} from '../../../model/system/market-photo-map';

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
   * 证件表单配置
   */
  @Input() certificateFormConfig: Marketphotomap;
  /**
   * 错误实例
   * @type {{error}}
   */
  @Input() errors?: object = {
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
    registrationDate: [
      new ErrorMessage('required', '必须填写行驶证注册日期！'),
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
    Trustee: {
      certCode: [
        new ErrorMessage('required', '必须填写证件号码！'),
      ],
      name: [
        new ErrorMessage('required', '必须填写姓名！'),
        new ErrorMessage('maxLength', '姓名太长了！'),
      ],
      endDate: [
        new ErrorMessage('required', '必须填写有效期！'),
      ],
      phone: [
        new ErrorMessage('required', '必须填写手机！'),
      ],
      trusteeType: [
        new ErrorMessage('required', '必须填写是否委托！'),
      ],
      address: [
        new ErrorMessage('required', '必须填写地址！'),
      ],
    },
  };
  @Input() car;
  @Input() car_detail_title?: string;
  @Input() photos: Array<object>;
  @Input() useCharacter?: Codeitem[];
  @Input() useNature?: Codeitem[];
  @Input() vehicleType?: Codeitem[];
  @Input() vehicleSize?: Codeitem[];
  @Input() vehicleOrigin?: Codeitem[];
  @Input() vehicleDisplacement?: Codeitem[];
  @Input() vehicleRange?: Codeitem[];

  public useCharacterSelected: Codeitem;
  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private fb: FormBuilder,
    private _codeitem: CodeitemService,
  ) { }

  ngOnInit() {
    if (! this.useCharacter) {
      this._codeitem.list('useCharacter').then(res => this.useCharacter = res as Codeitem[]);
    }
    if (! this.useNature) {
      this._codeitem.list('useNature').then(res => this.useNature = res as Codeitem[]);
    }
    if (! this.vehicleType) {
      this._codeitem.list('vehicleType').then(res => this.vehicleType = res as Codeitem[]);
    }
    if (! this.vehicleSize) {
      this._codeitem.list('vehicleSize').then(res => this.vehicleSize = res as Codeitem[]);
    }
    if (! this.vehicleOrigin) {
      this._codeitem.list('vehicleOrigin').then(res => this.vehicleOrigin = res as Codeitem[]);
    }
    if (! this.vehicleDisplacement) {
      this._codeitem.list('vehicleDisplacement').then(res => this.vehicleDisplacement = res as Codeitem[]);
    }
    if (! this.vehicleRange) {
      this._codeitem.list('vehicleRange').then(res => this.vehicleRange = res as Codeitem[]);
    }
    console.info('车辆组件初始化时的表单', this.vehicle);
    this.vehicle.addControl('_photos_', this.fb.group({}));
  }
  readVehicleCard() {
    console.info('读取行驶证');
  }
  useCharacterCompareWithFunc(code1: Codeitem, code2: Codeitem) {
    return (code1 && code2) ? code1.code === code2.code : false;
  }
  useCharacterSelecteFunc() {
    // console.info('useCharacterSelecteFunc');
  }
  useNatureSelecteFunc() {
    // console.info('useNatureSelecteFunc');
  }
  vehicleOriginSelecteFunc() {
    // console.info('useNatureSelecteFunc');
  }
}
