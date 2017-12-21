import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Column} from '../../../@core/ui/table/table.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Router} from '@angular/router';
/*
按条件搜索查询
对应流水号的交易信息、车辆信息、卖方信息、买方信息修改保存
*/
@Component({
  selector: 'ngx-trade-revise',
  templateUrl: './trade-revise.component.html',
  styleUrls: ['./trade-revise.component.scss'],
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
export class TradeReviseComponent implements OnInit, OnChanges {

  constructor(private router: Router) { }

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
    {title: '流水号', titleClass: 'w-10 text-center', cell: new TextCell('code')} as Column,
    {title: '车牌号', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '厂牌型号', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '车辆类型', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '使用性质', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '手续费', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '交易价格', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '卖家状态', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '买家状态', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {
      title: '', titleClass: 'w-15 text-center', cell: new MenuCell(
        [
          new Menu('交易信息', '', 'trade'),
          new Menu('车辆信息', '', 'car'),
          new Menu('卖方信息', '', 'seller'),
          new Menu('买方信息', '', 'buyer'),
        ],
        new Menu('修改', '', this.view), 'text-center',
      )} as Column,
  ];


  // 列表菜单回调
  view(row: any, drop: any) {
  }
  car(row: any) {
    // this.router.navigateByUrl('/pages/trade-change/trade-revise/trade-info/' + row.name);
    // this.banlance('trade-info/' + row.name);
    // console.log(row.name);
  }
  trade(row: any) {
    // console.log("111");
    // this.banlance('trade-info');
  }
  /*跳转*/
  banlance(report: string) {
    this.router.navigateByUrl('/pages/trade-change/trade-revise/' + report);
  }
  disable(row: any) {

  }

}
