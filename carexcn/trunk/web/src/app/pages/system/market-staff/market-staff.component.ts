import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Column} from '../../../@core/ui/table/table.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {CodemapCell} from '../../../@core/ui/table/cell';

/**
 * 市场员工管理组件
 */
@Component({
  selector: 'ngx-market-staff',
  templateUrl: './market-staff.component.html',
  styleUrls: ['./market-staff.component.scss'],
  // 定义动画
  animations: [
    trigger('visibilityChanged', [
      // state 控制不同的状态下对应的不同的样式
      state('shown' , style({ height: 'auto'})),
      state('hidden', style({ height: '0px',  opacity: '0'})),
      // transition 控制状态到状态以什么样的方式来进行转换
      transition('shown <=> hidden', [animate('100ms ease-in-out'), animate('100ms')] ),
    ]),
  ],
})
export class MarketStaffComponent implements OnInit {

  constructor() { }
  visibility = 'hidden';
  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  filter: any = {};

  columns: Column[];
  ngOnInit() {
    this.columns = [
      {title: '员工姓名', titleClass: '', cell: new TextCell('userName')} as Column,
      {title: '登录ID', titleClass: '', cell: new TextCell('loginName')} as Column,
      {title: '市场', titleClass: '', cell: new TextCell('market.name')} as Column,
      {title: '岗位', titleClass: '', cell: new CodemapCell('staffPosition')} as Column,
    ];
  }
}
