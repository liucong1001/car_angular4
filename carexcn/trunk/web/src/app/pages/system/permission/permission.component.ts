import { Permissionmap } from './../../../@core/model/system/permissionmap';
import { MessageService } from './../../../@core/utils/message.service';
import { PermissionService } from './../../../@core/data/system/permission.service';
import { Component, OnInit, Input } from '@angular/core';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { promise } from 'selenium-webdriver';


@Component({
    selector: 'ngx-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.scss'],
    providers: [PermissionService, MessageService],
})
export class PermissionComponent implements OnInit {

    @Input()
    private orgTree: Permissionmap[] = [];


    /* 当前选中的节点 */
    public selectedNode: Permissionmap;
    public disabled = true;
    public isNew = false;
    item = new Permissionmap(null, '', '', '', '', '', '', '1', 1, [], {});


    constructor(private http: Http, private fb: FormBuilder, private permissionService: PermissionService ,
    private message: MessageService,
    ) { }

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
        this.disabled = true;
        this.isNew = false;
        this.item.name = this.selectedNode.name;
        this.item.code = this.selectedNode.code;
        this.item.path = this.selectedNode.path;
        this.item.icon = this.selectedNode.icon;
        this.item.id = this.selectedNode.id;
    }
    public nodeUnselect(event): void {
    }

    /* 新建节点 */
    public prepareForNewOrg(): void {
        this.disabled = false;
        this.isNew = true;
        if (this.selectedNode) {
            this.item = new Permissionmap(null, '', '', '', '', '', '', '1', 1, [], {});
            this.item.parent = {
                id: this.selectedNode.id,
            };
        } else {
            this.item = new Permissionmap(null, '', '', '', '', '', '', '1', 1, [], {});
            delete this.item.parent;
        }
    }

    public editOrSave(event): void {
        if (this.isNew) {
            this.permissionService.save(this.item).then(res => {
                alert('添加成功');
                this.getData();
            }).catch(err => {
                this.message.error('失败', err.json().message);
            });
            return;
        }
        if (!this.disabled) {
            delete this.item.parent;
            this.permissionService.save(this.item).then(res => {
                alert('修改成功');
                this.getData();
            }).catch(err => {
                this.message.error('失败', err.json().message);
            });
        }
        this.disabled = !this.disabled;
        this.Root();
    }
    public Root() {
        this.selectedNode = undefined;
        // this.item = new Permissionmap(null, '', '', '', '', '', '', '1', 1, [], {});
    }

    private findNodeRecursive(nodes: any): any {
        if (nodes instanceof Array && nodes.length !== 0) {
            let result = null;
            for (let i = 0; i < nodes.length; i++) {
                const element = nodes[i];
                window.console.log(element);
                if (element.data === this.item.code) {
                    result = element;
                    break;
                } else if (element.children) {
                    this.findNodeRecursive(element.children);
                }
            }
            return result;
        }
    }


}
