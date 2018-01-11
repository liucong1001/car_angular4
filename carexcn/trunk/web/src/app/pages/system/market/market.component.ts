/**
 * 用户管理组件
 */
import {Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common';
// import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'ngx-market',
  templateUrl: './market.component.html',
  styleUrls: [],
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
export class MarketComponent implements OnInit, OnChanges {
  visibility = 'hidden';
  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  constructor(
    public router: Router,
    private route: ActivatedRoute,
  ) { }

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
    {title: '市场名', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '市场代码', titleClass: '', cell: new TextCell('cloudUser')} as Column,
    {title: '地区', titleClass: '', cell: new TextCell('area.name')} as Column,
    {title: '创建时间', titleClass: '', cell: new TextCell('createTime' )} as Column ,
    {title: '备注', titleClass: '', cell: new TextCell('memo')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        new Menu('编辑', '', this.edit.bind(this)),
        new Menu('厂牌型号', '', this.brandModelLink.bind(this)),
        new Menu('业务费用', '', this.feeLink.bind(this)),
        new Menu('PC证件维护', '', this.photoLink.bind(this)),
        new Menu('App证件维护', '', this.photoLinkApp.bind(this)),
      ],
      new Menu('更多', '', this.view), 'text-center',
    )} as Column,

  ];
  // 列表菜单回调
  view(row: any, drop: any) {
  }
  edit(row: any) {
    this.router.navigate( ['/pages/system/market/market/edit', { id: row.id }]);
  }
  disable(row: any) {

  }
  brandModelLink(row: any ) {
     this.router.navigateByUrl('/pages/system/market/brand');
  }

  feeLink(row: any ) {
    this.router.navigate( ['/pages/system/market/fee', { id: row.id , marketName: row.name}]);
  }

  photoLink(row: any) {
    this.router.navigate( ['/pages/system/market/photo', { id: row.id , marketName: row.name,isApp:0}]);
  }

  photoLinkApp(row: any) {
    this.router.navigate( ['/pages/system/market/photo', { id: row.id , marketName: row.name,isApp:1}]);
  }

}
