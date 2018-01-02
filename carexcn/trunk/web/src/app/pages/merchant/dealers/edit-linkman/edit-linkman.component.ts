import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {MerchantService} from '../../../../@core/data/merchant/merchant.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {FingerService} from '../../../../@core/device/finger.service';
import {FilingService} from '../../../../@core/data/merchant/filing.service';
import {FilingInfoModel} from '../../../../@core/model/bussiness/filing.info.model';
import {FilingInfoForm} from '../../../../@core/model/bussiness/filing.info.form';
import {FilingPersonModel} from '../../../../@core/model/bussiness/filing.person.model';
import {ErrorMessage} from "../../../../@core/ui/valid-error/valid-error.component";

@Component({
  selector: 'ngx-edit-linkman',
  templateUrl: './edit-linkman.component.html',
  styleUrls: ['./edit-linkman.component.scss'],
})
export class EditLinkmanComponent implements OnInit {
  fingerImgUrl = '/assets/images/camera1.jpg';
  _merchant: MerchantModel = {};
  photos: any[] = [{
    title: '身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '身份证反面',
    source: 'assets/images/camera2.jpg',
  }, {
    title: '联系人信息确认单',
    source: 'assets/images/camera3.jpg',
  }];
  _formGroup: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(14)]],
    address: ['', [Validators.required]],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^1(3|4|7|5|8)([0-9]{9})|0[0-9]{2,3}-[0-9]{8}$/),
    ]],
    endDate: ['', [
      Validators.required,
      Validators.pattern(/^[1-9]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$|^\u957f\u671f$/)],
    ],
    isAgency: ['', [Validators.required]],
    isDeal: ['', [Validators.required]],
    isApp: ['', [Validators.required]],
    certCode: ['', [
      Validators.required,
      Validators.pattern(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/),
    ]],
    type: [{ value: '', disabled: true }, [Validators.required]],
  });
  errors = {
    name: [
      new ErrorMessage('required', '必须填写商户名！'),
      new ErrorMessage('maxLength', '商户名太长了！'),
    ],
    certCode: [
      new ErrorMessage('required', '必须填写证件号！'),
      new ErrorMessage('pattern', '证件号格式错误！'),
    ],
    address: [
      new ErrorMessage('maxLength', '地址过长！'),
    ],
    phone: [
      new ErrorMessage('required', '必须填写联系方式！'),
      new ErrorMessage('pattern', '联系方式填写错误！'),
    ],
    endDate: [
      new ErrorMessage('required', '必须有证件有效期！'),
      new ErrorMessage('pattern', '证件有效期格式错误！'),
    ],
    discount: [
      new ErrorMessage('maxLength', '交易折扣长度不对！'),
    ],
    isAgency: [
      new ErrorMessage('required', '必须知道是否可代办'),
    ],
    isApp: [
      new ErrorMessage('required', '必须知道是否用APP'),
    ],
    isDeal: [
      new ErrorMessage('required', '必须知道是否能交易！'),
    ],
    type: [
      new ErrorMessage('required', '必须知道是否是个人！'),
    ],
  };
  _filinginfo: FilingInfoModel = {};
  DisableSignLabel = '';
  DisableSignValue = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageService,
    private finger: FingerService,
    private fb: FormBuilder,
    private location: Location,
    private merchantService: MerchantService,
    private filingService: FilingService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.linkman_id) {
        // this.filinginfo.id = p.linkman_id;
        this.filingService.get(p.linkman_id)
          .then(res => res as FilingInfoForm)
          .then( filinginfoform => {
            this._filinginfo = filinginfoform.filingInfo;
            this._merchant = this._filinginfo.merchant;
            this._formGroup.patchValue(this._filinginfo);
            this._formGroup.patchValue({
              certCode: this._filinginfo.filingPerson.certCode,
              type: this._filinginfo.filingPerson.type,
            });
          });
      }
    });
  }

  /**
   * 修改备案信息
   * @returns {boolean}
   */
  save() {
    if (this._formGroup.invalid) {
      this.message.error('填写错误', JSON.stringify(this._formGroup.errors));
      return false;
    } else {
      let filinginfo = this._formGroup.value as FilingInfoModel;
      filinginfo.id = this._filinginfo.id;
      filinginfo.filingPerson = {
        id: this._filinginfo.filingPerson.id,
        certCode: this._formGroup.value.certCode,
        type: this._filinginfo.filingPerson.type,
      } as FilingPersonModel;
      filinginfo.cloudUser = '0001'; // TODO: 设置登陆用户
      filinginfo.merchant = this._merchant;
      // TODO: 以后在此处 MerchantForm 添加 photos 添加附件
      this.filingService.update({filingInfo: filinginfo} as FilingInfoForm).then(res => {
        this.message.success('修改成功', '修改备案人成功');
        this.router.navigate(['/pages/merchant/bussinessman/linkman', { id: this._merchant.id}]);
      }).catch(err => {
        // console.info(err);
        this.message.error('操作失败', err.json().message);
      });
    }
  }
}
