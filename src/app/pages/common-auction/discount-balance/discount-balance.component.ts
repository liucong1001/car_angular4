import {Component, OnChanges, OnInit, SimpleChanges,TemplateRef,ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Column} from '../../../@core/ui/table/table.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Router} from '@angular/router';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';

@Component({
  selector: 'ngx-discount-balance',
  templateUrl: './discount-balance.component.html',
  styleUrls: ['./discount-balance.component.scss'],
  styles: [`
    form {
      overflow: hidden;
    }
  `,
  ],
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
export class DiscountBalanceComponent implements OnInit, OnChanges {

  constructor(private router: Router) { }

  visibility = 'hidden';
  showFilter = false;

  @ViewChild('createTimeCell') private createTimeCell: TemplateRef<any>;
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
    this.columns = [
      {title: '项目名称', titleClass: 'w-15 text-center', cell: new TextCell('name')} as Column,
      {title: '项目编号', titleClass: 'w-10 text-center', cell: new TextCell('id')} as Column,
      {title: '商户', titleClass: 'w-10 text-center', cell: new TextCell('merchant.name')} as Column,
      {title: '已过户/总台数', titleClass: 'w-5 text-center', cell: new TextCell('')} as Column,
      {title: '已返现金额', titleClass: 'w-5 text-center', cell: new TextCell('discounted')} as Column,
      {title: '待返现金额', titleClass: 'w-5 text-center', cell: new TextCell('discounting')} as Column,
      {title: '总返现金额', titleClass: 'w-5 text-center', cell: new TextCell('discount')} as Column,
      {title: '状态', titleClass: 'w-5 text-center', cell: new CodemapCell('status','saleProjectStatus')} as Column,
      {title: '创建时间', titleClass: 'w-20 text-center', cell: new CustomCell(this.createTimeCell)} as Column,
      {
        title: '', titleClass: 'w-10 text-center', cell: new MenuCell(
        [

        ],
        new Menu('结算', '', this.view.bind(this)), 'text-center',
      )} as Column,
    ];
  }

  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] ;

  // 列表菜单回调
  view(row: any, drop: any) {
    this.router.navigate(['/pages/common-auction/discount-balance/balance-details', { id:row.id}]);

  }

  edit(row: any) {
  }

  disable(row: any) {

  }
  /*跳转*/
  banlance() {
    this.router.navigateByUrl('/pages/common-auction/discount-balance/balance-details');
  }
}
