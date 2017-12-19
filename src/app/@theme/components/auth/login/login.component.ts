import { Component, OnInit } from '@angular/core';
import {NbAuthService} from '@nebular/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * 登录页面组件
 */
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],
})
export class LoginComponent implements OnInit {

  constructor(private authService: NbAuthService, private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.authService.getProvider('email'));
  }

  form: FormGroup = this.fb.group({
    loginName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_-]{5,32}$/)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
  });

  login() {
    this.authService.authenticate('email', {
      // email:
    });
  }

}
