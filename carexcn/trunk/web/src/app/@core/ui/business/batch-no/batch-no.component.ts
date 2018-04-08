import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransferService} from '../../../data/business/transfer.service';
import {PrejudicationService} from '../../../data/business/prejudication.service';
import {MessageService} from '../../../utils/message.service';
import {BusinessTradeForm} from '../../../model/business/restruct/business.trade.form';
import {TradeForm} from "../../../model/business/trade/trade.form";

@Component({
  selector: 'ngx-ys-batch-no',
  templateUrl: './batch-no.component.html',
  styleUrls: ['./batch-no.component.scss'],
})
export class BatchNoComponent implements OnInit {
  /**
   * 批次号
   * @type {string}
   */
  @Input() batchNo? = '';
  /**
   * 批次号类型
   * pre (default)
   * trans
   * @type {string}
   */
  @Input() batchNoType? = '';
  @Input() pageTitle = '';
  @Input() canEdit = false;
  @Input() prompt? = '';
  @Output('_tradeList') private _tradeList = new EventEmitter();
  @Output('_trade') private _trade = new EventEmitter();

  public trade: BusinessTradeForm = {
    prejudication: {batchNo: ''},
    transfer: {batchNo: ''},
    preVehicle: {preVehicle: {
        filingInfo: {},
        merchant: {},
      }},
    seller: {seller: {}},
  };
  public tradeList: [BusinessTradeForm];

  constructor(
    private _message: MessageService,
    private _prejudicationService: PrejudicationService,
    private _transferService: TransferService,
  ) { }

  ngOnInit() {
    if ('trans' === this.batchNoType) {
      this.getTradeByTransBatchNo(this.batchNo);
    } else {
      this.getTradeByBatchNo(this.batchNo);
    }
  }

  /**
   * 根据预审批次号获取预审业务对象(拿到车辆列表)
   * @param archiveNo 预审业务流水号(预审批次号)
   */
  getTradeByBatchNo(batchNo: string) {
    this._prejudicationService.carList(batchNo).then(res => {
      this.tradeList = res as [BusinessTradeForm];
      if (this.tradeList) {
        this.trade = this.tradeList[0] as BusinessTradeForm;
        this._tradeList.emit(this.tradeList);
        this._trade.emit(this.trade);
      }
      console.info('this.trade', this.trade);
    }).catch(e => {
      const error = e;
      this._message.info('操作提示', error.message);
    });
  }

  /**
   * 根据过户批次号获取过户业务对象(拿到车辆列表)
   * @param archiveNo 过户业务流水号(过户批次号)
   */
  getTradeByTransBatchNo(tbatchNo: string) {
    this._transferService.carList(tbatchNo).then(res => {
      this.tradeList = res as [BusinessTradeForm];
      if (this.tradeList) {
        this.trade = this.tradeList[0] as BusinessTradeForm;
        this._tradeList.emit(this.tradeList);
        this._trade.emit(this.trade);
      }
    }).catch(e => {
      const error = e;
      this._message.info('操作提示', error.message);
    });
  }
}
