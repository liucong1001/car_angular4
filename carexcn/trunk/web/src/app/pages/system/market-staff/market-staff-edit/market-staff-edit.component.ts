import { MessageService } from './../../../../@core/utils/message.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {MarketStaffService} from '../../../../@core/data/system/market-staff.service';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';


@Component({
  selector: 'ngx-market-staff-edit',
  templateUrl: './market-staff-edit.component.html',
  styleUrls: ['./market-staff-edit.component.scss'],
  providers: [MarketStaffService, MessageService],
})
export class MarketStaffEditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public http: Http,
    private message: MessageService,
    private staffService: MarketStaffService,
  ) { }

  ngOnInit() {
  }

  form: FormGroup = this.fb.group({
    cloudUser: ['0001'],
    loginName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_-]{5,32}$/)], this.loginNameExists.bind(this)],
    telephone: ['', [Validators.required, Validators.pattern(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/)]],
    userName: ['', [Validators.required, Validators.maxLength(64)]],
    email: ['', [Validators.email]],
    position: ['', [Validators.required]],
  });

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

  back() {
    this.router.navigateByUrl('/pages/system/market/staff');
  }

}
