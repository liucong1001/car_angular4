/**
 * 车辆类型管理组件
 */
import {Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'ngx-cartype',
  templateUrl: './cartype.component.html',
  styleUrls: [],
  styles: [`
        form{
          overflow: hidden;
        }
    `,
  ],
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
export class CartypeComponent implements OnInit, OnChanges {
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
    {title: '名称', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '市场代号', titleClass: '', cell: new TextCell('cloudUser')} as Column,
    {title: '车辆类型', titleClass: '', cell: new TextCell('vehicleTypeCode')} as Column,
    {title: '车辆类别', titleClass: '', cell: new TextCell('vehicleCategoryCode')} as Column,
    {title: '市场', titleClass: '', cell: new TextCell('market.name')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        new Menu('编辑', '', this.edit.bind(this)),
        new Menu('禁用', '', this.disable),
      ],
      new Menu('查看', '', this.view), 'text-center',
    )} as Column,
  ];
  // 列表菜单回调
  view(row: any, drop: any) {
  }
  edit(row: any) {
    this.router.navigate( ['/pages/system/cartype/edit', { id: row.id}]);

  }
  disable(row: any) {

  }
}
