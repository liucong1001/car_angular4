import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
  providers:[DatePipe],
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
export class InquiryComponent implements OnInit, OnChanges {

  constructor(private datePipe: DatePipe) { }

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
    this.filter.stat = '0';
  }

  // 列表搜索条件对象
  filter: any = {
  };
  // 列表列定义
  columns: Column[] = [
    {title: '车管流水号', titleClass: 'w-15 text-center', cell: new TextCell('code')} as Column,
    {title: '流水号', titleClass: 'w-10 text-center', cell: new TextCell('archivesNo')} as Column,
    {title: '车牌号', titleClass: 'w-15 text-center', cell: new TextCell('plateNumber')} as Column,
    {title: '状态', titleClass: 'w-10 text-center', cell: new CodemapCell('status', 'archivesStatus')} as Column,
    {title: '送出时间', titleClass: 'w-20 text-center', cell: new TextCell('sendTime')} as Column,
    {title: '到达时间', titleClass: 'w-20 text-center', cell: new TextCell('arriveTime')} as Column,
    {title: '签收时间', titleClass: 'w-20 text-center', cell: new TextCell('signTime')} as Column,
    {title: '商户名称', titleClass: 'w-20 text-center', cell: new TextCell('merchant.code','merchant.name')} as Column,
  ];

  // 列表菜单回调
  view(row: any, drop: any) {
  }


  /**
   * 结束时间
   * @param $event
   */
  getStartTime($event) {
    this.filter.startTime= this.datePipe.transform($event, 'yyyy-MM-dd');
  }

  /**
   * 结束时间
   * @param $event
   */
  getEndTime($event){
    this.filter.endTime= this.datePipe.transform($event, 'yyyy-MM-dd');
  }


}
