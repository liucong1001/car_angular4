import {Component, Input, OnInit} from '@angular/core';
import {SellerModel} from '../../../model/bussiness/seller.model';
import {FilingService} from '../../../data/merchant/filing.service';
import {LocalstorageService} from '../../../cache/localstorage.service';
import {MerchantModel} from '../../../model/bussiness/merchant.model';
import {Codeitem} from '../../../model/system/codeitem';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-ys-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.scss'],
})
export class SellerInfoComponent implements OnInit {
  /**
   * 拍照上传按钮是否显示
   * @type {boolean}
   */
  @Input() btn_show = true;
  @Input() merchant: MerchantModel;
  @Input() CERTIFICATE_TYPE_LIST: Codeitem[];
  public ifTrusteeType = false;
  public autoinput_cheshang_source_url = '/rest/merchant/filing/deal/';
  /**
   * 车商搜索资源
   * @type {string}
   */
  SellerIdcardData: SellerModel = {};
  seller: SellerModel = {};
  photos: any[] = [{
    title: '身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '身份证反面',
    source: 'assets/images/camera2.jpg',
  }];
  _formGroup: FormGroup = this.fb.group({
    certType: ['', [Validators.required]],
    certCode: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(64)]],
    endDate: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    trusteeType: ['0', [Validators.required]],
    address: ['', [Validators.required]],
    // Trustee: ['', [Validators.required]],
    // flag: ['', [Validators.required]],
  });
  cheshang = '';
  public certificateType: Codeitem;
  constructor(
    private _localstorage: LocalstorageService,
    private fb: FormBuilder,
    private _filingService: FilingService,
  ) {
    /**
     * 缓存前缀名以业务为单位，一个缓存前缀对应一个业务，一个缓存业务完成则删除该前缀的所有缓存
     * @type {string}
     */
    this._localstorage.prefix = 'bussiness_prejudication_recording';
  }

  ngOnInit() {
    this.autoinput_cheshang_source_url += this.merchant.id + '/';
  }
  certificateTypeSelecteFunc(event) {
    console.info(this.merchant);
    console.info(event);
    console.info(this.certificateType);
  }

  /**
   * 证件类型匹配函数
   * @param {Codeitem} code1
   * @param {Codeitem} code2
   * @returns {boolean | boolean}
   */
  certificateTypeCompareWithFunc(code1: Codeitem, code2: Codeitem) {
    return (code1 && code2) ? code1.code === code2.code : false;
  }
  getSelectedCheshang(value) {
    console.info(value);
    // this._filingService.deal(this.merchant.id).then(res => {
    //   console.info(res);
    // });
  }
}
