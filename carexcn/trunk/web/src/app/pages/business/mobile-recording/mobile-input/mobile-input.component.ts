import {Component, OnInit} from '@angular/core';
import {TradeService} from '../../../../@core/data/business/trade.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {MobileRecordingService} from '../../../../@core/data/business/mobile-recording.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BusinessFormGroup} from '../../business.form-group';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';

@Component({
  selector: 'ngx-mobile-input',
  templateUrl: './mobile-input.component.html',
  styleUrls: ['./mobile-input.component.scss'],
  providers: [TradeService, MobileRecordingService],
})
export class MobileInputComponent implements OnInit {
  /**
   * 车辆流水号
   * @type {string}
   */
  public archiveNo = '';
  /**
   * 交易表单
   */
  public trade: TradeForm;
  /**
   * 交易表单的集合
   */
  public tradeList: [TradeForm];
  public _formGroup: FormGroup = this._formBuilder.group({
    seller: this._businessFormGroup.seller,
    vehicle: this._businessFormGroup.vehicle,
  });
  vehicleCertificateFormConfig: Marketphotomap;
  sellerCertificateFormConfig: Marketphotomap;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _trade: TradeService,
    private _message: MessageService,
    private _formBuilder: FormBuilder,
    private _businessFormGroup: BusinessFormGroup,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(param => {
      if (param.archiveNo) {
        this.archiveNo = param.archiveNo;
      }
    });
    /**
     * 卖家证件类型表单配置
     * @type {{}}
     */
    this.sellerCertificateFormConfig = {
      certificateCode: '00', // 证件类型代码集
      formName: '预审录入卖家', // 表单名称
    } as Marketphotomap;
    /**
     * 车辆证件类型表单配置
     * @type {Marketphotomap}
     */
    this.vehicleCertificateFormConfig = {
      // certificateCode: '00', // 证件类型代码集 // 只要符合表单就行
      formName: '预审录入车辆', // 表单名称
    } as Marketphotomap;
  }

  onChangeSelectedCar(trade: TradeForm): void {
    if (null === trade) {
      this._formGroup.reset();
      this._message.info('添加车辆', '添加新车辆');
    } else {
      this._formGroup.patchValue({vehicle: trade.preVehicle.preVehicle});
      this._message.info('查看车辆', trade.preVehicle.preVehicle.plateNumber);
    }
  }

  getTradeByArchiveNoComponent(trade) {
    this.trade = trade;
    this._formGroup.controls.seller.patchValue(this.trade.seller.seller);
  }

  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
    this.onChangeSelectedCar(tradeList[0]);
  }
}
