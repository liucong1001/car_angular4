import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {Codeitem} from '../../../../@core/model/system/codeitem';
import {CodeitemService} from '../../../../@core/data/system/codeitem.service';
import {BusinessFormGroup} from '../../business.form-group';
import {BusinessTradeForm} from '../../../../@core/model/business/restruct/business.trade.form';

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
  useCharacter: Codeitem[];
  vehicleType: Codeitem[];
  vehicleSize: Codeitem[];
  public _formGroup: FormGroup = this._businessFormGroup.vehicleAndData;

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
    private _codeitem: CodeitemService,
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
    // let maybe_vehicle = this._localstorage.get(this._cache_pre + 'vehicle');
    // if (maybe_vehicle) {
    //   this._formGroup.patchValue(maybe_vehicle);
    //   let maybe_seller_form = this._localstorage.get(this._cache_pre + 'seller_form');
    //   if (maybe_seller_form) {
    //     this._formGroup.patchValue({});
    //   }
    // }
    this._codeitem.list('useCharacter').then(res => this.useCharacter = res as Codeitem[]);
    this._codeitem.list('vehicleType').then(res => this.vehicleType = res as Codeitem[]);
    this._codeitem.list('vehicleSize').then(res => this.vehicleSize = res as Codeitem[]);

    // let maybe_seller_form = this._localstorage.get('seller_form');
    // if (maybe_seller_form) {
    //   this._formGroup.patchValue(maybe_seller_form);
    // }
  }
  /**
   * 页面销毁前
   */
  ngOnDestroy() {
    // this._localstorage.set(this._cache_pre + 'vehicle', this._formGroup.value);
    // this._localstorage.set(this._cache_pre + 'vehicle_photos', this._formGroup.get('_photos_').value);
    // this._localstorage.set('dynamic_photos_cardetail', this._cache_pre + 'vehicle_photos');
  }

  onSubmit() {
    // this.getFormValidationErrors(this._formGroup);
    this._router.navigateByUrl('/pages/business/prejudication/recording4');
  }
}
