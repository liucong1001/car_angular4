import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransferService} from '../../../data/business/transfer.service';
import {PrejudicationService} from '../../../data/business/prejudication.service';
import {MessageService} from '../../../utils/message.service';
import {BusinessTradeForm} from '../../../model/business/restruct/business.trade.form';

@Component({
  selector: 'ngx-ys-batch-no',
  templateUrl: './batch-no.component.html',
  styleUrls: ['./batch-no.component.scss'],
})
export class BatchNoComponent implements OnInit {

  @Input() batchNo = '';
  @Input() pageTitle = '';
  @Input() canEdit = false;
  @Input() prompt? = '';
  @Output('_tradeList') private _tradeList = new EventEmitter();
  @Output('_trade') private _trade = new EventEmitter();

  public trade: BusinessTradeForm = {
    prejudication: {batchNo: ''},
    // prejudication: {business: {archiveNo: ''}},
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
    if (this.batchNo) {
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
      this.trade = this.tradeList[0] as BusinessTradeForm;
      this._tradeList.emit(this.tradeList);
      this._trade.emit(this.trade);
    }).catch(e => {
      const error = e;
      this._message.info('操作提示', error.message);
    });
  }

}
