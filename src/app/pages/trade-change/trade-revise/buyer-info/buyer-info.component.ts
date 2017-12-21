import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-buyer-info',
  templateUrl: './buyer-info.component.html',
  styleUrls: ['./buyer-info.component.scss'],
})
export class BuyerInfoComponent implements OnInit {

  constructor(
    private message: MessageService,
    private location: Location,
  ) { }

  ngOnInit() {
  }
  photos: any[] = [{
    title: '',
    source: 'assets/images/camera1.jpg',
  }];
  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
  }
  goBack() {
    this.location.back();
  }


}
