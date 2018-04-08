import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {TradeService} from '../../../../@core/data/business/trade.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {BusinessFormGroup} from '../../business.form-group';
import {BusinessTradeForm} from '../../../../@core/model/business/restruct/business.trade.form';
import {BusinessTradeViewForm} from '../../../../@core/model/business/restruct/business.trade.view.form';
import {CurrentMarketConfModel, CurrentMarketService} from '../../../../@core/data/current-market.service';

/**
 * 预审业务 - 预审审核 - 核对信息 --—接口与页面的交互逻辑
 * 1、用户输入流水号或批次号
 * 2、通过后台接口获取该号所属所有车辆列表以及车辆详情
 * 3、加载用户选择的任一车辆详情供用户查看（不允许修改任何信息）
 * 4、用户点击审核通过后，跳转入拍照录入页面
 */
@Component({
  selector: 'ngx-judication',
  templateUrl: './judication.component.html',
  styleUrls: ['./judication.component.scss'],
})
export class JudicationComponent implements OnInit {
  public prejudicationBatchNo = '';
  public businessTradeForm: BusinessTradeForm = {preVehicle: {preVehicle: {}}};
  public trade: TradeForm;
  public tradeList: [TradeForm];
  public _vehicleFormGroup: FormGroup = this._formBuilder.group({
    preVehicle: this._businessFormGroup.vehicleAndData,
    photos: this._formBuilder.group({}),
  });
  public _sellerFormGroup: FormGroup = this._formBuilder.group({
    photos: this._formBuilder.group({}),
    seller: this._businessFormGroup.seller,
  });

  /**
   * 构造函数
   * @param {MessageService} message
   * @param {Router} _router
   * @param {ActivatedRoute} _route
   * @param {TradeService} _trade
   * @param {MessageService} _message
   * @param {FormBuilder} _formBuilder
   * @param {LocalstorageService} _localstorage
   */
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _trade: TradeService,
    private _message: MessageService,
    private _formBuilder: FormBuilder,
    private _businessFormGroup: BusinessFormGroup,
    private _localstorage: LocalstorageService,
    private currentMarket: CurrentMarketService,
  ) {}
  ngOnInit(): void {
    this._route.params.subscribe(param => {
      if (param.batchNo) {
        this.prejudicationBatchNo = param.batchNo;
      }
    });
    /**
     * 如果有缓存，则从缓存中恢复数据
     * @type {any | any}
     */
    let maybe_businessTradeForm = this._localstorage.get('business_recording_trade_form');
    if (maybe_businessTradeForm) {
      this.businessTradeForm = maybe_businessTradeForm as BusinessTradeForm;
    }
    this._sellerFormGroup.patchValue(this.businessTradeForm.seller);
    console.info('_formGroup.value', this._sellerFormGroup.value);
    this._vehicleFormGroup.patchValue(this.businessTradeForm.preVehicle);
    console.info('_formGroup.value', this._vehicleFormGroup.value);
  }
  onSubmit() {
    if (1 > this.judicationTrade.length) {
      this._message.warning('错误提示', '请选择至少一个车辆。');
    } else {
      let review_ids = [];
      for (let tmp in this.judicationTrade) {
        if (this.judicationTrade[tmp]) {
          let trade = this.judicationTrade[tmp] as TradeForm;
          review_ids.push(trade.prejudication.id);
        }
      }
      console.info('review_ids', review_ids);
      this.currentMarket.getCurrentMarketConf().then(marketObj => {
        let marketObject = marketObj as CurrentMarketConfModel;
        this._localstorage.set('business_recording_trade_view_form', {
          cloudUser: marketObject.market.cloudUser,
          seller: {seller: this.businessTradeForm.seller.seller},
          tradeIds: review_ids,
        } as BusinessTradeViewForm);
        this._router.navigateByUrl('/pages/business/prejudication/judication-photo');
      }).catch(e => {
        console.info(e);
      });
    }
  }
  reBack() {
    this._router.navigateByUrl('/pages/business/prejudication');
  }
  getTradeByArchiveNoComponent(trade) {
    this.trade = trade;
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
  }
  onChangeSelected(trade: TradeForm): void {
    // if (null === trade) {
    //   this._formGroup.reset();
    //   this._message.info('添加车辆', '添加新车辆');
    // } else {
    //   this._formGroup.patchValue({vehicle: trade.preVehicle.preVehicle});
    //   this._message.info('查看车辆', trade.preVehicle.preVehicle.plateNumber);
    // }
  }
  public judicationTrade: TradeForm[] = [];
  onChangeCheckCars(trades): void {
    this.judicationTrade = trades;
  }
}
