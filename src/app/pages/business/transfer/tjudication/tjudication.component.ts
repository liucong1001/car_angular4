import { Component, OnInit } from '@angular/core';
import {WebcamService} from '../../../../@core/device/webcam.service';
import {CarModel} from '../../../../@core/model/business/car.model';
import {Router} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BusinessFormGroup} from "../../business.form-group";
import {Marketphotomap} from "../../../../@core/model/system/market-photo-map";

@Component({
  selector: 'ngx-tjudication',
  templateUrl: './tjudication.component.html',
  styleUrls: ['./tjudication.component.scss'],
})
export class TjudicationComponent implements OnInit {
  private _cache_pre = 'business_transfer_judication_';
  public archiveNo = '201803090001020004';
  public trade: TradeForm;
  public tradeList: [TradeForm];
  public test= '';
  vehicleCertificateFormConfig: Marketphotomap;
  public _formGroup: FormGroup = this._formBuilder.group({
    vehicle: this._businessFormGroup.vehicle,
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
  ) {}
  ngOnInit(): void {
    let maybe_archiveNo = this._localstorage.get(this._cache_pre + 'archiveNo');
    console.info('maybe_archiveNo', maybe_archiveNo);
    if (maybe_archiveNo) {
      this.archiveNo = maybe_archiveNo;
    }
    /**
     * 卖家证件类型表单配置
     * @type {{}}
     */
    this.vehicleCertificateFormConfig = {
      isApp: '0',
      // certificateCode: '00', // 证件类型代码集 // 只要符合表单就行
      business: '01', //  01 预审  02 过户
      formName: '过户录入车辆', // 表单名称
    } as Marketphotomap;
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
  getTradeByArchiveNoComponent(trade) {
    this.trade = trade;
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
  }

  reBack() {
    console.info('reback');
    // this._router.navigateByUrl('/pages/business/transfer/trecording-last');
  }
  onSubmit() {
    console.info('onSubmit');
    console.info(this.judicationTrade.length);
    console.info(this.judicationTrade);
    this._localstorage.set(this._cache_pre + 'archiveNo', this.trade.transfer.business.archiveNo);
    if (1 > this.judicationTrade.length) {
      this._message.warning('错误提示', '请选择至少一个车辆。');
    } else {
      this._localstorage.set(this._cache_pre + 'trade', this.judicationTrade);
      this._router.navigateByUrl('/pages/business/transfer/tjudication-photo');
    }
  }
}
