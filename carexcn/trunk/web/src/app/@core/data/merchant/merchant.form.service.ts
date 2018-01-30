import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable()
export class MerchantFormService {
  constructor(
    private _formBuilder: FormBuilder,
  ) {}
  public _formGroup = this._formBuilder.group({
  });
  // _formGroup: FormGroup = this.fb.group({
  //   // name: ['', [Validators.required, Validators.maxLength(64)]],
  //   // code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,8}$/)]],
  //   // certCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$|^[A-Z0-9]{18}$/)]],
  //   // address: ['', [Validators.maxLength(50)]],
  //   // phone: ['', [Validators.required, Validators.pattern(/^1(3|4|7|5|8)([0-9]{9})|0[0-9]{2,3}-[0-9]{8}$/)]],
  //   // endDate: ['', [
  //   //   Validators.required,
  //   //   Validators.pattern(/^[1-9]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$|^\u957f\u671f$/)],
  //   // ],
  //   // discount: ['', [Validators.maxLength(50)]],
  //   // isCarRental: ['', [Validators.required]],
  //   // isDeal: ['', [Validators.required]],
  //   // isPersonal: ['', [Validators.required]],
  //   // TODO: 去除模拟数据
  //   name: ['汉口北二手车市场', [Validators.required, Validators.maxLength(64)]],
  //   code: ['HKB3', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,8}$/)]],
  //   certCode: ['hankoube-3', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$|^[A-Z0-9]{18}$/)]],
  //   address: ['湖北武汉汉口', [Validators.maxLength(50)]],
  //   phone: ['17012345678', [Validators.required, Validators.pattern(/^1(3|4|7|5|8)([0-9]{9})|0[0-9]{2,3}-[0-9]{8}$/)]],
  //   endDate: ['20181212', [
  //     Validators.required,
  //     Validators.pattern(/^[1-9]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$|^\u957f\u671f$/)],[],
  //   ],
  //   discount: ['1', [Validators.maxLength(50)]],
  //   isCarRental: ['1', [Validators.required]],
  //   isDeal: ['1', [Validators.required]],
  //   isPersonal: ['1', [Validators.required]],
  // });
}
