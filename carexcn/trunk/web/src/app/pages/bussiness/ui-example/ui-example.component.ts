import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../@core/utils/message.service';

@Component({
  selector: 'app-ui-example',
  templateUrl: './ui-example.component.html',
  styleUrls: ['./ui-example.component.scss']
})
export class UiExampleComponent implements OnInit {
  private current_calendar_value:string;
  constructor(private message: MessageService) { }

  ngOnInit() {
  }

  /**
   * 获取子组件中的时间值
   */
  getYsCalendarValue($event) {
    this.message.info('控件示例', '刚刚选择了:'+$event);
    this.current_calendar_value = $event;
  }
  showYsCalendarValue() {
    this.message.info('控件示例', '当前选择的时间是:' + this.current_calendar_value);
  }
}
