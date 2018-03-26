import {Component, Input, OnInit} from '@angular/core';
import {TradeService} from '../../../../@core/data/business/trade.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {MobileRecordingService} from '../../../../@core/data/business/mobile-recording.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BusinessFormGroup} from '../../business.form-group';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';


@Component({
  selector: 'ngx-mobile-review',
  templateUrl: './mobile-review.component.html',
  styleUrls: ['./mobile-review.component.scss'],
  providers: [TradeService, MobileRecordingService],
})
export class MobileReviewComponent implements OnInit {
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
  public objectKeys = Object.keys;
  public _formGroup: FormGroup = this._formBuilder.group({
    // seller: this._businessFormGroup.seller,
    // vehicle: this._businessFormGroup.vehicle,
    seller_photos_: new FormGroup({}),
    // seller_reviewPhotos_: new FormGroup({}),
    seller_trusteePhotos_: new FormGroup({}),
    preVehicle_photos_: new FormGroup({}),
    buyer_photos_: new FormGroup({}),
    // buyer_reviewPhotos_: new FormGroup({}),
    buyer_trusteePhotos_: new FormGroup({}),
    transferVehicle_photos_: new FormGroup({}),
  });
  /**
   * 车辆证件类型表单配置
   *  isApp    // 是否APP
   *  certificateCode // 证件类型代码集 // 只要符合表单就行
   *  business // 证件类型代码集 // 只要符合表单就行
   *  formName // 预审录入车辆', // 表单名称
   * @type {{}}
   */
  preVehicleCertConf: Marketphotomap = {isApp: '0', business: '01', formName: '预审录入车辆'} as Marketphotomap;
  transferVehicleCertConf: Marketphotomap = {isApp: '0', business: '01', formName: '过户录入车辆'} as Marketphotomap;
  buyerCertConf: Marketphotomap = {isApp: '0', business: '01', formName: '预审录入买家'} as Marketphotomap;
  sellerCertConf: Marketphotomap = {isApp: '0', business: '01', formName: '预审录入卖家'} as Marketphotomap;
  buyerTrusteeCertConf: Marketphotomap = {isApp: '0', business: '01', formName: '预审录入买家委托人'} as Marketphotomap;
  sellerTrusteeCertConf: Marketphotomap = {isApp: '0', business: '01', formName: '预审录入卖家委托人'} as Marketphotomap;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _trade: TradeService,
    private _message: MessageService,
    private _formBuilder: FormBuilder,
    // private _businessFormGroup: BusinessFormGroup,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(param => {
      if (param.archiveNo) {
        this.archiveNo = param.archiveNo;
      }
    });
  }
  photoForCertificateTypeReady = false;
  setPhotosCertificateTypeReady() {
    // 车辆照片，无所谓证件类型，车辆要拍的照片与车辆无关与市场有关，只关联市场配置。
    if ( this.trade.seller ) {
      this.sellerCertConf.certificateCode = this.trade.seller.seller.certType;
    }
    if ( this.trade.buyer ) {
      this.buyerCertConf.certificateCode = this.trade.buyer.buyer.certType;
    }
    this.photoForCertificateTypeReady = true;
  }

  getTradeByArchiveNoComponent(trade) {
    this.trade = trade as TradeForm;
    console.info('trade', trade);
    this.setPhotosCertificateTypeReady();
    // this._formGroup.controls.seller.patchValue(this.trade.seller.seller);
  }
  reason = '';
  back() {
     console.info('打回对象', this._formGroup.value);
     console.info('打回原因', this.reason);
    // this.mobileinfoService.back(this._formGroup.value).then(res => {
    //   this.message.success('', '回退成功!');
    // });
    //   .catch(err=>{
    //   this.message.error('回退失败',err.json().message);
    // })
  }
  startInput() {
    console.info('startInput');
    // this.router.navigate( ['/pages/business/mobile-recording/input', { archiveNo: this.archiveNo }]);
  }


}
