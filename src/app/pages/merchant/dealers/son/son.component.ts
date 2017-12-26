import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Column} from '../../../../@core/ui/table/table.component';
import {Router} from '@angular/router';
import {TextCell} from '../../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../../@core/ui/table/cell.menu.component';
import {MessageService} from '../../../../@core/utils/message.service';

@Component({
  selector: 'ngx-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.scss'],
})
export class SonComponent implements OnInit {

  /**
   * 列表组件实例
   */
  // @ViewChild(TableComponent) itemList: TableComponent;

  /**
   * 初始化
   */
  ngOnInit(): void {
  }

  /**
   * 构造方法，依赖服务注入
   * @param {CodeService} codeService 代码服务
   * @param {MessageService} message 消息服务
   * @param {FormBuilder} fb 表单工厂服务
   * @param {ActivatedRoute} route 当前路由服务
   */
  constructor(
    private message: MessageService,
    private location: Location,
    private router: Router,
  ) {}
  /*跳转*/
  jump() {
    this.router.navigateByUrl('/pages/merchant/bussinessman/add-son');
  }
  /*返回*/
  goBack() {
    this.location.back();
  }

  /**
   * 代码项搜索条件
   * @type {{}}
   */
  filter: any = {};
  /**
   * 代码项列表列定义
   * @type {[Column , Column , Column]}
   */
  columns: Column[] = [
    {title: '商户ID', titleClass: '', cell: new TextCell('id')} as Column,
    {title: '商户名', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '编码', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '证件号', titleClass: '', cell: new TextCell('certCode')} as Column,
    {title: '证件有效期', titleClass: '', cell: new TextCell('endDare')} as Column,
    {title: '联系方式', titleClass: '', cell: new TextCell('phone')} as Column,
    {title: '地址', titleClass: '', cell: new TextCell('address')} as Column,
    {title: '类型', titleClass: '', cell: new TextCell('isPersonal')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          new Menu('修改', '', (row) => this.edit(row)),
          new Menu('删除', '', (row) => this.delete(row)),
        ],
        new Menu('查看', '', (row) => this.view(row)), 'text-center',
      )} as Column,
  ];
  edit(row) {
  }
  delete(row) {
  }
  view(data) {
  }

}
