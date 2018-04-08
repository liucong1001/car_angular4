import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MessageService} from '../../../../@core/utils/message.service';
import {FilingService} from '../../../../@core/data/merchant/filing.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {PrejudicationService} from '../../../../@core/data/business/prejudication.service';
import {BusinessFormGroup} from '../../business.form-group';
import {
  BusinessTradeForm, FilingInfo, Merchant,
} from '../../../../@core/model/business/restruct/business.trade.form';

/**
 * 预审录入1--接口与页面的交互逻辑
 * 1、接收用户输入车牌号
 * 2、接收用户输入的商户部分信息以搜索商户
 * 3、接收用户输入的联系人部分信息以搜索联系人(需附带商户信息)
 * 4、将调取到联系人信息填入到表单中以使浏览者确认
 * 5、缓存该联系人的所有信息到下一步
 * 接口需求列表
 * 1、输入商户部分字符串以查询包含该字符串的所有商户
 * 2、输入联系人部分字符串以查询包含该字符串的该商户联系人
 * 3、通过联系人姓名或编号以调取该联系人的详细数据
 */
@Component({
  selector: 'ngx-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss'],
})
export class RecordingComponent implements OnInit, OnDestroy {
  public businessTradeForm: BusinessTradeForm = {preVehicle: {preVehicle: {filingInfo: {phone: ''}, merchant: {}, plateNumber: ''}}};
  public vehicleLsnumPrefixDefault = '鄂A';
  public filingInfoItems: FilingInfo[] = [];
  /**
   * 构造函数
   * @param {Router} _router
   * @param {FormBuilder} _formbuilder
   * @param {MessageService} _message
   * @param {FilingService} _filingService
   * @param {LocalstorageService} _localstorage
   */
  constructor(
    private _router: Router,
    private _formbuilder: FormBuilder,
    private _message: MessageService,
    private _filingService: FilingService,
    private _localstorage: LocalstorageService,
    private _prejudication: PrejudicationService,
    public _businessFormGroup: BusinessFormGroup,
  ) {
  }

  // public vehicleLsnumWrong = true;
  // public merchantWrong = false;
  // linkman: any = {};
  // linkmanSelected: FilingInfoModel = {};
  // merchant: MerchantModel = {};
  // vehicle: PreVehicle2 = {plateNumber: ''};
  /**
   * 页面初始化事件
   */
  ngOnInit() {
    let maybe_businessTradeForm = this._localstorage.get('business_recording_trade_form');
    if (maybe_businessTradeForm) {
      this.businessTradeForm = maybe_businessTradeForm as BusinessTradeForm;
    }
    if (this.businessTradeForm.preVehicle.preVehicle.merchant.id) {
      this._filingService.agency(this.businessTradeForm.preVehicle.preVehicle.merchant.id).then(res => {
        // console.info('res', res);
        this.filingInfoItems = res as FilingInfo[];
      });
    }
    if (this.businessTradeForm.preVehicle.preVehicle.plateNumber.length < 1) {
      this.businessTradeForm.preVehicle.preVehicle.plateNumber = this.vehicleLsnumPrefixDefault;
    }
  }

  /**
   * 页面销毁前
   * @constructor
   */
  ngOnDestroy() {
    this._localstorage.set('business_recording_trade_form', this.businessTradeForm);
  }

  /**
   * 联系人匹配函数
   * @param {FilingInfoModel} linkman1
   * @param {FilingInfoModel} linkman2
   * @returns {boolean | boolean}
   */
  filingInfoCompareWithFunc(linkman1: FilingInfo, linkman2: FilingInfo) {
    return (linkman1 && linkman2) ? linkman1.phone === linkman2.phone : false;
  }

  /**
   * 选择好了商户的事件
   * @param value
   */
  getSelectedMerchant(merchant) {
    this.businessTradeForm.preVehicle.preVehicle.merchant = merchant as Merchant;
    this._message.info('获取商户', merchant.name);
    this._filingService.agency(merchant.id).then(res => {
      // this.merchantWrong = false;
      this.businessTradeForm.preVehicle.preVehicle.filingInfo = ''; // 使 --请选择--  选项高亮
      this.filingInfoItems = res as FilingInfo[];
      // 下一步：注意保存商户和代办员的候选项，缓存，让选项展示出来
    });
  }

  /**
   * 转入下一页面
   */
  onSubmit() {
    if (this.businessTradeForm.preVehicle.preVehicle.plateNumber.length > 5 ) {
      // this._prejudication.checkCar(this.vehicle.plateNumber, this.linkmanSelected.id).then(res => {
      //   this.vehicleLsnumWrong = false;
      //   console.info(res);
        this._router.navigateByUrl('/pages/business/prejudication/recording2');
      // }).catch(e => {
      //   console.info(e);
      //   this._message.error('录入错误', e.message);
      // });
    } else {
      this._message.error('车牌号错误', '您的车牌号没有填写完');
    }
  }

  /**
   * 车牌号填写完的事件
   * TODO: 必须先可以输入并验证好车牌号，然后才让进行代办商户代办人的选择，才可以进行下一步
   */
  vehicleLsnumBlur() {
    /**
     * 检查车牌号
     * 是否属于黑名单
     * 是否已经重复录入
     * 是否属于公车拍卖，如果是应该要拿到公车拍卖的车辆信息
     */
    // if (this.vehicle.plateNumber.length >= 5) {
    //   // this._prejudication.checkCar(this.vehicle.plateNumber, this.linkmanSelected.id).then(res => {
    //   //   console.info(res);
    //     this._router.navigateByUrl('/pages/business/prejudication/recording2');
    //   // }).catch(e => {
    //   //   console.info(e);
    //   //   this._message.error('录入错误', e.message);
    //   // });
    // } else {
    //   this._message.error('车牌号错误', '您的车牌号可能没有填写完');
    // }
  }
}
