/**
 * 车管所新增、修改表单组件
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Column, TableComponent} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';

@Component({
  selector: 'ngx-transfer-city-edit',
  templateUrl: './transferCity-edit.component.html',
})
export class TransferCityEditComponent implements OnInit {
  /**
   * 列表组件实例
   */
  @ViewChild(TableComponent) itemList: TableComponent;

  /**
   * 初始化
   */
  ngOnInit(): void {
    // this.form.get('code').valueChanges.subscribe(val => {
    //   this.filter.codemap = val;
    //   this.itemList.reload();
    // });
  }

  /**
   * 构造方法，依赖服务注入
   * @param {CodeService} codeService 代码服务
   * @param {MessageService} message 消息服务
   * @param {FormBuilder} fb 表单工厂服务
   * @param {ActivatedRoute} route 当前路由服务
   */
  constructor( private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.params.subscribe(p => {
      if (p.code && p.name) {
        this.form.setValue(p);
        this.filter.codemap = p.code;
        if (p.code && p.name) {
          this.saved = true;
        }
      }
    });
  }

  /**
   * 表单定义
   * @type {FormGroup}
   */
  form: FormGroup = this.fb.group({
    province: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });
  /**
   * 已保存标志
   * @type {boolean}
   */
  saved = false;

  /**
   * 保存
   * @returns {boolean}
   */


  /**
   * 代码项表单开关
   * @type {boolean}
   */
  showItemForm = false;

  /**
   * 显示代码项表单
   */
  showForm() {
    this.showItemForm = true;
  }

  /**
   * 隐藏代码项表单
   */
  hideForm() {
    this.showItemForm = false;
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
    {title: '所属城市名', titleClass: '', cell: new TextCell('city')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        new Menu('编辑', '', 'edit'),
      ],
      new Menu('查看', '', this.view), 'text-center',
    )} as Column,
  ];
  view(data) {
  }
}
