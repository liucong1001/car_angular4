import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-month-trade',
  templateUrl: './month-trade.component.html',
  styleUrls: ['./month-trade.component.scss'],
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
export class MonthTradeComponent implements OnInit, OnChanges {

  constructor(private location: Location) { }

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
    this.time = {years: this.year};
  }
  time: {
    years: number,
  };
  year = new Date().getFullYear();

  // 列表搜索条件对象
  filter: any = {};
  /*返回*/
  goBack() {
    this.location.back();
  }


}
