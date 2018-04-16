import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {BusinessFormGroup} from '../../business.form-group';
import {BusinessTradeForm, PreVehicle} from '../../../../@core/model/business/restruct/business.trade.form';

/**
 * 预审录入3--接口与页面的交互逻辑
 * 1、读取用户上传的 行驶证正本，行驶证副本，登记证书首页，登记证书末页 等证件照
 * 2、通过云接口识别用户行驶证中的信息并填充进表单
 * 3、允许用户修改表单，并接收并保存表单中的最终数据
 * 4、
 */
@Component({
  selector: 'ngx-recording3',
  templateUrl: './recording3.component.html',
  styleUrls: ['./recording3.component.scss'],
})
export class Recording3Component implements OnInit, OnDestroy {
  public businessTradeForm: BusinessTradeForm = {};
  public _formGroup: FormGroup = this._formBuilder.group({
    preVehicle: this._businessFormGroup.vehicle,
    photos: this._formBuilder.group({}),
  });

  /**
   * 构造函数
   * @param {Router} _router
   * @param {FormBuilder} _formBuilder
   * @param {LocalstorageService} _localstorage
   */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    public _businessFormGroup: BusinessFormGroup,
    private _localstorage: LocalstorageService,
  ) {}

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    /**
     * 如果有缓存，则从缓存中恢复数据
     * @type {any | any}
     */
    let maybe_businessTradeForm = this._localstorage.get('business_recording_trade_form');
    if (maybe_businessTradeForm) {
      this.businessTradeForm = maybe_businessTradeForm as BusinessTradeForm;
    }
    if (this.businessTradeForm.preVehicle.preVehicle) {
      this._formGroup.patchValue(this.businessTradeForm.preVehicle);
    }
  }

  /**
   * 页面销毁前
   */
  ngOnDestroy() {
    this.businessTradeForm.preVehicle = this._formGroup.value as PreVehicle;
    let maybe_businessTradeForm = this._localstorage.get('business_recording_trade_form');
    if (maybe_businessTradeForm) {
      let tmp = maybe_businessTradeForm as BusinessTradeForm;
      this.businessTradeForm.preVehicle.preVehicle.filingInfo = tmp.preVehicle.preVehicle.filingInfo;
      this.businessTradeForm.preVehicle.preVehicle.merchant = tmp.preVehicle.preVehicle.merchant;
      this.businessTradeForm.preVehicle.preVehicle.plateNumber = tmp.preVehicle.preVehicle.plateNumber;
    }
    this._localstorage.set('business_recording_trade_form', this.businessTradeForm);
  }

  onSubmit() {
    // this.getFormValidationErrors(this._formGroup);
    this._router.navigateByUrl('/pages/business/prejudication/recording4');
    // console.info('value', this._formGroup.value);
    // this.businessTradeForm.preVehicle = this._formGroup.value as PreVehicle;
    // let maybe_businessTradeForm = this._localstorage.get('business_recording_trade_form');
    // if (maybe_businessTradeForm) {
    //   let tmp = maybe_businessTradeForm as BusinessTradeForm;
    //   this.businessTradeForm.preVehicle.preVehicle.filingInfo = tmp.preVehicle.preVehicle.filingInfo;
    //   this.businessTradeForm.preVehicle.preVehicle.merchant = tmp.preVehicle.preVehicle.merchant;
    //   this.businessTradeForm.preVehicle.preVehicle.plateNumber = tmp.preVehicle.preVehicle.plateNumber;
    // }
    // console.info('value', this.businessTradeForm);
  }
}
