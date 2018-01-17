import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TradeForm} from '../../../model/bussiness/trade/trade.form';
import {PrejudicationService} from '../../../data/bussiness/prejudication.service';
import {MessageService} from '../../../utils/message.service';

@Component({
  selector: 'ngx-ys-archive-no',
  templateUrl: './archive-no.component.html',
  styleUrls: ['./archive-no.component.scss'],
})
export class ArchiveNoComponent implements OnInit {
  @Input() archiveNo = '';
  @Input() pageTitle = '';
  @Input() canEdit = false;
  @Input() prompt? = '';
  @Output('_tradeList') private _tradeList = new EventEmitter();
  @Output('_trade') private _trade = new EventEmitter();
  public trade: TradeForm = {
    prejudication: {business: {archiveNo: '201801160001010002'}},
    preVehicle: {preVehicle: {filingInfo: {merchant: {account: {}}}}},
    seller: {seller: {}},
  };
  public tradeList: [TradeForm];
  constructor(
    private _message: MessageService,
    private _prejudicationService: PrejudicationService,
  ) { }

  ngOnInit() {
    if (this.archiveNo) {
      this.getTradeByArchiveNo(this.archiveNo);
    }
  }

  getTradeByArchiveNo(archiveNo) {
    this._prejudicationService.carList(archiveNo).then(res => {
      this.tradeList = res.json() as [TradeForm];
      this.trade = this.tradeList[0] as TradeForm;
      this._tradeList.emit(this.tradeList);
      this._trade.emit(this.trade);
    }).catch(e => {
      // console.info(e.message);
      this._message.info('操作提示', '批次号 ' + archiveNo + ' 没有查询结果。');
    });
  }

}
