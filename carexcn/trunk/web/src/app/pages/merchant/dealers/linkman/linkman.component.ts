import {Component, OnInit} from '@angular/core';
import {Column, TableComponent} from '../../../../@core/ui/table/table.component';
import {FormBuilder} from '@angular/forms';
import {TextCell} from '../../../../@core/ui/table/cell.text.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Menu, MenuCell} from '../../../../@core/ui/table/cell.menu.component';
import {MessageService} from '../../../../@core/utils/message.service';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-linkman',
  templateUrl: './linkman.component.html',
  styleUrls: ['./linkman.component.scss'],
})
export class LinkmanComponent implements OnInit {

  /**
   * 列表组件实例
   */
  // @ViewChild(TableComponent) itemList: TableComponent;

  /**
   * 初始化
   */
  ngOnInit(): void {
  }

  photos: any[] = [{
    title: '',
    source: 'assets/images/camera1.jpg',
  }];
  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
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
    this.router.navigateByUrl('/pages/merchant/bussinessman/add-linkman');
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
    {title: '姓名', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '电话', titleClass: '', cell: new TextCell('phone')} as Column,
    {title: '身份证号', titleClass: '', cell: new TextCell('value')} as Column,
    {title: '证件有效期', titleClass: '', cell: new TextCell('sort')} as Column,
    {title: '离职状态', titleClass: '', cell: new TextCell('disableSign')} as Column,
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