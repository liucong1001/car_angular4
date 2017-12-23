import {Component, OnInit, ViewChild} from '@angular/core';
import {Codemap} from '../../../../@core/model/system/codemap';
import {Column, TableComponent} from '../../../../@core/ui/table/table.component';
import {CodeService} from '../../../../@core/data/system/code.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TextCell} from '../../../../@core/ui/table/cell.text.component';
import {ActivatedRoute} from '@angular/router';
import {Codeitem} from '../../../../@core/model/system/codeitem';
import {Menu, MenuCell} from '../../../../@core/ui/table/cell.menu.component';
import {MessageService} from '../../../../@core/utils/message.service';

@Component({
  selector: 'ngx-linkman',
  templateUrl: './linkman.component.html',
  styleUrls: ['./linkman.component.scss'],
})
export class LinkmanComponent implements OnInit {

  /**
   * 列表组件实例
   */
  @ViewChild(TableComponent) itemList: TableComponent;

  /**
   * 初始化
   */
  ngOnInit(): void {
    this.form.get('code').valueChanges.subscribe(val => {
      this.filter.codemap = val;
      this.itemList.reload();
    });
  }

  /**
   * 构造方法，依赖服务注入
   * @param {CodeService} codeService 代码服务
   * @param {MessageService} message 消息服务
   * @param {FormBuilder} fb 表单工厂服务
   * @param {ActivatedRoute} route 当前路由服务
   */
  constructor(private codeService: CodeService, private message: MessageService, private fb: FormBuilder, private route: ActivatedRoute) {
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
    cloudUser: ['', [Validators.required]],
    code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
    name: ['', [Validators.required, Validators.maxLength(64)]],
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
  save() {
    if (this.form.invalid) {
      return false;
    }
    const codemap = this.form.value as Codemap;
    this.codeService.save(codemap).then(res => {
      this.message.success('保存成功', '代码集保存成功');
      this.saved = true;
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }

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
    this.itemList.reload();
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
    {title: 'ID', titleClass: '', cell: new TextCell('codemap')} as Column,
    {title: '姓名', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '电话', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '身份证号', titleClass: '', cell: new TextCell('value')} as Column,
    {title: '证件有效期', titleClass: '', cell: new TextCell('sort')} as Column,
    {title: '离职状态', titleClass: '', cell: new TextCell('sort')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          new Menu('修改', '', (row) => this.edit(row)),
        ],
        new Menu('查看', '', (row) => this.view(row)), 'text-center',
      )} as Column,
  ];
  curItem: Codeitem;
  edit(row) {
    this.curItem = row;
    this.showForm();
  }
  view(data) {
  }

}
