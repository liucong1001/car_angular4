import { Component, OnInit } from '@angular/core';
import {WebcamService} from '../../../../@core/device/webcam.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BusinessFormGroup} from '../../business.form-group';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {BusinessTradeViewForm} from '../../../../@core/model/business/restruct/business.trade.view.form';
import {CurrentMarketConfModel, CurrentMarketService} from '../../../../@core/data/current-market.service';
import {BusinessTradeForm} from '../../../../@core/model/business/restruct/business.trade.form';

@Component({
  selector: 'ngx-tjudication',
  templateUrl: './tjudication.component.html',
  styleUrls: ['./tjudication.component.scss'],
})
export class TjudicationComponent implements OnInit {
  public batchNo = '';
  public businessTradeForm: BusinessTradeForm = {preVehicle: {preVehicle: {}}};
  public trade: TradeForm;
  public tradeList: [TradeForm];
  public test= '';
  public _formGroupVehicle: FormGroup = this._formBuilder.group({
    preVehicle: this._businessFormGroup.vehicle,
    photos: this._formBuilder.group({}),
  });
  public _formGroupTransferVehicle: FormGroup = this._formBuilder.group({
    photos: {},
    transferVehicle: this._businessFormGroup.vehicleTransfer,
  });
  /**
   * 数据初始化
   * @param {MessageService} message
   * @param {CarService} carService
   * @param {WebcamService} webcam
   * @param {Router} _router
   */
  constructor(
    private _message: MessageService,
    private _localstorage: LocalstorageService,
    private _formBuilder: FormBuilder,
    private _businessFormGroup: BusinessFormGroup,
    private _router: Router,
    private _route: ActivatedRoute,
    private _currentMarket: CurrentMarketService,
  ) {}
  ngOnInit(): void {
    this._route.params.subscribe(param => {
      if (param.batchNo) {
        this.batchNo = param.batchNo;
      }
    });
  }
  onChangeSelected(trade: TradeForm): void {
    if (null === trade) {
      this._formGroupVehicle.reset();
      this._message.info('添加车辆', '添加新车辆');
    } else {
      this._formGroupVehicle.patchValue(trade.preVehicle);
      this._formGroupTransferVehicle.patchValue(trade.transferVehicle);
      this._message.info('查看车辆', trade.preVehicle.preVehicle.plateNumber);
    }
  }
  public judicationTrade: TradeForm[] = [];
  onChangeCheckCars(trades): void {
    this.judicationTrade = trades;
  }
  getTradeByArchiveNoComponent(trade) {
    this.trade = trade;
    this.businessTradeForm = trade as BusinessTradeForm;
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
  }

  reBack() {
    console.info('reback');
    // this._router.navigateByUrl('/pages/business/transfer/trecording-last');
  }
  onSubmit() {
    this._localstorage.set('business_tjudication_doing_trade_form', this.trade);
    if (1 > this.judicationTrade.length) {
      this._message.warning('错误提示', '请选择至少一个车辆。');
    } else {
      let review_ids = [];
      for (let tmp in this.judicationTrade) {
        if (this.judicationTrade[tmp]) {
          let trade = this.judicationTrade[tmp] as TradeForm;
          review_ids.push(trade.transfer.id);
        }
      }
      this._currentMarket.getCurrentMarketInfo().then(marketObj => {
        let marketObject = marketObj as CurrentMarketConfModel;
        this._localstorage.set('business_tjudication_doing_trade_view_form', {
          cloudUser: marketObject.market.cloudUser,
          transferBatchNo: this.businessTradeForm.transfer.batchNo,
          buyer: {buyer: this.businessTradeForm.buyer.buyer},
          tradeIds: review_ids,
        } as BusinessTradeViewForm);
        console.info('business_tjudication_doing_trade_view_form', {
          cloudUser: marketObject.market.cloudUser,
          transferBatchNo: this.businessTradeForm.transfer.batchNo,
          buyer: {buyer: this.businessTradeForm.buyer.buyer},
          tradeIds: review_ids,
        });
        console.info('business_tjudication_doing_trade_view_form2', {
          cloudUser: marketObject.market.cloudUser,
          transferBatchNo: this.businessTradeForm.transfer.batchNo,
          buyer: {buyer: this.businessTradeForm.buyer.buyer},
          tradeIds: review_ids,
        }as BusinessTradeViewForm);
        this._router.navigateByUrl('/pages/business/transfer/tjudication-photo');
      }).catch(e => {
        console.info(e);
      });
    }
  }
}
