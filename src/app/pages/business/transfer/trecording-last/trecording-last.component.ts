import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {BusinessTradeForm} from '../../../../@core/model/business/restruct/business.trade.form';

@Component({
  selector: 'ngx-trecording-last',
  templateUrl: './trecording-last.component.html',
  styleUrls: ['./trecording-last.component.scss'],
})
export class TrecordingLastComponent implements OnInit {
  new_transfer_trade: BusinessTradeForm;
  constructor(
    private _localstorage: LocalstorageService,
    private _router: Router,
  ) {}
  ngOnInit() {
    /**
     * 处理缓存数据
     * @type {any | any}
     */
    let trade = this._localstorage.get('business_trecorded_trade');
    if (trade) {
      this.new_transfer_trade = trade as BusinessTradeForm;
    }
  }
  toPrint() {
  }
  onJudication() {
    this._router.navigateByUrl('/pages/business/transfer/tjudication');
  }
}
