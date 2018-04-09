import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TradeForm} from '../../../model/business/trade/trade.form';
import {MessageService} from '../../../utils/message.service';
import {TransferService} from '../../../data/business/transfer.service';
import {FilingInfoModel} from '../../../model/business/filing.info.model';
import {FilingService} from '../../../data/merchant/filing.service';
import {MerchantModel} from '../../../model/business/merchant.model';

@Component({
  selector: 'ngx-archive-no-vehicle',
  templateUrl: './archive-no-vehicle.component.html',
  styleUrls: ['./archive-no-vehicle.component.scss'],
})
export class ArchiveNoVehicleComponent implements OnInit {
  @Input() archiveNo = '';
  @Input() pageTitle = '';
  @Input() canEdit = false;
  @Input() showSelectBtn = true;
  @Input() prompt? = ''; // 组件显示窗底部的备注，说明文字
  @Input() autoinput_shanghu_source_url = '/rest/merchant/list/';
  @Output('_tradeList') private _tradeList = new EventEmitter();
  @Output('_trade') private _trade = new EventEmitter();
  public trade: TradeForm = {
    preVehicle: {
      preVehicle: {
        merchant: {},
        filingInfo: {},
      },
    },
  };
  public tradeList: [TradeForm];
  constructor(
    private _message: MessageService,
    private _transferService: TransferService,
    private _filingService: FilingService,
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
  public getTradeByArchiveNo(archiveNo) {
    this._transferService.selectCar(archiveNo).then(res => {
      let trade = res as TradeForm;
      this.tradeList = [trade] as [TradeForm];
      // console.info('trade[0]', this.tradeList[0]);
      /**
       * 设置好交易信息，默认商户会自动完成
       * @type {TradeForm}
       */
      this.trade = this.tradeList[0] as TradeForm;
      console.info('trade', this.trade);
      this._filingService.agency(trade.preVehicle.preVehicle.merchant.id).then(filingInfo => {
        /**
         * 标注商户已选好
         * 设置好默认代办人
         * @type {boolean}
         */
        this.merchantIsOk = true;
        this.filingInfo = trade.preVehicle.preVehicle.filingInfo;
        this.filingInfoData = filingInfo as FilingInfoModel[];
      });
      // console.info('trade as result', this.trade);
      this._tradeList.emit(this.tradeList);
      this._trade.emit(this.trade);
    }).catch(e => {
      const error = e;
      this._message.info('操作提示', error.message);
    });
  }

  merchant: MerchantModel = {};
  merchantIsOk = false;
  filingInfoData: FilingInfoModel[] = [];
  filingInfo: FilingInfoModel = {};
  filingInfoSelected: FilingInfoModel = {};

  /**
   * 选择好了商户的事件
   * @param merchant
   */
  getSelectedMerchant(merchant) {
    this.merchant = merchant;
    this._message.info('获取商户', merchant.name);
    this._filingService.agency(merchant.id).then(res => {
      this.merchantIsOk = true;
      this.filingInfo = ''; // 使 --请选择--  选项高亮
      this.filingInfoData = res as FilingInfoModel[];
    });
  }
  /**
   * 选择好了联系人的事件
   * @param event
   * @param value
   */
  filingInfoSelecteFunc() {
    this.filingInfoSelected = this.filingInfo;
  }
  /**
   * 联系人匹配函数
   * @param {FilingInfoModel} filingInfo1
   * @param {FilingInfoModel} filingInfo2
   * @returns {boolean | boolean}
   */
  filingInfoCompareWithFunc(filingInfo1: FilingInfoModel, filingInfo2: FilingInfoModel) {
    return (filingInfo1 && filingInfo2) ? filingInfo1.phone === filingInfo2.phone : false;
  }
}
