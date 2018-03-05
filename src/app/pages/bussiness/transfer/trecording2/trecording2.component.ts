import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TradeService} from "../../../../@core/data/bussiness/trade.service";
import {FormBuilder} from "@angular/forms";
import {LocalstorageService} from "../../../../@core/cache/localstorage.service";
import {MessageService} from "../../../../@core/utils/message.service";
import {TradeForm} from "../../../../@core/model/bussiness/trade/trade.form";
import {Marketphotomap} from "../../../../@core/model/system/market-photo-map";

@Component({
  selector: 'ngx-trecording2',
  templateUrl: './trecording2.component.html',
  styleUrls: ['./trecording2.component.scss'],
})
export class Trecording2Component implements OnInit {
  private _cache_pre = 'bussiness_transfer_recording_';
  vehicleCertificateFormConfig: Marketphotomap;
  sellerCertificateFormConfig: Marketphotomap;
  public archiveNo = '';
  public trade: TradeForm;
  public tradeList: [TradeForm];
  constructor(
    private _router: Router,
    private _trade: TradeService,
    private _message: MessageService,
    private _formBuilder: FormBuilder,
    private _localstorage: LocalstorageService,
  ) { }
  getTradeByArchiveNoComponent(trade) {
    this.trade = trade;
    // this._formGroup.controls.seller.patchValue(this.trade.seller.seller);
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
    // this.onChangeSelectedCar(tradeList[0]);
  }

  ngOnInit() {
    let maybe_continue_archiveNo = this._localstorage.get(this._cache_pre + 'archiveNo');
    if (maybe_continue_archiveNo) {
      this.archiveNo = maybe_continue_archiveNo;
    }
  }
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/transfer/trecording-last');
  }

}
