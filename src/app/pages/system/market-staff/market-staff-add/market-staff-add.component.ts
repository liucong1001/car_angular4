import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MarketStaffService} from '../../../../@core/data/system/market-staff.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ngx-market-staff-add',
  templateUrl: './market-staff-add.component.html',
  styleUrls: ['./market-staff-add.component.scss'],
})
export class MarketStaffAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private staffService: MarketStaffService, private msg: MessageService) { }

  ngOnInit() {
  }
  marketStaff: FormGroup = this.fb.group({
    loginName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_-]{5,32}$/)]],
    telephone: ['', [Validators.required, Validators.pattern(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/)]],
  });
  form: FormGroup = this.fb.group({
    marketStaff: this.marketStaff,
    code: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)], this.validCode.bind(this) ],
  });

  keys(e): string[] {
    let v: string[] = [];
    for (const key in e) {
      v.push(key);
    }
    return v;
  }
  /**
   * 校验验证码
   */
  validCode(control: FormControl): Observable<ValidationErrors|null> {
    const o = Observable.create(observ => {
      observ.next({validcode: true});
      this.staffService.validCode(this.marketStaff.value.telephone, control.value)
        .then(ret => {
          observ.next({validcode: false});
           observ.complete();
        }).catch(err => {
          observ.next({validcode: true});
          observ.complete();
        });
    });
    return o;
  }
  errors = {
    logiName: [
      {type: 'required', message: '必须填写登录ID！'},
      {type: 'pattern', message: '登录ID格式不正确！'},
    ],
    telephone: [
      {type: 'required', message: '必须填写手机号码！'},
      {type: 'pattern', message: '手机号码格式不正确！'},
    ],
    code: [
      {type: 'required', message: '必须填写手机验证码！'},
      {type: 'pattern', message: '验证码格式错误！'},
      {type: 'validcode', message: '验证码不正确！'},
    ],
  };

  sendCode() {
    this.staffService.sendCode(this.marketStaff.value.telephone).then(res => {
      this.msg.success('验证码发送成功', `请输入[${this.marketStaff.value.telephone}]收到的验证码！`, 5000);
    }).catch(err => {
      this.msg.error('验证码发送失败', err.message);
    });
  }
}
