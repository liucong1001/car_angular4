import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';

@Component({
  selector: 'ngx-appendix-query',
  templateUrl: './appendix-query.component.html',
  styleUrls: ['./appendix-query.component.scss'],
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
export class AppendixQueryComponent implements OnInit, OnChanges {

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
    {title: '流水号', titleClass: 'w-25 text-center', cell: new TextCell('code')} as Column,
    {title: '卖家个人图像', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '卖家身份证正面', titleClass: 'w-15 text-center', cell: new TextCell('name')} as Column,
    {title: '卖家身份证反面', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '卖家个人指纹', titleClass: 'w-20 text-center', cell: new TextCell('name')} as Column,
    {title: '组织机构正面', titleClass: 'w-20 text-center', cell: new TextCell('name')} as Column,
    {title: '组织机构反面', titleClass: 'w-20 text-center', cell: new TextCell('name')} as Column,
    /*{
      title: '结算', titleClass: 'w-15 text-center', cell: new MenuCell(
        [
          new Menu('编辑', '', 'edit'),
          new Menu('禁用', '', this.disable),
        ],
        new Menu('结算', '', this.view), 'text-center',
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
