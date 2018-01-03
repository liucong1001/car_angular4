import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CarModel} from '../../../../@core/model/bussiness/car.model';
import {FormBuilder} from '@angular/forms';
import {CarService} from '../../../../@core/data/bussiness/car.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {FilingInfoModel} from '../../../../@core/model/bussiness/filing.info.model';
import {FilingService} from '../../../../@core/data/merchant/filing.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {VehicleModel} from '../../../../@core/model/bussiness/vehicle.model';

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
  /**
   * 车辆模型
   * @type {CarModel}
   */
  public car = new CarModel();
  carLsnumPrefixDefault = '鄂A';
  carLsnumIsOk = false;
  dealerIsOk = false;
  /**
   * 商户搜索资源
   * @type {string}
   */
  public autoinput_shanghu_source_url = 'http://localhost/rest/merchant/list/';
  /**
   * 构造函数
   * @param {Router} _router
   * @param {FormBuilder} _formbuilder
   * @param {CarService} _carService
   * @param {MessageService} _message
   * @param {FilingService} _filingService
   * @param {LocalstorageService} _localstorage
   */
  constructor(
    private _router: Router,
    private _formbuilder: FormBuilder,
    private _carService: CarService,
    private _message: MessageService,
    private _filingService: FilingService,
    private _localstorage: LocalstorageService,
  ) {
    this._localstorage.prefix = 'bussiness_recording';
    // this._localstorage.prefix = 'bussiness_prejudication_recording';
  }

  linkManData: FilingInfoModel[] = [];
  linkman: any = {};
  linkmanSelected: FilingInfoModel = {};
  dealer: MerchantModel = {};
  vehicle: VehicleModel = {plateNumber: ''};
  /**
   * 页面初始化事件
   */
  ngOnInit() {
    console.info('exec on init.');
    if (this.vehicle.plateNumber.length < 1) {
      this.vehicle.plateNumber = this.carLsnumPrefixDefault;
    }
    let maybe_vehicle = this._localstorage.get('vehicle');
    if (maybe_vehicle) {
      this.vehicle = maybe_vehicle;
      if (5 < (this.vehicle.plateNumber).length) {
        this.carLsnumIsOk = true;
        this.dealer = this._localstorage.get('dealer');
        if (this.dealer) {
          // this._filingService.agency(this.dealer.id).then(res => {
          this.dealerIsOk = true;
          this.linkManData = this._localstorage.get('linkmandata');
          this.linkmanSelected = this._localstorage.get('linkmanSelected');
          // this.linkman = this.linkmanSelected.phone;
          this.linkman = JSON.stringify(this.linkmanSelected);
          // this.linkManData = res as FilingInfoModel[];
          // });
        }
      }
    }
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
   * 选择好了联系人的事件
   * @param event
   * @param value
   */
  linkmanSelecteFunc() {
    console.info(this.linkman);
    this.linkmanSelected =  JSON.parse(this.linkman);
    console.info(this.linkmanSelected);
  }

  /**
   * 转入下一页面
   */
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording2');
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
