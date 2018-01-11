import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VehicleModel} from '../../../../@core/model/bussiness/vehicle.model';
import {FilingInfoModel} from '../../../../@core/model/bussiness/filing.info.model';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {FilingService} from '../../../../@core/data/merchant/filing.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {Codeitem} from '../../../../@core/model/system/codeitem';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';
import {CodeitemService} from "../../../../@core/data/system/codeitem.service";

/**
 * 预审录入4--接口与页面的交互逻辑
 * 1、显示所有录入的数据让用户确认是否有误
 * 2、本页数据不允许修改，要修改请返回上一页
 * 3、用户点击“确认提交”时则立即提交给后台接口并提示正在提交
 * 4、当收到后台接口返回的数据时则跳转到下一页，并附带后台返回的数据
 * 后台返回的数据应包含：预审流水号，批次号，二维码
 *  .
 * 表单传递显示，表单禁用，表单字段全体禁用或者只读
 */
@Component({
  selector: 'ngx-recording4',
  templateUrl: './recording4.component.html',
  styleUrls: ['./recording4.component.scss'],
})
export class Recording4Component implements OnInit, OnDestroy {
  linkManData: FilingInfoModel[] = [];
  linkman: any = {};
  linkmanSelected: FilingInfoModel = {};
  dealer: MerchantModel = {};
  vehicle: VehicleModel = {plateNumber: ''};
  carLsnumPrefixDefault = '鄂A';
  carLsnumIsOk = false;
  dealerIsOk = false;
  merchant: MerchantModel = {name: ''};
  public CERTIFICATE_TYPE_LIST: Codeitem[];
  public certificateType: Codeitem;
  public _formGroup: FormGroup = this._formBuilder.group({
    seller: this._formBuilder.group({
      certType: ['', [Validators.required]],
      certCode: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(64)]],
      endDate: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      trusteeType: ['0', [Validators.required]],
      address: ['', [Validators.required]],
      Trustee: this._formBuilder.group({
        certCode: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.maxLength(64)]],
        endDate: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        trusteeType: ['0', [Validators.required]],
        address: ['', [Validators.required]],
      }),
      // flag: ['', [Validators.required]],
    }),
  });

  errors = {
    seller: {
      certType: [
        new ErrorMessage('required', '必须填写证件类型！'),
      ],
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
    },
  };
  /**
   * 商户搜索资源
   * @type {string}
   */
  public autoinput_shanghu_source_url = '/rest/merchant/list/';
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _message: MessageService,
    private _filingService: FilingService,
    private _localstorage: LocalstorageService,
    private _codeitem: CodeitemService,
  ) {
    /**
     * 缓存前缀名以业务为单位，一个缓存前缀对应一个业务，一个缓存业务完成则删除该前缀的所有缓存
     * @type {string}
     */
    this._localstorage.prefix = 'bussiness_prejudication_recording';
  }

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    console.info('exec on init.');
    /**
     * 默认车牌前缀
     */
    if (this.vehicle.plateNumber.length < 1) {
      this.vehicle.plateNumber = this.carLsnumPrefixDefault;
    }
    /**
     * 读取车辆缓存数据：主要是车牌
     * @type {any}
     */
    let maybe_vehicle = this._localstorage.get('vehicle');
    if (maybe_vehicle) {
      this.vehicle = maybe_vehicle;
      /**
       * 如果车牌确认填写了
       */
      if (5 < (this.vehicle.plateNumber).length) {
        this.carLsnumIsOk = true;
        /**
         * 读取缓存的商户
         * @type {any}
         */
        let maybe_dealer = this._localstorage.get('dealer');
        if (maybe_dealer) {
          this.dealer = maybe_dealer;
          /**
           * 缓存联系人相关数据
           * @type {boolean}
           */
          this.dealerIsOk = true;
          this.linkManData = this._localstorage.get('linkmandata');
          this.linkmanSelected = this._localstorage.get('linkmanSelected');
          this.linkman = this.linkmanSelected;
        }
        /**
         * 读取缓存的商户
         * @type {any}
         */
        let maybe_merchant = this._localstorage.get('dealer');
        if (maybe_merchant) {
          this.merchant = maybe_merchant;
        }
        let maybe_certificate_type = this._localstorage.get('certificateType');
        if (maybe_certificate_type) {
          this.certificateType = maybe_certificate_type;
        }
        this._codeitem.list('CERTIFICATE_TYPE').then(res => this.CERTIFICATE_TYPE_LIST = res as Codeitem[]);
        let maybe_seller_form = this._localstorage.get('seller_form');
        if (maybe_seller_form) {
          this._formGroup.patchValue(maybe_seller_form);
        }
      }
    }
  }
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording-last');
  }
  /**
   * 页面销毁前
   * @constructor
   */
  ngOnDestroy() {
    console.info('exec on destroy.');
    this._localstorage.set('linkmanSelected', this.linkmanSelected);
    this._localstorage.set('linkmandata', this.linkManData);
    this._localstorage.set('dealer', this.dealer);
    this._localstorage.set('vehicle', this.vehicle);
  }

  /**
   * 选择好了商户的事件
   * @param value
   */
  getSelectedDealer(dealer) {
    this.dealer = dealer;
    this._message.info('获取商户', dealer.name);
    this._filingService.agency(dealer.id).then(res => {
      this.dealerIsOk = true;
      this.linkman = ''; // 使 --请选择--  选项高亮
      this.linkManData = res as FilingInfoModel[];
      // console.info(this.linkManData);
      // console.info(this.linkmanSelected);
    });
  }

  /**
   * 联系人匹配函数
   * @param {FilingInfoModel} linkman1
   * @param {FilingInfoModel} linkman2
   * @returns {boolean | boolean}
   */
  linkmanCompareWithFunc(linkman1: FilingInfoModel, linkman2: FilingInfoModel) {
    return (linkman1 && linkman2) ? linkman1.phone === linkman2.phone : false;
  }
  /**
   * 选择好了联系人的事件
   * @param event
   * @param value
   */
  linkmanSelecteFunc() {
    // console.info(this.linkman);
    this.linkmanSelected = this.linkman;
    // console.info(this.linkmanSelected);
  }
  /**
   * 车牌号填写完的事件
   */
  carLsnumBlur() {
    /**
     * 检查车牌号
     * 是否已经重复录入
     * 是否属于黑名单
     * 是否属于公车拍卖，如果是应该要拿到公车拍卖的车辆信息
     */
    this.carLsnumIsOk = true;
    // this._carService.checkCarLsnum(lsnum).then(res => {
    //   this.carLsnumIsOk = true;
    //   return true;
    // }).catch(err => {
    //   this._message.error('错误', err);
    // });
  }
}
