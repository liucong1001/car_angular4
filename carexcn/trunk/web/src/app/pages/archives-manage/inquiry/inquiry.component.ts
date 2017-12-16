import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';

@Component({
  selector: 'ngx-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
  /*styles: [`
    form {
      overflow: hidden;
    }
  `,
  ],*/
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
export class InquiryComponent implements OnInit, OnChanges {

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
    {title: '车管流水号', titleClass: 'w-25 text-center', cell: new TextCell('code')} as Column,
    {title: '流水号', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '车牌号', titleClass: 'w-15 text-center', cell: new TextCell('name')} as Column,
    {title: '状态', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '送出时间', titleClass: 'w-20 text-center', cell: new TextCell('name')} as Column,
    {title: '到达时间', titleClass: 'w-20 text-center', cell: new TextCell('name')} as Column,
    {title: '签收时间', titleClass: 'w-20 text-center', cell: new TextCell('name')} as Column,
    {title: '商户名称', titleClass: 'w-20 text-center', cell: new TextCell('name')} as Column,
    /*{
      title: '', titleClass: 'w-15 text-center', cell: new MenuCell(
        [
          new Menu('编辑', '', 'edit'),
          new Menu('禁用', '', this.disable),
        ],
        new Menu('查看', '', this.view), 'text-center',
      )} as Column,
    {
      title: '', titleClass: 'w-15 text-center', cell: new MenuCell(
        [
          new Menu('编辑', '', 'edit'),
          new Menu('禁用', '', this.disable),
        ],
        new Menu('撤销订单', '', this.view), 'text-center',
      )} as Column,*/
  ];

  // 列表菜单回调
  view(row: any, drop: any) {
  }

  edit(row: any) {
  }

  disable(row: any) {

  }
}
