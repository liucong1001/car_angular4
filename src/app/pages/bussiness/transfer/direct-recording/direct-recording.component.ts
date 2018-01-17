import { Component, OnInit } from '@angular/core';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';

@Component({
  selector: 'ngx-ys-direct-recording',
  templateUrl: './direct-recording.component.html',
  styleUrls: ['./direct-recording.component.scss'],
})
export class DirectRecordingComponent implements OnInit {
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
