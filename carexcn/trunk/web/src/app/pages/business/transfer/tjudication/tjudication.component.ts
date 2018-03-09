import { Component, OnInit } from '@angular/core';
import {WebcamService} from '../../../../@core/device/webcam.service';
import {CarModel} from '../../../../@core/model/business/car.model';
import {Router} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';

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
  /**
   * 车辆单辆数据
   */
  public carData: CarModel = new CarModel();
  /**
   * 车辆多辆数据集
   */
  public carsData: CarModel[];
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
    private _router: Router,
  ) {}
  ngOnInit(): void {
    let maybe_archiveNo = this._localstorage.get(this._cache_pre + 'archiveNo');
    console.info('maybe_archiveNo', maybe_archiveNo);
    if (maybe_archiveNo) {
      this.archiveNo = maybe_archiveNo;
    }
  }
  onSubmit() {
    console.info('onSubmit');
    this._localstorage.set(this._cache_pre + 'archiveNo', this.trade.archiveNo);
    // this._router.navigateByUrl('/pages/business/transfer/tjudication-phone');
  }
  reBack() {
    console.info('reback');
    // this._router.navigateByUrl('/pages/business/transfer/trecording-last');
  }
  getTradeByArchiveNoComponent(trade) {
    this.trade = trade;
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
  }

}
