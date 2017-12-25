import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-ys-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CalendarComponent),
  }],
})
/**
 * 目前完成为基本可用
 * 编写完成了独立控件，适配Cosmic主题样式，可选择日期
 * 但估计后期还有很多更细的定制化功能
 */
export class CalendarComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = '日历';
  @Input() dateFormat = 'yy-mm-dd';
  @Input() defaultDate = '';
  @Input() yearRange = '2010:2050';
  @Output() _calendarValue = new EventEmitter();
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
  writeValue(obj: any): void {
    this.dateFormat = obj;
  }
  registFunc(value: any) {}
  registerOnChange(fn: any): void {
    this.registFunc = fn;
  }
  registerOnTouched(fn: any): void {
  }

  ngOnInit() {
  }
  _onSelect(_event) {
    this.registFunc(_event);
    this._calendarValue.emit(_event);
  }
}
