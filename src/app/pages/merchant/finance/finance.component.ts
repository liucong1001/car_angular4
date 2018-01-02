import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';

/**
 * 商户财务维护
 * 展示财务有关信息
 * 修改折扣，IC卡绑卡，，，，挂失，退卡
 *
 * 列表展示哪些信息，还没有定
 */
@Component({
  selector: 'ngx-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
  // 定义动画
  animations: [
    trigger('visibilityChanged', [
      // state 控制不同的状态下对应的不同的样式
      state('shown', style({height: 'auto'})),
      state('hidden', style({height: '0px', opacity: '0'})),
      // transition 控制状态到状态以什么样的方式来进行转换
      transition('shown <=> hidden', [animate('100ms ease-in-out'), animate('100ms')]),
    ]),
  ],
})
export class FinanceComponent implements OnInit, OnChanges {

  constructor() { }

  visibility = 'hidden';
  showFilter = false;

  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }

  // ngOnChanges 可监控组件变量
  ngOnChanges(changes: SimpleChanges): void {
  }

  // 组件初始华
  ngOnInit(): void {
  }

  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] = [
    {title: '商户名', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '编码', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '证件号', titleClass: '', cell: new TextCell('certCode')} as Column,
    {title: '联系方式', titleClass: '', cell: new TextCell('phone')} as Column,
    {title: '地址', titleClass: '', cell: new TextCell('address')} as Column,
    {title: '类型', titleClass: '', cell: new TextCell('isPersonal')} as Column,
    {
      title: '', titleClass: 'w-15 text-center', cell: new MenuCell(
        [
          new Menu('查看', '', 'see'),
          new Menu('绑卡', '', 'binding'),
          /*new Menu('挂失', '', 'seller'),
          new Menu('修改折扣', '', 'buyer'),*/
        ],
        new Menu('操作', '', this.view), 'text-center',
      )} as Column,
  ];


  // 列表菜单回调
  view(row: any, drop: any) {
  }
  see(row: any) {
  }
  binding(row: any) {
  }
}
