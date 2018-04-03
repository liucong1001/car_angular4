import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {FilingService} from '../../../../@core/data/merchant/filing.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {PrejudicationService} from '../../../../@core/data/business/prejudication.service';
import {BusinessFormGroup} from '../../business.form-group';
import {BusinessTradeForm, PreVehicle, Seller} from '../../../../@core/model/business/restruct/business.trade.form';

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
  public businessTradeForm: BusinessTradeForm = {};
  public _formGroupSeller: FormGroup = this._formBuilder.group({
    seller: this._businessFormGroup.seller,
    photos: this._formBuilder.group({}),
  });
  public _formGroupVechile: FormGroup = this._formBuilder.group({
    preVehicle: this._businessFormGroup.vehicleAndData,
    photos: this._formBuilder.group({}),
  });
  /**
   * 商户搜索资源
   * @type {string}
   */
  constructor(
    private _formBuilder: FormBuilder,
    public _businessFormGroup: BusinessFormGroup,
    private _router: Router,
    private _message: MessageService,
    private _filingService: FilingService,
    private _localstorage: LocalstorageService,
    private _prejudicationService: PrejudicationService,
  ) {}

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    /**
     * 如果有缓存，则从缓存中恢复数据
     * @type {any | any}
     */
    this.businessTradeForm = this._localstorage.get('business_recording_trade_form') as BusinessTradeForm;
    this._formGroupSeller.patchValue(this.businessTradeForm.seller);
    this._formGroupSeller.patchValue(this.businessTradeForm.preVehicle);
  }
  onSubmit() {
    // let maybe_vehicle = this._localstorage.get(this._cache_pre + 'vehicle');
    // let preVehicle = maybe_vehicle as PreVehicleModel;
    // preVehicle.filingInfo = this.linkmanSelected;
    // let maybe_seller_form = this._localstorage.get(this._cache_pre + 'seller_form');
    this._prejudicationService.create(
      this.businessTradeForm.seller as Seller,
      this.businessTradeForm.preVehicle as PreVehicle,
    ).then(res => {
      console.info(res);
      let trade = res as BusinessTradeForm;
      if ( trade.archiveNo ) {
        this._localstorage.set('business_recorded_trade', res);
        // this._localstorage.del('business_recording_trade_form');
        this._router.navigateByUrl('/pages/business/prejudication/recording-last');
      }
    }).catch(e => {
      this._message.error('录入错误', e.message);
    });
  }
  /**
   * 页面销毁前
   * @constructor
   */
  ngOnDestroy() {
  }
}
