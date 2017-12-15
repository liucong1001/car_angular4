import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-day-trade',
  templateUrl: './day-trade.component.html',
  styleUrls: ['./day-trade.component.scss'],
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
export class DayTradeComponent implements OnInit, OnChanges {

  constructor(private location: Location) {
    // this.dat = this.time.years + '-' + this.time.months + '-' + this.time.days;
  }

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
    this.time = {start: '', end: ''};
    // this.dat = this.formatDate(new Date);
  }
  time: {
    start: string,
    end: string,
  };
  /*time: {
    years: string|number,
    months: string|number,
    days: string|number,
  };
  dat: string = this.time.years + '-' + this.time.months + '-' + this.time.days ;
  formatDate(date: Date): string {
    const dateNow = date;
    const year: string|number = dateNow.getFullYear();
    let month: string|number;
    month = dateNow.getMonth() + 1;
    let day: string|number;
    day = dateNow.getDate();
    let data: string|number;
    // return new Date(year, month, day);

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    data = year +  '-' + month + '-' + day;
    return data;
    // return year
  }
*/
// 列表搜索条件对象
  filter: any = {};
  /*返回*/
  goBack() {
    this.location.back();
  }

}
