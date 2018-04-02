import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TradeService} from '../../../../@core/data/business/trade.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {BusinessFormGroup} from '../../business.form-group';
import {TransferService} from '../../../../@core/data/business/transfer.service';
import {TransferVehicleModel} from '../../../../@core/model/business/trade/transferVehicle/transferVehicle.model';
import {BuyerModel} from '../../../../@core/model/business/trade/buyer.model';
import {FileSystemService} from '../../../../@core/data/system/file-system.service';
import {FilingInfoModel} from '../../../../@core/model/business/filing.info.model';

@Component({
  selector: 'ngx-trecording2',
  templateUrl: './trecording2.component.html',
  styleUrls: ['./trecording2.component.scss'],
})
export class Trecording2Component implements OnInit {
  private _cache_pre = 'business_transfer_recording_';
  vehicleCertificateFormConfig: Marketphotomap;
  sellerCertificateFormConfig: Marketphotomap;
  buyerCertificateFormConfig: Marketphotomap;
  vehicleTransferCertificateFormConfig: Marketphotomap;
  public archiveNo = '';
  public trade: TradeForm;
  // public trade: TradeForm = {preVehicle: {preVehicle: {filingInfo: {}, merchant: {}}}};
  public tradeList: [TradeForm];
  public _formGroup: FormGroup = this._formBuilder.group({
    buyer: this._businessFormGroup.buyer,
    vehicleTransfer: this._businessFormGroup.vehicleTransfer,
  });
  constructor(
    private _router: Router,
    private _trade: TradeService,
    private _message: MessageService,
    private _formBuilder: FormBuilder,
    private _businessFormGroup: BusinessFormGroup,
    private _localstorage: LocalstorageService,
    private _transfer: TransferService,
    private _file: FileSystemService,
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
      certificateCode: '00', // 证件类型代码集
      formName: '过户录入卖家', // 表单名称
    } as Marketphotomap;
    /**
     * 买家证件类型表单配置
     * @type {{}}
     */
    this.buyerCertificateFormConfig = {
      certificateCode: '00', // 证件类型代码集
      formName: '过户录入买家', // 表单名称
    } as Marketphotomap;
    this.vehicleTransferCertificateFormConfig = {
      certificateCode: '00', // 证件类型代码集
      formName: '过户录入车辆', // 表单名称
    } as Marketphotomap;
    /**
     * 处理缓存数据
     * @type {any | any}
     */
    let maybe_vehicleTransfer = this._localstorage.get(this._cache_pre + 'vehicleTransfer');
    if (maybe_vehicleTransfer) {
      let maybe_buyer = this._localstorage.get(this._cache_pre + 'buyer');
      if (maybe_buyer) {
        this._formGroup.patchValue({
          buyer: maybe_buyer,
          vehicleTransfer: maybe_vehicleTransfer,
        });
        this._localstorage.get(this._cache_pre + 'buyer_photos');
      } else {
        this._formGroup.patchValue({
          vehicleTransfer: maybe_vehicleTransfer,
        });
      }
    }
  }
  onSubmit() {
    /**
     * 处理缓存数据
     */
    this._localstorage.set(this._cache_pre + 'buyer', this._formGroup.get('buyer').value);
    this._localstorage.set(this._cache_pre + 'buyer_photos', this._formGroup.get('buyer').get('_photos_').value);
    this._localstorage.set('dynamic_photos_buyer_info', this._cache_pre + 'buyer_photos');
    this._localstorage.set(this._cache_pre + 'vehicleTransfer', this._formGroup.get('vehicleTransfer').value);
    /**
     * 发送提交请求
     */
    let transferVehicle = this._formGroup.get('vehicleTransfer').value as TransferVehicleModel;
    // transferVehicle.vehicleManagement = {};
    delete transferVehicle.vehicleManagement;
    transferVehicle.filingInfo = this.trade.preVehicle.preVehicle.filingInfo as FilingInfoModel;
    this._transfer.create(
      this.trade.archiveNo,
      this._file.filterPhotosValue(this._formGroup.get('buyer').get('_photos_').value),
      this._formGroup.get('buyer').value as BuyerModel,
      {},
      // this._formGroup.get('vehicleTransfer').value as TransferVehicleModel,
      transferVehicle,
      this.trade.preVehicle.preVehicle.id,
    ).then(res => {
      console.info('res', res);
      this._localstorage.set(this._cache_pre + 'transfer_trade', res);
      this._router.navigateByUrl('/pages/business/transfer/trecording-last');
    }).catch(e => {
      console.info('e', e);
      this._message.error('错误', e.message);
    });
  }

}
