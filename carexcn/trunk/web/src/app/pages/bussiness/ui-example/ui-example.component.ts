import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../@core/utils/message.service';
import {DeviceService} from '../../../@core/device/device.service';
import {CarModel} from '../../../@core/model/bussiness/car.model';

@Component({
  selector: 'ngx-ui-example',
  templateUrl: './ui-example.component.html',
  styleUrls: ['./ui-example.component.scss'],
  providers: [DeviceService],
})
export class UiExampleComponent implements OnInit {
  private current_calendar_value: string;
  private current_calendar_value2: string;
  public car: CarModel = new CarModel();
  photos: any[] = [{
    title: '测试图一',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '测试图二',
    source: 'assets/images/camera2.jpg',
  }];
  constructor(private message: MessageService) { }

  ngOnInit() {
  }

  /**
   * 获取子组件中的时间值
   */
  getYsCalendarValue($event) {
    this.message.info('日期控件示例', '刚刚选择了:' + $event);
    // this.current_calendar_value = new Date($event).toISOString().slice(0, 10); // 使用国际标准时间
    this.current_calendar_value = new Date($event).toString().slice(0, 10); // 使用当前时区时间
  }

  /**
   * 弹出消息提示当前子控件中用户选择的值
   */
  showYsCalendarValue() {
    this.message.info('日期控件示例', '当前选择的时间是:' + this.current_calendar_value);
  }

  /**
   * 获取子组件中的时间值
   */
  getYsCalendarValue2($event) {
    this.message.info('月份控件示例', '刚刚选择了:' + $event);
    const today = new Date($event);
    this.current_calendar_value2 = today.getFullYear() + '年' + (today.getMonth() + 1).toLocaleString() + '月'; // 一月是0
  }

  /**
   * 弹出消息提示当前子控件中用户选择的值
   */
  showYsCalendarValue2() {
    this.message.info('月份控件示例', '当前选择的月份是:' + this.current_calendar_value2);
  }
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
  }
  readCard() {

  }
}
