import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Column, TableComponent} from '../../../@core/ui/table/table.component';
import {ManagerService} from '../../../@core/data/system/manager.service';
import {MessageService} from '../../../@core/utils/message.service';
import {Managermap} from '../../../@core/model/system/managermap';


@Component({
    selector: 'ngx-manageritem-edit',
    templateUrl: './manageritem-edit.component.html',
    providers: [ManagerService, MessageService],
})

export class ManageritemEditComponent implements OnInit {
    public jobList: Array<any>;

    constructor(private fb: FormBuilder,
        public router: Router,
        private route: ActivatedRoute,
        public http: Http,
        private managerService: ManagerService,
        private message: MessageService,
    ) {
        this.route.params.subscribe(p => {
            if (p.code && p.name) {
                this.form.setValue(p);
                this.filter.managermap = p.code;
                if (p.code && p.name) {
                    this.saved = true;
                }
            }
        });
    }


    form: FormGroup = this.fb.group({
        type: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.maxLength(64)]],
        loginName: ['', [Validators.required]],
        password: ['', [Validators.required ]],
        repassword: ['', [ Validators.required]],
        telephone: ['', [Validators.required]],
      });
        /**
   * 列表组件实例
   */
  @ViewChild(TableComponent) itemList: TableComponent;

 /**
   * 代码项搜索条件
   * @type {{}}
   */
  filter: any = {};

    ngOnInit() {
        this.jobList = [
            { val: '02', name: '市场开票员' }, { val: '03', name: '市场审核员' }, { val: '09', name: '市场管理员' },
            { val: '10', name: '领导' }, { val: '11', name: '财务' }, { val: '12', name: '核对员' },
            { val: '97', name: '账户管理员' }, { val: '98', name: '离职' },
        ];
        this.form.get('code').valueChanges.subscribe(val => {
            this.filter.codemap = val;
            this.itemList.reload();
          });
    }
     /**
   * 已保存标志
   * @type {boolean}
   */
  saved = false;

      /**
   * 保存
   * @returns {boolean}
   */
  save() {
    if (this.form.invalid) {
      return false;
    }
    window.console.log( '保存的对象' , this.form.value);
    const managermap = this.form.value as Managermap;
    window.console.log( '保存的map' , managermap);
    this.managerService.save(managermap).then(res => {
      this.message.success('保存成功', '代码集保存成功');
      this.saved = true;
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }
    back() {
        this.router.navigateByUrl('/pages/system/manager');
    }
}
