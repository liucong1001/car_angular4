import { Areamap } from './../../../@core/model/system/areamap';
import { MessageService } from './../../../@core/utils/message.service';
import { AreaService } from './../../../@core/data/system/area.service';
import { Component, OnInit, Input } from '@angular/core';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { promise } from 'selenium-webdriver';


@Component({
    selector: 'ngx-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.scss'],
    providers: [AreaService, MessageService],
})
export class AreaComponent implements OnInit {

    @Input()
    private orgTree: Areamap[] = [];


    // 当前选中的节点
    public selectedNode: Areamap;
    public disabled = true;
    public isNew = false;


    item = new Areamap(null, '', '', '', '', '', null, [], {});


    constructor(private http: Http, private fb: FormBuilder, private areaService: AreaService,
        private message: MessageService,
    ) { }

    ngOnInit() {
        this.getData();
    }
    public getData() {
        this.areaService.get(null).then(res => {
            this.orgTree = res;
          }).catch(err => {
            this.message.error('失败', err.json().message);
          });
    }

    public nodeSelect(event): void {
        this.disabled = true;
        this.isNew = false;
        this.item.name = this.selectedNode.name;
        this.item.code = this.selectedNode.code;
        this.item.plateNumberPrefix = this.selectedNode.plateNumberPrefix;
        this.item.id = this.selectedNode.id;
    }

    /* 新建节点 */
    public prepareForNewOrg(): void {
        this.disabled = false;
        this.isNew = true;
        this.item = new Areamap(null, '', '', '', '', '', null, [], {});
        if (this.selectedNode) {
            this.item = new Areamap(null, '', '', '', '', '', null, [], {});
            this.item.parent = {
                id: this.selectedNode.id,
            };
        } else {
            this.item = new Areamap(null, '', '', '', '', '', null, [], {});
            delete this.item.parent;
        }
    }

    public editOrSave(event): void {
        if (this.isNew) {
            window.console.log('新增菜单', this.item);
            this.areaService.save(this.item).then(res => {
                alert('添加成功');
                this.getData();
              this.disabled = !this.disabled;
            }).catch(err => {
                this.message.error('失败', err.json().message);
            });
            return;
        }
        if (!this.disabled) {
          this.item.parent = {
            id: this.selectedNode.parent.id,
          };
            this.areaService.save(this.item).then(res => {
                alert('修改成功');
                this.getData();
                this.Root();
            }).catch(err => {
                this.message.error('失败', err.json().message);
            });
        }
        this.disabled = !this.disabled;
    }

    public Root() {
        this.selectedNode = undefined;
    }

  public confirmDelete(){
    this.areaService.remove(this.selectedNode.id).then(res=>{
      alert("删除成功！");
      this.getData();
      this.Root();
      this.item = new Areamap(null, '', '', '', '', '', null, [], {});
    })
  }




}
