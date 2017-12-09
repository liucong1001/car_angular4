/**
 * 车辆管理所管理组件
 */
import {Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ngx-transfercity',
  templateUrl: './transferCity.component.html',
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
export class TransfercityComponent implements OnInit, OnChanges {
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
    {title: '省份/直辖市', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '提档车管所', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '所属城市维护', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        new Menu('编辑', '', 'edit'),
        new Menu('禁用', '', this.disable),
      ],
      new Menu('查看', '', this.view), 'text-center',
    )} as Column,
    // {title: '修改', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '修改', titleClass: '', cell: new TextCell('name')} as Column,
  ];
  /**
   * 列表菜单回调
   * @row any
   */
  view(row: any, drop: any) {
  }
  edit(row: any) {
  }
  disable(row: any) {

  }
}
