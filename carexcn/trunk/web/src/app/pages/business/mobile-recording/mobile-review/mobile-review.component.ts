import {Component, Input, OnInit} from '@angular/core';
import {TradeService} from '../../../../@core/data/business/trade.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {MobileRecordingService} from '../../../../@core/data/business/mobile-recording.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BusinessFormGroup} from '../../business.form-group';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {ChangeCheckedValueModel} from '../../../../@core/ui/business/dynamic-photo-form/dynamic-photo-form.component';


@Component({
  selector: 'ngx-mobile-review',
  templateUrl: './mobile-review.component.html',
  styleUrls: ['./mobile-review.component.scss'],
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
  preVehicleCertConf: Marketphotomap = {formName: '预审录入车辆'} as Marketphotomap;
  transferVehicleCertConf: Marketphotomap = {formName: '过户录入车辆'} as Marketphotomap;
  buyerCertConf: Marketphotomap = {formName: '预审录入买家'} as Marketphotomap;
  sellerCertConf: Marketphotomap = {formName: '预审录入卖家'} as Marketphotomap;
  buyerTrusteeCertConf: Marketphotomap = {formName: '预审录入买家委托人'} as Marketphotomap;
  sellerTrusteeCertConf: Marketphotomap = {formName: '预审录入卖家委托人'} as Marketphotomap;
  /**
   * 是否允许进行勾选打回的操作
   * 为了允许查看又不让操作的情况
   * @type {boolean}
   */
  btn_show_check = false;
  /**
   * 是否声明为查看
   * @type {boolean}
   */
  btn_show_check_false_just_view = false;
  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _trade: TradeService,
              private _message: MessageService,
              private _formBuilder: FormBuilder,
              private _mobileRecord: MobileRecordingService,
              // private _businessFormGroup: BusinessFormGroup,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(param => {
      if (param.archiveNo) {
        this.archiveNo = param.archiveNo;
      }
      if (param.view) {
        this.btn_show_check_false_just_view = true;
      }
    });
  }

  photoForCertificateTypeReady = false;

  setPhotosCertificateTypeReady() {
    // 车辆照片，无所谓证件类型，车辆要拍的照片与车辆无关与市场有关，只关联市场配置。
    if (this.trade.seller) {
      this.sellerCertConf.certificateCode = this.trade.seller.seller.certType;
    }
    if (this.trade.buyer) {
      this.buyerCertConf.certificateCode = this.trade.buyer.buyer.certType;
    }
    this.photoForCertificateTypeReady = true;
  }

  getTradeByArchiveNoComponent(trade) {
    this.trade = trade as TradeForm;
    console.info('trade', trade);
    if (('05' === trade.transferStatus || '05' === trade.prejudicationStatus) && !this.btn_show_check_false_just_view) {
      this.btn_show_check = true;
    }
    this.setPhotosCertificateTypeReady();
    // this._formGroup.controls.seller.patchValue(this.trade.seller.seller);
  }

  public wrong_checked: Array<ChangeCheckedValueModel> = [];

  wrongChecked(v: ChangeCheckedValueModel) {
    if (v.status) {
      /**
       * 要添加到屏蔽项
       */
      this.wrong_checked.push(v);
    } else {
      /**
       * 如果在屏蔽项中，要移除出去
       */
      this.wrong_checked = this.wrong_checked.filter(r => r.title !== v.title);
    }
    this.reason = '';
    this.wrong_checked.forEach(r => {
      this.reason += r.title + ' 不够清晰' + '\r';
    });
  }

  reason = '';

  back() {
    console.info('回退对象', this.wrong_checked);
    console.info('回退原因', this.reason);
    this._mobileRecord.back(this._formGroup.value).then(res => {
      this._message.success('', '回退成功!');
    }).catch(err => {
      this._message.error('错误', err);
      //   this._message.error('回退失败', e.message);
    });
  }

  startInput() {
    console.info('startInput');
    // this.router.navigate( ['/pages/business/mobile-recording/input', { archiveNo: this.archiveNo }]);
  }
}
