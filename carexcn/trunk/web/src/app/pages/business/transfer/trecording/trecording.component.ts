import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TradeService} from '../../../../@core/data/business/trade.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {BusinessFormGroup} from '../../business.form-group';

@Component({
  selector: 'ngx-ys-trecording',
  templateUrl: './trecording.component.html',
  styleUrls: ['./trecording.component.scss'],
})
export class TrecordingComponent implements OnInit {
  private _cache_pre = 'business_transfer_recording_';
  public archiveNo = '';
  public trade: TradeForm;
  public tradeList: [TradeForm];
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
    this.trade = trade;
    this._sellerFormGroup.patchValue(this.trade.seller);
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
    this.onChangeSelectedCar(tradeList[0]);
  }
  ngOnInit() {
    let maybe_continue_archiveNo = this._localstorage.get(this._cache_pre + 'archiveNo');
    if (maybe_continue_archiveNo) {
      this.archiveNo = maybe_continue_archiveNo;
    }
  }
  onChangeSelectedCar(trade: TradeForm): void {
    if (null === trade) {
      this._vehicleFormGroup.reset();
      // this.notNewCar = false;
      this._message.info('添加车辆', '添加新车辆');
    } else {
      // this.notNewCar = true;
      console.info(trade.preVehicle);
      this._vehicleFormGroup.patchValue({vehicle: trade.preVehicle});
      this._message.info('查看车辆', trade.preVehicle.preVehicle.plateNumber);
    }
  }
  onSubmit() {
    console.info(this.tradeList.length);
    console.info(this.tradeList);
    this._localstorage.set(this._cache_pre + 'archiveNo', this.trade.archiveNo);
    if (1 > this.tradeList.length) {
      this._message.warning('错误提示', '请选择至少一个车辆。');
    } else {
      this._localstorage.set(this._cache_pre + 'trade', this.tradeList);
      this._router.navigateByUrl('/pages/business/transfer/trecording2');
    }
  }
}
