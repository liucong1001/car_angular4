import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Router} from '@angular/router';
import {WebcamService} from '../../../../@core/device/webcam.service';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';

@Component({
  selector: 'ngx-trecording',
  templateUrl: './trecording.component.html',
  styleUrls: ['./trecording.component.scss'],
})
export class TrecordingComponent implements OnInit {

  public archiveNo = '';
  public trade: TradeForm;
  public tradeList: [TradeForm];
  constructor(
    private _message: MessageService,
    private _webcam: WebcamService,
    private _router: Router,
  ) {
  }
  getTradeByArchiveNoComponent(trade) {
    this.trade = trade;
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
  }
  ngOnInit() {
    // this.credentials = {type: '1'};
    // this.batch = '';
    // this.read = false;
  }
  gotoNext() {
    console.info('gotoNext');
    // this._router.navigateByUrl('/pages/bussiness/transfer/trecording2');
  }
}
