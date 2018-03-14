import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TradeForm} from '../../../model/business/trade/trade.form';
import {PrejudicationService} from '../../../data/business/prejudication.service';
import {MessageService} from '../../../utils/message.service';
import {TransferService} from '../../../data/business/transfer.service';

@Component({
  selector: 'ngx-ys-archive-no-transfer',
  templateUrl: './archive-no-transfer.component.html',
  styleUrls: ['./archive-no-transfer.component.scss'],
})
export class ArchiveNoTransferComponent implements OnInit {
  @Input() archiveNo = '';
  @Input() pageTitle = '';
  @Input() canEdit = false;
  @Input() prompt? = '';
  @Output('_tradeList') private _tradeList = new EventEmitter();
  @Output('_trade') private _trade = new EventEmitter();
  public trade: TradeForm;
  public tradeList: [TradeForm];
  constructor(
    private _message: MessageService,
    private _prejudicationService: PrejudicationService,
    private _transferService: TransferService,
  ) { }

  ngOnInit() {
    if (this.archiveNo) {
      this.getTradeByArchiveNo(this.archiveNo);
    } else {
      this.trade = {
        transfer: {
          business: {},
        },
        transferVehicle: {
          transferVehicle: {
            merchant: {},
            filingInfo: {},
          },
        },
      };
    }
  }

  /**
   * 根据预审批次号获取预审业务对象(拿到车辆列表)
   * @param archiveNo 预审业务流水号(预审批次号)
   */
  getTradeByArchiveNo(archiveNo) {
    this._transferService.carList(archiveNo).then(res => {
      this.tradeList = res as [TradeForm];
      // console.info('trade[0]', this.tradeList[0]);
      this.trade = this.tradeList[0] as TradeForm;
      // console.info('trade as result', this.trade);
      this._tradeList.emit(this.tradeList);
      this._trade.emit(this.trade);
    }).catch(e => {
      const error = e;
      this._message.info('操作提示', error.message);
    });
  }

}
