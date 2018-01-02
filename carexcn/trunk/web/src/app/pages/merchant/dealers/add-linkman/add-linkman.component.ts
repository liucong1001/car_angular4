import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {MessageService} from '../../../../@core/utils/message.service';
import {FingerService} from '../../../../@core/device/finger.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MerchantService} from '../../../../@core/data/merchant/merchant.service';
import {FilingInfoModel} from '../../../../@core/model/bussiness/filing.info.model';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FilingInfoForm} from '../../../../@core/model/bussiness/filing.info.form';
import {FilingService} from '../../../../@core/data/merchant/filing.service';
import {FilingPersonModel} from "../../../../@core/model/bussiness/filing.person.model";
import {ErrorMessage} from "../../../../@core/ui/valid-error/valid-error.component";

@Component({
  selector: 'ngx-add-linkman',
  templateUrl: './add-linkman.component.html',
  styleUrls: ['./add-linkman.component.scss'],
})
export class AddLinkmanComponent implements OnInit {

  public fingerImgUrl = '/assets/images/camera1.jpg';
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
      if (p.id) {
        this._merchant.id = p.id;
        this.merchantService.get(p.id).then( res => {
          this._merchant = res.merchant as MerchantModel;
        });
      }
    });
  }
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
  _merchant: MerchantModel = {};
  _formGroup: FormGroup = this.fb.group({
    // name: ['备案人姓名', [Validators.required, Validators.maxLength(14)]],
    address: ['湖北武汉汉口', [Validators.required]],
    phone: ['17012345678', [
      Validators.required,
      Validators.pattern(/^1(3|4|7|5|8)([0-9]{9})|0[0-9]{2,3}-[0-9]{8}$/),
    ]],
    endDate: ['20181212', [
      Validators.required,
      Validators.pattern(/^[1-9]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$|^\u957f\u671f$/)],
    ],
    isAgency: ['1', [Validators.required]],
    isDeal: ['1', [Validators.required]],
    isApp: ['1', [Validators.required]],
    certCode: ['420110190001010001', [
      Validators.required,
      Validators.pattern(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/),
    ]],
    type: ['1', [Validators.required]],
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
  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
  }

  /**
   * 指纹读取
   */
  fingerRead() {
    this.message.info('指纹读取', '读取指纹');
    this.finger.read().then((data) => {
      const response = JSON.parse(data.File);
      // console.log(response.file[0]);
      this.fingerImgUrl = response.file[0];
      // this.fingerBase64 = data.Base64;
    }).catch((error) => {
      // console.log(error);
    });
  }

  /**
   * 保存新备案信息
   * @returns {boolean}
   */
  save() {
    if (this._formGroup.invalid) {
      this.message.error('填写错误', JSON.stringify(this._formGroup.errors));
      return false;
    } else {
      let filinginfo = this._formGroup.value as FilingInfoModel;
      filinginfo.filingPerson = {certCode: this._formGroup.value.certCode, type: this._formGroup.value.type } as FilingPersonModel;
      filinginfo.cloudUser = '0001'; // TODO: 设置登陆用户
      filinginfo.merchant = this._merchant;
      console.info(filinginfo);
      // TODO: 以后在此处 MerchantForm 添加 photos 添加附件
      this.filingService.add({filingInfo: filinginfo} as FilingInfoForm).then(res => {
        this.message.success('创建成功', '创建备案人成功');
        this.router.navigate(['/pages/merchant/bussinessman/linkman', { id: this._merchant.id}]);
      }).catch(err => {
        console.info(err);
        // this.message.error('操作失败', err.json().message);
      });
    }
  }
  // /**
  //  * 指纹验证
  //  */
  // fingerVerify() {
  //   this.message.info('指纹验证', '验证指纹');
  //   this.finger.verify(this.fingerBase64).then((verify) => {
  //     // console.log(verify);
  //   });
  // }
}
