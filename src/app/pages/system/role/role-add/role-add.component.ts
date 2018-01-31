import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { MessageService } from './../../../../@core/utils/message.service';
import { Permissionmap } from './../../../../@core/model/system/permissionmap';
import { PermissionService } from './../../../../@core/data/system/permission.service';
import {RoleService} from '../../../../@core/data/system/role.services';


@Component({
  selector: 'ngx-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss'],
  providers: [PermissionService, MessageService,RoleService],
})
export class RoleAddComponent implements OnInit {

  public orgTree: Permissionmap[] = [];

  /* 当前选中的节点 */
  public selectedNode: Permissionmap;
  public disabled = true;
  public isNew = false;
  public selectcCode = [];
  public  codeArry = [];
  isEdit = false;
  constructor(private fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private message: MessageService,
              private permissionService: PermissionService ,
              private  roleService:RoleService,
  ) { }
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(64)]],
    permissons: [null, [Validators.required]],
    id:[null],
  });
  ngOnInit() {
    this.getData();
  }

  public getData() {
    this.permissionService.get(null).then(res => {
      this.orgTree = res;
    }).catch(err => {
      this.message.error('失败', err.json().message);
    });
  }

  public nodeSelect(event): void {
    this.selectcCode = [];
    console.log('选择节点',this.selectedNode,typeof this.selectedNode);
    for(var i in this.selectedNode){
      this.selectcCode.push(this.selectedNode[i].code);
    }
    console.log('code的值',this.selectcCode);
    this.form.patchValue({
      permissons:this.selectcCode,
    });
  }

  public nodeUnselect(event): void {
     console.log('取消');
  }
  public clcikMe(){
    // console.log('点击1');
  }

  public  save(){
    console.log('form信息',this.form.value);
    this.roleService.save(this.form.value).then(res => {
      this.message.success('保存成功', '代码集保存成功');
      this.back();
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }

  public back(){
    this.router.navigateByUrl('/pages/system/role');
  }

}
