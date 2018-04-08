import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IdcardService} from '../../../../@core/device/idcard.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {MerchantModel} from '../../../../@core/model/business/merchant.model';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {Codeitem} from '../../../../@core/model/system/codeitem';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BusinessFormGroup} from '../../business.form-group';
import {BusinessTradeForm, Seller} from '../../../../@core/model/business/restruct/business.trade.form';

/**
 * 预审录入2--接口与页面的交互逻辑
 * 1、拿到上一页显示的选定的车商并显示出来
 * 2、接收到用户选择是否委托，有委托则显示委托书，否则不显示委托书
 * 3、选择卖方证件类型，则对应的显示出对应的证件类型上传入口
 * 4、读取卖方身份证信息并显示在表单中，不允许修改  [如果选择的是身份证的话]
 * 5、读取委托人的身份证信息并显示在表单中，不允许修改  [如果必要的话]
 */
@Component({
  selector: 'ngx-recording2',
  templateUrl: './recording2.component.html',
  styleUrls: ['./recording2.component.scss'],
})
export class Recording2Component implements OnInit, OnDestroy {
  public businessTradeForm: BusinessTradeForm = {preVehicle: {preVehicle: {}}};
  public certType: Codeitem[];
  merchant: MerchantModel = {name: ''};
  public _formGroup: FormGroup = this._formBuilder.group({
    photos: this._formBuilder.group({}),
    seller: this._businessFormGroup.seller,
  });
  constructor(
    private _formBuilder: FormBuilder,
    public _businessFormGroup: BusinessFormGroup,
    private _router: Router,
    private _idcard: IdcardService,
    private _message: MessageService,
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
    /**
     * 因为 businessTradeForm 注定有值
     */
    this._formGroup.patchValue(this.businessTradeForm.seller);
    console.info('_formGroup.value', this._formGroup.value);
  }

  /**
   * 页面销毁前
   */
  ngOnDestroy() {
    this.businessTradeForm.seller = this._formGroup.value as Seller;
    this._localstorage.set('business_recording_trade_form', this.businessTradeForm);
  }

  /**
   * 转到下一页
   * 按钮不应该禁用，即使表单未填写完，也要允许用户点击
   * 点击事件应检查表单有效性以提醒用户
   */
  onSubmit() {
    // [disabled]="_formGroup.invalid"
    this._router.navigateByUrl('/pages/business/prejudication/recording3');
  }
}
