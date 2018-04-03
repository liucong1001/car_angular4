import {Component, OnChanges, OnInit, SimpleChanges,TemplateRef,ViewChild } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {visibilityToggle} from "../../../@core/ui/animations/toggle.animation";

@Component({
  selector: 'ngx-payed-cancel',
  templateUrl: './payed-cancel.component.html',
  styleUrls: ['./payed-cancel.component.scss'],
  // 定义动画
  animations: [
    visibilityToggle,
  ],
})

export class PayedCancelComponent implements OnInit {

  visibility = 'hidden';
  showFilter = false;

  @ViewChild('createTimeCell') private createTimeCell: TemplateRef<any>;
  @ViewChild('arcNoCell') private arcNoCell: TemplateRef<any>;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  constructor(
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  // 组件初始华
  ngOnInit(): void {
    this.columns =[
      {title: '订单号', titleClass: '', cell: new TextCell('payOrderId')} as Column,
      {title: '流水号', titleClass: '', cell: new CustomCell(this.arcNoCell)} as Column,
      {title: '卡号', titleClass: '', cell: new TextCell('area.name')} as Column,
      {title: '金额', titleClass: '', cell: new TextCell('area.name')} as Column,
      {title: '余额', titleClass: '', cell: new TextCell('area.name')} as Column,
      {title: '创建时间', titleClass: '', cell: new CustomCell(this.createTimeCell)} as Column ,
      {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          new Menu('退费', '', this.billRefund.bind(this)),
        ],
        new Menu('更多', '', this.view), 'text-center',
      )} as Column,

    ];
  }
  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] ;
  // 列表菜单回调
  view(row: any, drop: any) {
  }

  /**
   * 发票退费
   * @param row
   */
  billRefund(row: any) {
    this.router.navigate( ['/pages/money/payedCancel/billRefund', { id: row.id }]);
  }



}
