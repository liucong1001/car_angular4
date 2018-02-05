import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MarketStaffService} from '../../../../@core/data/system/market-staff.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {Observable} from 'rxjs/Observable';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';
import { ActivatedRoute, Router,Params, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'ngx-market-staff-add',
  templateUrl: './market-staff-add.component.html',
  styleUrls: ['./market-staff-add.component.scss'],
  providers: [MarketStaffService, MessageService],
})
export class MarketStaffAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private staffService: MarketStaffService, private msg: MessageService,
              public router: Router,) { }

  ngOnInit() {
  }
  marketStaff: FormGroup = this.fb.group({
    cloudUser: ['0001'],
    loginName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_-]{5,32}$/)], this.loginNameExists.bind(this)],
    telephone: ['', [Validators.required, Validators.pattern(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/)]],
    userName: ['', [Validators.required, Validators.maxLength(64)]],
    email: ['', [Validators.email]],
    position: ['', [Validators.required]],
  });
  form: FormGroup = this.fb.group({
    test: this.fb.array([

    ]),
    marketStaff: this.marketStaff,
    code: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)], this.validCode.bind(this) ],
  });

  /**
   * 校验验证码
   */
  validCode(control: FormControl): Observable<ValidationErrors|null> {
    const o = Observable.create(observ => {
      observ.next({validcode: true});
      this.staffService.validCode(this.marketStaff.value.telephone, control.value)
        .then(ret => {
          observ.next(null);
           observ.complete();
        }).catch(err => {
          observ.next({validcode: true});
          observ.complete();
        });
    });
    return o;
  }
  loginNameExists(control: FormControl): Promise<ValidationErrors|null> {
      return this.staffService.checkLoginName(control.value)
        .then(ret => {
          return null;
        }).catch(err => {
          return {exists: true};
        });
  }
  errors = {
    loginName: [
      new ErrorMessage('required', '必须填写登录ID！'),
      new ErrorMessage('pattern', '登录ID格式不正确！'),
      new ErrorMessage('exists', '用户名重复！'),
    ],
    telephone: [
      new ErrorMessage('required', '必须填写手机号码！'),
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
    code: [
      new ErrorMessage('required', '必须填写手机验证码！'),
      new ErrorMessage('pattern', '验证码格式错误！'),
      new ErrorMessage('validcode', '验证码不正确！'),
    ],
    userName: [
      new ErrorMessage('required', '必须填写员工姓名！'),
      new ErrorMessage('maxlength', '姓名过长！'),
    ],
    email: [
      new ErrorMessage('email', '邮址地址格式无效！'),
    ],
    position: [
      new ErrorMessage('required', '必须选择一个岗位！'),
    ],
  };

  /**
   * 发送验证码
   */
  sendCode() {
    this.staffService.sendCode(this.marketStaff.value.telephone).then(res => {
      this.msg.success('验证码发送成功', `请输入[${this.marketStaff.value.telephone}]收到的验证码！`, 5000);
    }).catch(err => {
      this.msg.error('验证码发送失败', err.message);
    });
  }
  back() {
    this.router.navigateByUrl('/pages/system/market/staff');
  }

  addStaff() {
    if (this.marketStaff.invalid) {
      return;
    }
    this.staffService.create(this.form.value).then(res => {
      this.msg.success('员工创建成功', `请[${this.marketStaff.value.userName}]尽快登录修改密码！` , 5000);
      this.back();
    }).catch(err => {
      this.msg.error('创建员工出现错误', err.message);
    });
  }
}
