/**
 * 车辆黑名单组件
 */
import {Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss'],
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
export class BlacklistComponent implements OnInit, OnChanges {
  visibility = 'hidden';
  showFilter = false;
  createTime: Date;
  images: any[];
  model: NgbDateStruct;
  date: {year: number, month: number};
  ch = {
    /** 每周第一天，0代表周日 */
    firstDayOfWeek: 0,
    /** 每周天数正常样式 */
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    /** 每周天数短样式（位置较小时显示） */
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    /** 每周天数最小样式 */
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    /** 每月月份正常样式 */
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    /**每月月份短样式 */
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    today: '今天',
    clear: '清除',
};

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
    this.images = [];
    this.images.push({source: './../../../../assets/images/alan.png',
     thumbnail: './../../../../assets/images/alan.png', title: 'Sopranos 1'});
     const now = new Date();

  }
  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] = [
    {title: '车牌号', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '理由', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '创建时间', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
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
}
