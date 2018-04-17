import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../../utils/message.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Codeitem} from '../../../model/system/codeitem';
import {FilingInfoModel} from '../../../model/business/filing.info.model';
import {CodeitemService} from '../../../data/system/codeitem.service';
import {ErrorMessage} from '../../valid-error/valid-error.component';
import {Marketphotomap} from '../../../model/system/market-photo-map';
import {BusinessTradeForm} from '../../../model/business/restruct/business.trade.form';
import {LocalstorageService} from '../../../cache/localstorage.service';

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
   * 车牌号只读
   * @type {boolean}
   */
  @Input() plateNumberReadonly? = true;
  /**
   * 车辆对象，包含照片
   */
  @Input() vehicleObj: FormGroup;
  /**
   * 车辆表单，不包含照片，后期不再接收传入此字段
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
  @Input() errors = {
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
    private _localstorage: LocalstorageService,
  ) { }

  businessTradeForm: BusinessTradeForm;
  /**
   * 页面初始化事件
   */
  ngOnInit() {
    let maybe_businessTradeForm = this._localstorage.get('business_recording_trade_form');
    if (maybe_businessTradeForm) {
      this.businessTradeForm = maybe_businessTradeForm as BusinessTradeForm;
    } else {
      maybe_businessTradeForm = this._localstorage.get('business_trade_form');
      if (maybe_businessTradeForm) {
        this.businessTradeForm = maybe_businessTradeForm as BusinessTradeForm;
      }
    }
    /**
     * 重新定义 狭义的 卖家，让照片产生在广义的卖家里，表单可直接使用
     */
    if (this.vehicleObj && !this.vehicle) {
      // 这里暂时写了预审车辆，后期根据过户车辆的实际情况(暂时没做到那里)，灵活判断
      this.vehicle = this.vehicleObj.get('preVehicle') as FormGroup;
      console.info('vehicleObj.value', this.vehicleObj.value);
      console.info('vehicle', this.vehicle.value);
    }
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
    this.vehicle.addControl('photos', this.fb.group({}));
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
