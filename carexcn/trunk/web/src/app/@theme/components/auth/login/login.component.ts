import { Component, OnInit } from '@angular/core';
import {NB_AUTH_TOKEN_WRAPPER_TOKEN, NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

/**
 * 登录页面组件
 */
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private authService: NbAuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.authService.logout('email').toPromise().then(res => {
      // console.log(res);
    }).catch(err => {
      // console.log(err);
    });
  }

  form: FormGroup = this.fb.group({
    market: ['0001'],
    loginName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_-]{5,32}$/)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
  });

  login() {
    this.authService.authenticate('email', {
      // ...this.form.value,
       username: this.form.value.market + '|' + this.form.value.loginName,
       password: this.form.value.password,
    }).toPromise().then(ret => {
      // this.tokenService.set
      this.router.navigate(['/']);
      console.log(ret);
    }).catch(err => {
      console.log(err);
    });
  }

}