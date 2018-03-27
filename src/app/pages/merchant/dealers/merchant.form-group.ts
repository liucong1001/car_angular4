import {FormBuilder, Validators} from '@angular/forms';
import {NgModule} from '@angular/core';
import {ErrorMessage} from '../../../@core/ui/valid-error/valid-error.component';

@NgModule({
})
export class MerchantFormGroup {
  public merchant = this._formBuilder.group({
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
  public merchant_error = {
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
  public photos = this._formBuilder.group({
    // photos: this._formBuilder.array([]),
  });
  constructor(
    private _formBuilder: FormBuilder,
  ) {}
}
