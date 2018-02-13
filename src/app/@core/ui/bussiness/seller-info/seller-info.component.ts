import {Component, Input, OnInit} from '@angular/core';
import {MerchantModel} from '../../../model/bussiness/merchant.model';
import {Codeitem} from '../../../model/system/codeitem';
import {ControlContainer, FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {IdcardService} from '../../../device/idcard.service';
import {MessageService} from '../../../utils/message.service';
import {CodeitemService} from '../../../data/system/codeitem.service';
import {ErrorMessage} from '../../valid-error/valid-error.component';
import {Marketphotomap} from '../../../model/system/market-photo-map';

@Component({
  selector: 'ngx-ys-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
})
export class SellerInfoComponent implements OnInit {
  /**
   * 拍照上传按钮是否显示
   * @type {boolean}
   */
  @Input() btn_show = true;
  /**
   * 证件表单配置
   */
  @Input() certificateFormConfig: Marketphotomap;
  /**
   * 当前商户实例
   */
  @Input() merchant: MerchantModel;
  /**
   * 证件类型清单
   */
  @Input() certType?: Codeitem[];
  /**
   * 卖家表单
   */
  @Input() seller: FormGroup;
  /**
   * 错误实例
   * @type {{}}
   */
  @Input() errors?: object = {
    certType: [
      new ErrorMessage('required', '必须填写证件类型！'),
    ],
    certCode: [
      new ErrorMessage('required', '必须填写证件号码！'),
    ],
    name: [
      new ErrorMessage('required', '必须填写姓名！'),
      new ErrorMessage('maxLength', '姓名太长了！'),
    ],
    endDate: [
      new ErrorMessage('required', '必须填写有效期！'),
    ],
    phone: [
      new ErrorMessage('required', '必须填写手机！'),
    ],
    trusteeType: [
      new ErrorMessage('required', '必须填写是否委托！'),
    ],
    address: [
      new ErrorMessage('required', '必须填写地址！'),
    ],
  };
  @Input() showCheshang = true;
  public autoinput_cheshang_source_url = '/rest/merchant/filing/deal/';
  /**
   * 当前选择的车商
   * @type {string}
   */
  cheshang = '';

  /**
   * 构造函数
   * @param {IdcardService} idcard
   * @param {MessageService} message
   */
  constructor(
    private idcard: IdcardService,
    private message: MessageService,
    private fb: FormBuilder,
    private _codeitem: CodeitemService,
  ) {}

  /**
   * 是否委托变更事件
   */
  trusteeTypeChange() {
    // 默认不用填写委托人
    // 一旦勾选有委托人，则必须填写委托人
    if ( this.seller.get('trusteeType').value === '1' ) {
      this.seller.controls.Trustee.enable();
    } else {
      this.seller.controls.Trustee.disable();
    }
  }

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    /**
     * 默认不用填写委托人
     */
    this.seller.controls.Trustee.disable();
    this.autoinput_cheshang_source_url += this.merchant.id + '/';
    /**
     * 设置好证件类型
     */
    if (! this.certType) {
      this._codeitem.list('certType').then(res => this.certType = res as Codeitem[]);
    }
    console.info('值1', this.seller.value);
    this.certTypeSelecteFunc(this.seller.controls.certType.value);
    console.info('卖家组件初始化时的表单2', this.seller);
    console.info('值2', this.seller.value);
  }
  /**
   * 初始化照片动态表单
   */
  certTypeSelecteFunc(event) {
    this.certificateFormConfig.certificateCode = event;
    console.info('值3', this.seller.value);
    let sellerPhotos = this.seller.get('_photos_') as FormGroup;
    if (sellerPhotos) {
      this.seller.removeControl('_photos_');
    }
    console.info('值4', this.seller.value);
    console.info('seller 4', this.seller);
    console.info('值4.2', this.seller.value);
    this.seller.addControl('_photos_', this.fb.group({}));
    console.info('seller 5', this.seller);
    console.info('值5', this.seller.value);
  }

  /**
   * 选择车商事件
   * 将选中的车商数据复制到卖家表单中
   * @param value
   */
  getSelectedCheshang(value) {
    value.certCode = value.filingPerson.certCode;
    this.seller.patchValue(value);
  }

  /**
   * 读取IC卡并将读取的信息赋值到卖家表单中
   */
  readIdCard() {
    // this.message.info('身份证', '读取卖方身份证');
    this.idcard.prepare().then((res) => {
      // this.message.info('身份证', '初始化完毕');
      if (res) { // 初始化读卡器正常
        this.idcard.read().then((idcardData) => {
          this.message.success('身份证', '读取成功');
          console.info(idcardData);
          this.seller.patchValue({
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
