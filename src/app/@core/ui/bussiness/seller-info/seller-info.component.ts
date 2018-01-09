import {Component, Input, OnInit} from '@angular/core';
import {SellerModel} from '../../../model/bussiness/seller.model';
import {MerchantModel} from '../../../model/bussiness/merchant.model';
import {Codeitem} from '../../../model/system/codeitem';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IdcardService} from '../../../device/idcard.service';
import {MessageService} from '../../../utils/message.service';

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
    private idcard: IdcardService,
    private fb: FormBuilder,
    private message: MessageService,
  ) {
  }
  subcribeToFormChanges() {
    // initialize stream
    const _formValueChanges = this._formGroup.valueChanges;
    _formValueChanges.subscribe(x => {
      if ( x.trusteeType === '1' ) {
        this.ifTrusteeType = true;
      } else {
        this.ifTrusteeType = false;
      }
      console.info(x);
    });
  }
  ngOnInit() {
    this.autoinput_cheshang_source_url += this.merchant.id + '/';
    this.subcribeToFormChanges();
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
    value.certCode = value.filingPerson.certCode;
    this._formGroup.patchValue(value);
  }
  readIdCard() {
    // this.message.info('身份证', '读取卖方身份证');
    this.idcard.prepare().then((res) => {
      // this.message.info('身份证', '初始化完毕');
      if (res) { // 初始化读卡器正常
        this.idcard.read().then((idcardData) => {
          this.message.success('身份证', '读取成功');
          console.info(idcardData);
          this._formGroup.patchValue({
            address: idcardData.Address,
            // birthday: idcardData.Birthday,
            certCode: idcardData.IdCardNo,
            name: idcardData.Name,
            // sex: idcardData.Sex,
            endDate: idcardData.UseEnd,
          });
        });
      }
    }).catch(e => {
      this.message.error('身份证', '读取身份证失败');
    });
  }
}
