import {Component, Input, OnInit} from '@angular/core';
import {TradeService} from '../../../../@core/data/business/trade.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {MobileService} from '../../../../@core/data/business/mobile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BusinessFormGroup} from '../../business.form-group';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';


@Component({
  selector: 'ngx-mobile-review',
  templateUrl: './mobile-review.component.html',
  styleUrls: ['./mobile-review.component.scss'],
  providers: [TradeService, MobileService],
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
      isApp: '0',
      certificateCode: '00', // 证件类型代码集
      business: '01', //  01 预审  02 过户
      formName: '预审录入卖家', // 表单名称
    } as Marketphotomap;
    /**
     * 车辆证件类型表单配置
     * @type {Marketphotomap}
     */
    this.vehicleCertificateFormConfig = {
      isApp: '0',
      // certificateCode: '00', // 证件类型代码集 // 只要符合表单就行
      business: '01', //  01 预审  02 过户
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

  // form: FormGroup = this.fb.group({
  //   cloudUser: ['0001'],
  //   archiveNo: ['', [Validators.required]],
  //   type: [''],
  //   photoCodes: ['', [Validators.required, Validators.maxLength(2)]],
  //   reason: ['第一张照片不符合要求', [Validators.required]],
  // });



  // back() {
  //    console.log('打回对象', this.form.value);
  //   this.mobileService.back(this.form.value).then(res => {
  //     this.message.success('', '回退成功!');
  //   });
  //   //   .catch(err=>{
  //   //   this.message.error('回退失败',err.json().message);
  //   // })
  // }
  // startInput(){
  //   this.router.navigate( ['/pages/business/mobile-recording/input', { archiveNo: this.archiveNo }]);
  // }


}