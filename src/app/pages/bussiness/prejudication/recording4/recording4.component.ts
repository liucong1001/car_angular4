import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {VehicleModel} from '../../../../@core/model/bussiness/vehicle.model';
import {FilingInfoModel} from '../../../../@core/model/bussiness/filing.info.model';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {FilingService} from '../../../../@core/data/merchant/filing.service';
import {MessageService} from '../../../../@core/utils/message.service';

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
  ) { }

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
