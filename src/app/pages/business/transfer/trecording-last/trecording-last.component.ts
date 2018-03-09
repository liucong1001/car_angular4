import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';

@Component({
  selector: 'ngx-trecording-last',
  templateUrl: './trecording-last.component.html',
  styleUrls: ['./trecording-last.component.scss'],
})
export class TrecordingLastComponent implements OnInit {
  private _cache_pre = 'business_transfer_recording_';
  new_transfer_trade: TradeForm;
  constructor(
    private _localstorage: LocalstorageService,
    private _router: Router,
  ) {}
  ngOnInit() {
    /**
     * 处理缓存数据
     * @type {any | any}
     */
    let maybe_transfer_trade = this._localstorage.get(this._cache_pre + 'transfer_trade');
    if (maybe_transfer_trade) {
      this.new_transfer_trade = maybe_transfer_trade as TradeForm;
    }
  }
  toPrint() {
  }
  onJudication() {
    this._router.navigateByUrl('/pages/business/transfer/tjudication');
  }
}
