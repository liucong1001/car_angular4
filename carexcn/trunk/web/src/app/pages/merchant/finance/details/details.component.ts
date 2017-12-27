import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../../@core/ui/table/table.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
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
export class DetailsComponent implements OnInit, OnChanges {

  constructor(private location: Location, private router: Router) { }

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
    {title: '卡号', titleClass: 'cards.number', cell: new TextCell('code')} as Column,
    {title: '商户编号', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '商户名称', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '账户名称', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '账户余额', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '充值余额', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '赠送余额', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '状态', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '账户详情', titleClass: '', cell: new TextCell('name')} as Column,
    {
      title: '', titleClass: 'w-15 text-center', cell: new MenuCell(
        [
          new Menu('查看', '', 'see'),
          new Menu('解绑', '', 'car'),
          new Menu('挂失', '', 'seller'),
          new Menu('修改折扣', '', 'buyer'),
        ],
        new Menu('操作', '', this.view), 'text-center',
      )} as Column,
  ];


  // 列表菜单回调
  view(row: any, drop: any) {
  }
  see(row: any) {
  }
  /*返回*/
  goBack() {
    this.location.back();
  }
  /*跳转*/
  jump() {
    this.router.navigateByUrl('/pages/merchant/finance/adds');
  }
}
