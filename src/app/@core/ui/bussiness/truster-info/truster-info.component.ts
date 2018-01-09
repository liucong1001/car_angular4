import {Component, Input, OnInit} from '@angular/core';
import {TrusteeModel} from '../../../model/bussiness/trustee.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IdcardService} from "../../../device/idcard.service";
import {MessageService} from "../../../utils/message.service";
import {Codeitem} from "../../../model/system/codeitem";

@Component({
  selector: 'ngx-ys-truster-info',
  templateUrl: './truster-info.component.html',
  styleUrls: ['./truster-info.component.scss'],
})
export class TrusterInfoComponent implements OnInit {
  @Input() autoinput_cheshang_source_url = '';
  trusterIdcardData = {};
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
  constructor(
    private idcard: IdcardService,
    private fb: FormBuilder,
    private message: MessageService,
  ) { }

  ngOnInit() {
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
