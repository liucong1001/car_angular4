import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
@Component({
    selector: 'ngx-manageritem-edit',
    templateUrl: './manageritem-edit.component.html',
})

export class ManageritemEditComponent implements OnInit {
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
        this.jobList = [
            { val: '02', name: '市场开票员' }, { val: '03', name: '市场审核员' }, { val: '09', name: '市场管理员' },
            { val: '10', name: '领导' }, { val: '11', name: '财务' }, { val: '12', name: '核对员' },
            { val: '97', name: '账户管理员' }, { val: '98', name: '离职' },
        ];
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
        this.router.navigateByUrl('/pages/system/manager');
    }
}
