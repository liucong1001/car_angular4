import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MarketStaffService} from '../../../../@core/data/system/market-staff.service';
import { MessageService } from './../../../../@core/utils/message.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';

@Component({
  selector: 'ngx-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [MarketStaffService, MessageService],
})
export class PasswordComponent implements OnInit {

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private staffService: MarketStaffService,
    private message: MessageService,
  ) {}

  ngOnInit() {
  }

  form: FormGroup = this.fb.group({
    oldPwd: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)], ''],
    oncePwd:['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)], ''],
    twicePwd:['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)], this.checkTwicePwd.bind(this)],
  });

  errors = {
    oldPwd: [
      new ErrorMessage('required', '请输入原始密码！'),
      new ErrorMessage('pattern', '原始密码格式不正确！'),
    ],
    oncePwd: [
      new ErrorMessage('required', '请输入新密码！'),
      new ErrorMessage('pattern', '新密码格式不正确！'),
    ],
    twicePwd: [
      new ErrorMessage('required', '请第二次输入新密码！'),
      new ErrorMessage('pattern', '第二次输入的密码格式不正确！'),
      new ErrorMessage('checkTwicePwd', '二次密码不一致'),
    ],
  };

  checkTwicePwd(control: FormControl): Promise<ValidationErrors|null> {
    const o = Observable.create(observ => {
      if (control.value != this.form.value.oncePwd) {
        observ.next({checkTwicePwd: true});
        observ.complete();
      } else {
        observ.next(null);
        observ.complete();
      }
    });
    return o;
  }

  save(){
    if (this.form.invalid) {
      return;
    }
    if (this.form.value.oncePwd != this.form.value.twicePwd) {
      this.message.error('二次密码不一致',``);
      return;
    }
    this.staffService.updatePwd(this.form.value.oldPwd, this.form.value.oncePwd, this.form.value.twicePwd).then(res => {
      this.message.success('密码修改成功', `` );
      this.router.navigate(['/auth/login'])
    }).catch(err => {
      this.message.error('修改密码出现错误', err.message);
    });
  }
}
