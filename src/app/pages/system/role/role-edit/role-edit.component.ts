import { ToPermTreeNode } from './../../permission/permission-pipe';
import { FormsRoutingModule } from './../../../forms/forms-routing.module';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { MessageService } from './../../../../@core/utils/message.service';
import { Permissionmap } from './../../../../@core/model/system/permissionmap';
import { PermissionService } from './../../../../@core/data/system/permission.service';
import {RoleService} from '../../../../@core/data/system/role.services';


@Component({
  selector: 'ngx-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss'],
  providers: [PermissionService, MessageService,RoleService,ToPermTreeNode],
})
export class RoleEditComponent implements OnInit {

  public orgTree: Permissionmap[] = [];

  /* 当前选中的节点 */
  public selectedNode: Permissionmap[]= [] ;
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
              private  toPermTreeNodePipe:ToPermTreeNode
  ) { }
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(64)]],
    permissons: [null, [Validators.required]],
    id:[null,[Validators.required]],
    cloudUser:[null],
    code:[null],
    createTime:[null],
    status:[null],
  });
  ngOnInit() {
    this.getData();
    this.route.params.subscribe(p => {
      if (p.id) {
        this.isEdit = true;
        this.roleService.get(p.id).then(res =>{
          console.log('获取到',res);
          this.form.setValue(res);
          // this.selectedNode=
          // this.form.patchValue({
          //   permissons:res.permissons,
          // });


        })
      }
    });
  }

  public getData() {
    this.permissionService.get(null).then(res => {
      this.orgTree = res;
      console.log('开始返回数据',res);
      // this.toPermTreeNodePipe.transform(res,'pipeFilter');
      let data = new ToPermTreeNode().transform(res)  ;
      let dataJson = data as Permissionmap;
      // this.selectedNode = [data[5]];

      console.log('数组',[dataJson[5]],'json',dataJson);
      console.log("选中",this.selectedNode);
    }).catch(err => {
      this.message.error('失败', err.json().message);
    });
  }

  public nodeSelect(event): void {
    this.selectcCode = [];
    console.log('选择节点',this.selectedNode);
    for(var i in this.selectedNode){
      this.selectcCode.push(this.selectedNode[i].code);
    }
    console.log('code的值',this.selectcCode);
    this.form.patchValue({
      permissons:this.selectcCode,
    });

  }

  public nodeUnselect(event): void {
  }

  public  save(){
    console.log('form信息',this.form.value);
    this.roleService.save(this.form.value).then(res => {
      this.message.success('保存成功', '代码集保存成功');
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }
  public back(){
    this.router.navigateByUrl('/pages/system/role');
  }
}
