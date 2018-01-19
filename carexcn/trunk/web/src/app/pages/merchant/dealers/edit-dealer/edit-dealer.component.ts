import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MerchantService} from '../../../../@core/data/merchant/merchant.service';
import {MerchantForm} from '../../../../@core/model/bussiness/merchant.form';
import {Http} from '@angular/http';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {Router, ActivatedRoute} from '@angular/router';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';
import {UserService} from "../../../../@core/data/users.service";


/**
 * 添加商户
 */
@Component({
  selector: 'ngx-add-dealer',
  templateUrl: './edit-dealer.component.html',
  styleUrls: ['./edit-dealer.component.scss'],
})
export class EditDealerComponent implements OnInit {
  /**
   * 构造函数
   * @param {MessageService} message
   * @param {Location} location
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private message: MessageService,
    private location: Location,
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.merchantService.get(p.id).then( res => {
          const _merchant = res.merchant as MerchantModel;
          this.pid = _merchant.id;
          this._formGroup.patchValue(_merchant);
          // console.info(_merchant.disableSign);
          if ('1' === _merchant.disableSign) {
            this.DisableSignLabel = '禁用';
            this.DisableSignValue = true;
          } else {
            this.DisableSignLabel = '启用';
            this.DisableSignValue = false;
          }
        });
      }
    });
  }
  pid = '';
  DisableSignLabel = '';
  DisableSignValue: boolean;
  photos: any[] = [{
    title: '机构证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '机构证反面',
    source: 'assets/images/camera2.jpg',
  }];
  // saved = false;
  _formGroup: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(64)]],
    code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,8}$/)]],
    certCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$|^[A-Z0-9]{18}$/)]],
    address: ['', [Validators.maxLength(50)]],
    phone: ['', [Validators.required, Validators.pattern(/^1(3|4|7|5|8)([0-9]{9})|0[0-9]{2,3}-[0-9]{8}$/)]],
    endDate: ['', [Validators.required]],
    discount: ['', [Validators.maxLength(50)]],
    isCarRental: ['', [Validators.required]],
    isDeal: ['', [Validators.required]],
    isPersonal: ['', [Validators.required]],
  });
  errors = {
    name: [
      new ErrorMessage('required', '必须填写商户名！'),
      new ErrorMessage('maxLength', '商户名太长了！'),
    ],
    code: [
      new ErrorMessage('required', '必须填写商户编号！'),
      new ErrorMessage('pattern', '商户编号格式不正确！'),
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
    isCarRental: [
      new ErrorMessage('required', '必须知道是否租车位'),
    ],
    isDeal: [
      new ErrorMessage('required', '必须知道是否能交易！'),
    ],
    isPersonal: [
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
  goBack() {
    this.location.back();
  }
  changeDisableSign(btn) {
    if (this.DisableSignValue) {
      this.merchantService.stop(this.pid).then(() => {
        this.DisableSignValue = false;
        this.DisableSignLabel = '启用';
        this.message.success('操作成功', '禁用商户成功');
      }).catch((err) => {
        console.info(err);
        this.message.error('操作失败', '禁用商户失败');
      });
    } else {
      this.merchantService.start(this.pid).then(() => {
        this.DisableSignValue = true;
        this.DisableSignLabel = '禁用';
        this.message.success('操作成功', '启用商户成功');
      }).catch(err => {
        console.info(err);
        this.message.error('操作失败', '启用商户失败');
      });
    }
  }
  save() {
    if (this._formGroup.invalid) {
      this.message.error('填写错误', JSON.stringify(this._formGroup.errors));
      return false;
    } else {
      let merchant = this._formGroup.value as MerchantModel;
      merchant.cloudUser = this.userService.getCurrentLoginUser().cloudUser;
      // TODO: 以后在此处 MerchantForm 添加 photos 添加附件
      this.merchantService.update({ merchant: merchant} as MerchantForm).then(res => {
        this.message.success('修改成功', '修改商户成功');
        // this.saved = true;
      }).catch(err => {
        this.message.error('操作失败', err.json().message);
      });
    }
  }
}
