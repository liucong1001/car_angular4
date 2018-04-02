import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {TradeService} from '../../../../@core/data/business/trade.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {BusinessFormGroup} from '../../business.form-group';

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
  private _cache_pre = 'business_prejudication_recording_';
  vehicleCertificateFormConfig: Marketphotomap;
  public archiveNo = '';
  public trade: TradeForm;
  public tradeList: [TradeForm];
  public _formGroup: FormGroup = this._formBuilder.group({
    vehicle: this._businessFormGroup.vehicle,
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
  ) {}
  ngOnInit(): void {
    this._route.params.subscribe(param => {
      if (param.archiveNo) {
        this.archiveNo = param.archiveNo;
      }
    });
    if (! this.archiveNo) {
      let maybe_continue_archiveNo = this._localstorage.get(this._cache_pre + 'judication_archiveNo');
      if (maybe_continue_archiveNo) {
        this.archiveNo = maybe_continue_archiveNo;
      }
    }
    /**
     * 卖家证件类型表单配置
     * @type {{}}
     */
    this.vehicleCertificateFormConfig = {
      // certificateCode: '00', // 证件类型代码集 // 只要符合表单就行
      formName: '预审录入车辆', // 表单名称
    } as Marketphotomap;
  }
  onSubmit() {
    console.info(this.judicationTrade.length);
    console.info(this.judicationTrade);
    this._localstorage.set(this._cache_pre + 'judication_archiveNo', this.trade.prejudication.business.archiveNo);
    if (1 > this.judicationTrade.length) {
      this._message.warning('错误提示', '请选择至少一个车辆。');
    } else {
      this._localstorage.set(this._cache_pre + 'judication_trade', this.judicationTrade);
      this._router.navigateByUrl('/pages/business/prejudication/judication-photo');
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
    if (null === trade) {
      this._formGroup.reset();
      this._message.info('添加车辆', '添加新车辆');
    } else {
      this._formGroup.patchValue({vehicle: trade.preVehicle.preVehicle});
      this._message.info('查看车辆', trade.preVehicle.preVehicle.plateNumber);
    }
  }
  public judicationTrade: TradeForm[] = [];
  onChangeCheckCars(trades): void {
    this.judicationTrade = trades;
  }
}
