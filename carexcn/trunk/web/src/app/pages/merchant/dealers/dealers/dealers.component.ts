import {Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Menu, MenuCell} from '../../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../../@core/ui/table/table.component';
import {TextCell} from '../../../../@core/ui/table/cell.text.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ngx-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss'],
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
export class DealersComponent implements OnInit {

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
    {title: '商户名', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '编码', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '组织机构代码', titleClass: '', cell: new TextCell('certCode')} as Column,
    {title: '联系方式', titleClass: '', cell: new TextCell('phone')} as Column,
    {title: '地址', titleClass: '', cell: new TextCell('address')} as Column,
    {title: '交易折扣', titleClass: '', cell: new TextCell('discount')} as Column,
    {title: '证件有效期', titleClass: '', cell: new TextCell('endDate')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        new Menu('编辑', '', 'linkman'),
        new Menu('禁用', '', this.disable),
      ],
      new Menu('查看', '', this.view), 'text-center',
    )} as Column,
  ];
  // 列表菜单回调
  view(row: any, drop: any) {
  }
  linkman(row: any) {
  }
  disable(row: any) {

  }

}
