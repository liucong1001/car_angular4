import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TradeService} from '../../../../@core/data/business/trade.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {BusinessFormGroup} from '../../business.form-group';
import {BusinessTradeForm} from '../../../../@core/model/business/restruct/business.trade.form';

@Component({
  selector: 'ngx-ys-trecording',
  templateUrl: './trecording.component.html',
  styleUrls: ['./trecording.component.scss'],
})
export class TrecordingComponent implements OnInit {
  public businessTradeForm: BusinessTradeForm = {preVehicle: {preVehicle: {}}};
  public notNewCar = true;
  public tradeList: [BusinessTradeForm];
  public _vehicleFormGroup: FormGroup = this._formBuilder.group({
    preVehicle: this._businessFormGroup.vehicleAndData,
    photos: this._formBuilder.group({}),
  });
  public _sellerFormGroup: FormGroup = this._formBuilder.group({
    photos: this._formBuilder.group({}),
    seller: this._businessFormGroup.seller,
  });
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _trade: TradeService,
    private _message: MessageService,
    private _formBuilder: FormBuilder,
    private _businessFormGroup: BusinessFormGroup,
    private _localstorage: LocalstorageService,
  ) {}
  getTradeByArchiveNoComponent(trade) {
    this.businessTradeForm = trade as BusinessTradeForm;
    this._sellerFormGroup.patchValue(this.businessTradeForm.seller);
    this._vehicleFormGroup.patchValue(this.businessTradeForm.preVehicle);
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
    this.onChangeSelectedCar(tradeList[0]);
  }
  ngOnInit() {
    let trecording_trade_form = this._localstorage.get('business_trecording_trade_form') as BusinessTradeForm;
    if (trecording_trade_form) {
      this.businessTradeForm = trecording_trade_form;
    } else {
      let recording_trade_form = this._localstorage.get('business_recording_trade_form') as BusinessTradeForm;
      if (recording_trade_form) {
        this.businessTradeForm = {preVehicle: {preVehicle: {
          merchant: recording_trade_form.preVehicle.preVehicle.merchant,
        }}} as BusinessTradeForm;
      }
    }
  }
  onChangeSelectedCar(trade: BusinessTradeForm): void {
    if (null === trade) {
      this._vehicleFormGroup.reset();
      this.notNewCar = false;
      this._message.info('添加车辆', '添加新车辆');
    } else {
      this.notNewCar = true;
      console.info(trade.preVehicle);
      this._vehicleFormGroup.patchValue(trade.preVehicle);
      this._message.info('查看车辆', trade.preVehicle.preVehicle.plateNumber);
    }
  }
  onSubmit() {
    console.info(this.tradeList.length);
    console.info(this.tradeList);
    /**
     * 过户录入，所有车辆
     */
    this._localstorage.set('business_trecording_trade_form', this.businessTradeForm);
    if (1 > this.tradeList.length) {
      this._message.warning('错误提示', '请选择至少一个车辆。');
    } else {
      // this._localstorage.set(this._cache_pre + 'trade', this.tradeList);
      this._router.navigateByUrl('/pages/business/transfer/trecording2');
    }
  }
}
