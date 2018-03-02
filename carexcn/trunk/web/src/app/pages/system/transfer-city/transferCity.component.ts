/**
 * 车辆管理所管理组件
 */
import {Component, OnChanges, OnInit, SimpleChanges,TemplateRef, ViewChild } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';

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
    this.columns =  [
      {title: '提档车管所', titleClass: '', cell: new TextCell('management.name')} as Column,
      {title: '转出地', titleClass: '', cell: new TextCell('city.name')} as Column,
      {title: '创建时间', titleClass: '', cell: new CustomCell(this.createTimeCell)} as Column,
      {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          new Menu('编辑', '', this.edit.bind(this)),
          new Menu('禁用', '', this.disable),
        ],
        new Menu('查看', '', this.view), 'text-center',
      )} as Column,
    ];
  }

  constructor(
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  @ViewChild('createTimeCell') private createTimeCell: TemplateRef<any>;
  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] ;
  /**
   * 列表菜单回调
   * @row any
   */
  view(row: any, drop: any) {
  }
  edit(row: any) {
    this.router.navigate( ['/pages/system/transfercity/edit', { id: row.id }]);
  }
  disable(row: any) {

  }
}
