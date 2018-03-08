import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TradeService} from '../../../../@core/data/bussiness/trade.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {BussinessFormGroup} from '../../bussiness.form-group';

@Component({
  selector: 'ngx-trecording2',
  templateUrl: './trecording2.component.html',
  styleUrls: ['./trecording2.component.scss'],
})
export class Trecording2Component implements OnInit {
  private _cache_pre = 'bussiness_transfer_recording_';
  vehicleCertificateFormConfig: Marketphotomap;
  sellerCertificateFormConfig: Marketphotomap;
  buyerCertificateFormConfig: Marketphotomap;
  public archiveNo = '';
  public trade: TradeForm;
  // public trade: TradeForm = {preVehicle: {preVehicle: {filingInfo: {}, merchant: {}}}};
  public tradeList: [TradeForm];
  public _formGroup: FormGroup = this._formBuilder.group({
    buyer: this._bussinessFormGroup.buyer,
  });
  constructor(
    private _router: Router,
    private _trade: TradeService,
    private _message: MessageService,
    private _formBuilder: FormBuilder,
    private _bussinessFormGroup: BussinessFormGroup,
    private _localstorage: LocalstorageService,
  ) { }
  getTradeByArchiveNoComponent(trade) {
    // console.info('trade', trade);
    this.trade = trade;
    // this._formGroup.controls.seller.patchValue(this.trade.seller.seller);
  }
  getTradeListByArchiveNoComponent(tradeList) {
    // console.info('tradeList', tradeList);
    this.tradeList = tradeList;
    // this.onChangeSelectedCar(tradeList[0]);
  }

  ngOnInit() {
    let maybe_continue_archiveNo = this._localstorage.get(this._cache_pre + 'archiveNo');
    if (maybe_continue_archiveNo) {
      this.archiveNo = maybe_continue_archiveNo;
    }
    /**
     * 卖家证件类型表单配置
     * @type {{}}
     */
    this.sellerCertificateFormConfig = {
      isApp: '0',
      certificateCode: '00', // 证件类型代码集
      business: '02', //  01 预审  02 过户
      formName: '过户录入卖家', // 表单名称
    } as Marketphotomap;
    /**
     * 买家证件类型表单配置
     * @type {{}}
     */
    this.buyerCertificateFormConfig = {
      isApp: '0',
      certificateCode: '00', // 证件类型代码集
      business: '02', //  01 预审  02 过户
      formName: '过户录入买家', // 表单名称
    } as Marketphotomap;
  }
  onSubmit() {
    console.info('_formGroup.value', this._formGroup.value);
    // this._router.navigateByUrl('/pages/bussiness/transfer/trecording-last');
  }

}
