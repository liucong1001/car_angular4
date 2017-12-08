import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
@Component({
    selector: 'ngx-blacklist-edit',
    templateUrl: './blacklist-edit.component.html',
})

export class BlacklistEditComponent implements OnInit {
    public jobList: Array<any>;
    constructor(private fb: FormBuilder,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public http: Http) { }
    form: FormGroup = this.fb.group({
        type: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.maxLength(64)]],
        loginName: ['', [Validators.required]],
        password: ['', [Validators.required ]],
        repassword: ['', [ Validators.required]],
        telephone: ['', [Validators.required]],
      });

    ngOnInit() {
    }
      /**
   * 保存
   * @returns {boolean}
   */
  save() {
    if (this.form.invalid) {
      return false;
    }
    window.console.log( '保存的对象' , this.form, this.form.value);
  }
    back() {
        this.router.navigateByUrl('/pages/system/blacklist');
    }
}
