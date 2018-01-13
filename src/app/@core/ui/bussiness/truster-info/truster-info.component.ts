import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {IdcardService} from '../../../device/idcard.service';
import {MessageService} from '../../../utils/message.service';
import {Codeitem} from '../../../model/system/codeitem';
import {MerchantModel} from '../../../model/bussiness/merchant.model';

@Component({
  selector: 'ngx-ys-truster-info',
  templateUrl: './truster-info.component.html',
  styleUrls: ['./truster-info.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
})
export class TrusterInfoComponent implements OnInit {
  /**
   * 委托人实例
   */
  @Input() Trustee: FormGroup;
  /**
   * 商户实例
   */
  @Input() merchant: MerchantModel;
  /**
   * 错误实例
   * @type {{}}
   */
  @Input() errors: object = {};
  @Input() showCheshang = true;
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
   * 构造函数
   * @param {IdcardService} idcard
   * @param {FormBuilder} fb
   * @param {MessageService} message
   */
  constructor(
    private idcard: IdcardService,
    private fb: FormBuilder,
    private message: MessageService,
  ) { }

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    this.autoinput_cheshang_source_url += this.merchant.id + '/';
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
    console.info(value);
    value.certCode = value.filingPerson.certCode;
    this.Trustee.patchValue(value);
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
          this.Trustee.patchValue({
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
