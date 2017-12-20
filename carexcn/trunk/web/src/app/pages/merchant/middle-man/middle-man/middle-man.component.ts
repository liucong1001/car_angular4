import {Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Menu, MenuCell} from '../../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../../@core/ui/table/table.component';
import {TextCell} from '../../../../@core/ui/table/cell.text.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ngx-middle-man',
  templateUrl: './middle-man.component.html',
  styleUrls: ['./middle-man.component.scss'],
  styles: [`
  form{
    overflow: hidden;
  }
`,
  ],
  // 定义动画
  animations: [
    trigger('visibilityChanged', [
      // state 控制不同的状态下对应的不同的样式
      state('shown', style({ height: 'auto' })),
      state('hidden', style({ height: '0px', opacity: '0' })),
      // transition 控制状态到状态以什么样的方式来进行转换
      transition('shown <=> hidden', [animate('100ms ease-in-out'), animate('100ms')]),
    ]),
  ],
})
export class MiddleManComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  visibility = 'hidden';
  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] = [
    {title: '名称', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '电话', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '地址', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '证件号码', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '商贩属性', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '备案日期', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '商户编号', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '所属商户', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '合作关系', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        new Menu('编辑', '', 'edit'),
        new Menu('禁用', '', this.disable),
      ],
      new Menu('查看', '', this.view), 'text-center',
    )} as Column,
  ];
    // 列表菜单回调
    view(row: any, drop: any) {
    }
    edit(row: any) {
    }
    disable(row: any) {

    }

}
