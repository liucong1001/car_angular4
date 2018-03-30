import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Column} from '../../../@core/ui/table/table.component';
import {MenuCell, Menu} from '../../../@core/ui/table/cell.menu.component';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';

import {Router} from '@angular/router';

@Component({
  selector: 'ngx-trade-query',
  templateUrl: './trade-query.component.html',
  styleUrls: ['./trade-query.component.scss'],
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
export class TradeQueryComponent implements OnInit, OnChanges {

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
  // 列表列定义  preVehicle.preVehicle.labelCode  vehicleType
  columns: Column[] = [
    {title: '流水号', titleClass: 'w-10 text-center', cell: new TextCell('archiveNo')} as Column,
    {title: '车牌号', titleClass: 'w-10 text-center', cell: new TextCell('preVehicle.preVehicle.plateNumber')} as Column,
    {title: '厂牌型号', titleClass: 'w-10 text-center', cell: new TextCell('preVehicle.preVehicle.labelCode')} as Column,
    {title: '车辆类型', titleClass: 'w-10 text-center', cell: new CodemapCell('preVehicle.preVehicle.vehicleType','vehicleType')} as Column,
    {title: '卖家状态', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '买家状态', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '商户编号', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '资料', titleClass: 'w-15 text-center', cell: new TextCell('name')} as Column,
    {title: '开票状态', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '发票号', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '入库', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {title: '出库', titleClass: 'w-10 text-center', cell: new TextCell('name')} as Column,
    {
      title: '查看', titleClass: 'w-15 text-center', cell: new MenuCell(
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
  /*跳转*/
  banlance() {
    this.router.navigateByUrl('/pages/query-count/trade-query/see-message');
  }
}
