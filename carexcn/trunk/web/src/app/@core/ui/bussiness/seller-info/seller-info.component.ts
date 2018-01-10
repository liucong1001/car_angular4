import {Component, Input, OnInit} from '@angular/core';
import {MerchantModel} from '../../../model/bussiness/merchant.model';
import {Codeitem} from '../../../model/system/codeitem';
import {ControlContainer, FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {IdcardService} from '../../../device/idcard.service';
import {MessageService} from '../../../utils/message.service';

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
   * 当前商户实例
   */
  @Input() merchant: MerchantModel;
  /**
   * 证件类型清单
   */
  @Input() CERTIFICATE_TYPE_LIST: Codeitem[];
  /**
   * 卖家表单
   */
  @Input() seller: FormGroup;
  /**
   * 错误实例
   * @type {{}}
   */
  @Input() errors: object = {};
  public ifTrusteeType = false;
  public autoinput_cheshang_source_url = '/rest/merchant/filing/deal/';

  /**
   * 图片清单
   * @type {{title: string; source: string}[]}
   */
  photos: any[] = [{
    title: '身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '身份证反面',
    source: 'assets/images/camera2.jpg',
  }];

  /**
   * 当前选择的车商
   * @type {string}
   */
  cheshang = '';

  /**
   * 证件类型列表
   */
  public certificateType: Codeitem;

  /**
   * 构造函数
   * @param {IdcardService} idcard
   * @param {FormBuilder} formBuilder
   * @param {MessageService} message
   */
  constructor(
    private idcard: IdcardService,
    private formBuilder: FormBuilder,
    private message: MessageService,
  ) {
  }

  /**
   * 订阅表单值变更事件
   */
  subcribeToFormChanges() {
    const _formValueChanges = this.seller.valueChanges;
    _formValueChanges.subscribe(x => {
      if ( x.trusteeType === '1' ) {
        this.ifTrusteeType = true;
      } else {
        this.ifTrusteeType = false;
      }
    });
  }

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    this.autoinput_cheshang_source_url += this.merchant.id + '/';
    // this.subcribeToFormChanges();
  }

  /**
   * 证件类型选择事件以切换要操作的图片清单
   * @param event
   */
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

  /**
   * 选择车商事件
   * 将选中的车商数据复制到卖家表单中
   * @param value
   */
  getSelectedCheshang(value) {
    value.certCode = value.filingPerson.certCode;
    console.info(value);
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
