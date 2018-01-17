import { Component, OnInit } from '@angular/core';
import {TradeForm} from '../../../@core/model/bussiness/trade/trade.form';

@Component({
  selector: 'ngx-ys-mobile-recording',
  templateUrl: './mobile-recording.component.html',
  styleUrls: ['./mobile-recording.component.scss'],
})
export class MobileRecordingComponent implements OnInit {
  public archiveNo = '';
  public trade: TradeForm;
  public tradeList: [TradeForm];
  constructor() { }

  ngOnInit() {
  }
  getTradeByArchiveNoComponent(trade) {
    this.trade = trade;
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
  }

}
