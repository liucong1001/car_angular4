import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ngx-ys-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
/**
 * 目前完成为基本可用
 * 编写完成了独立控件，适配Cosmic主题样式，可选择日期
 * 但估计后期还有很多更细的定制化功能
 * 比如选择时分秒，指定默认日期，制定提示文字，限制选中日期范围，获取时间值，获取多个时间等。。。
 * TODO: 在做相应功能时一一定制
 */
export class CalendarComponent implements OnInit {
  /**
   * 本地化
   */
  zh_CN: any;

  /**
   * 构造函数
   */
  constructor() {
    this.zh_CN = {
      firstDayOfWeek: 0,
      dayNames: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
      monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊' ],
      today: '今天',
      clear: '清除',
    };
  }

  ngOnInit() {
  }

}
