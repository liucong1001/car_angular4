import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MessageService} from '../../../../@core/utils/message.service';
import {FilingInfoModel} from '../../../../@core/model/bussiness/filing.info.model';
import {FilingService} from '../../../../@core/data/merchant/filing.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {PreVehicleModel} from '../../../../@core/model/bussiness/trade/preVehicle/preVehicle.model';
import {PrejudicationService} from '../../../../@core/data/bussiness/prejudication.service';

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
  /**
   *  搜索确认商户联系人时调取对应信息
   */
  cameras: any[] = [{
    title: '联系人身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '联系人身份证反面',
    source: 'assets/images/camera2.jpg',
  }, {
    title: '代办联系人头像',
    source: 'assets/images/camera3.jpg',
  }, {
    title: '商户联系人确认单',
    source: 'assets/images/camera4.jpg',
  }];
  carLsnumPrefixDefault = '鄂A';
  carLsnumIsOk = false;
  dealerIsOk = false;
  /**
   * 商户搜索资源
   * @type {string}
   */
  public autoinput_shanghu_source_url = '/rest/merchant/list/';
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
  ) {
    /**
     * 缓存前缀名以业务为单位，一个缓存前缀对应一个业务，一个缓存业务完成则删除该前缀的所有缓存
     * @type {string}
     */
    this._localstorage.prefix = 'bussiness_prejudication_recording';
  }

  linkManData: FilingInfoModel[] = [];
  linkman: any = {};
  linkmanSelected: FilingInfoModel = {};
  dealer: MerchantModel = {};
  vehicle: PreVehicleModel = {plateNumber: ''};
  /**
   * 页面初始化事件
   */
  ngOnInit() {
    // console.info('exec on init.');
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

  /**
   * 页面销毁前
   * @constructor
   */
  ngOnDestroy() {
    // console.info('exec on destroy.');
    this._localstorage.set('linkmanSelected', this.linkmanSelected);
    this._localstorage.set('linkmandata', this.linkManData);
    this._localstorage.set('dealer', this.dealer);
    this._localstorage.set('vehicle', this.vehicle);
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
   * 转入下一页面
   */
  onSubmit() {
    if (this.vehicle.plateNumber.length > 5 ) {
      this._prejudication.checkCar(this.vehicle.plateNumber, this.linkmanSelected.id).then(res => {
        this._router.navigateByUrl('/pages/bussiness/prejudication/recording2');
      }).catch(e => {
        this._message.error('录入错误', e.json().message);
      });
    } else {
      this._message.error('车牌号错误', '您的车牌号可能没有填写完');
    }
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
