import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TradeForm} from '../../../model/bussiness/trade/trade.form';
import {MessageService} from '../../../utils/message.service';
import {TransferService} from '../../../data/bussiness/transfer.service';

@Component({
  selector: 'ngx-archive-no-vehicle',
  templateUrl: './archive-no-vehicle.component.html',
  styleUrls: ['./archive-no-vehicle.component.scss'],
})
export class ArchiveNoVehicleComponent implements OnInit {
  @Input() archiveNo = '';
  @Input() pageTitle = '';
  @Input() canEdit = false;
  @Input() prompt? = '';
  @Output('_tradeList') private _tradeList = new EventEmitter();
  @Output('_trade') private _trade = new EventEmitter();
  public trade: TradeForm = {
    prejudication: {business: {archiveNo: ''}},
    preVehicle: {preVehicle: {
        filingInfo: {},
        merchant: {},
      }},
    seller: {seller: {}},
  };
  public tradeList: [TradeForm];
  constructor(
    private _message: MessageService,
    private _transferService: TransferService,
  ) { }

  ngOnInit() {
    if (this.archiveNo) {
      this.getTradeByArchiveNo(this.archiveNo);
    }
  }

  /**
   * 根据车辆流水号获取预审业务对象(拿到车辆列表)
   * @param archiveNo 预审业务流水号(预审批次号)
   */
  getTradeByArchiveNo(archiveNo) {
    this._transferService.selectCar(archiveNo).then(res => {
      let trade = res as TradeForm;
      this.tradeList = [trade] as [TradeForm];
      console.info('trade[0]', this.tradeList[0]);
      this.trade = this.tradeList[0] as TradeForm;
      console.info('trade as result', this.trade);
      this._tradeList.emit(this.tradeList);
      this._trade.emit(this.trade);
    }).catch(e => {
      const error = e;
      this._message.info('操作提示', error.message);
    });
  }
}
