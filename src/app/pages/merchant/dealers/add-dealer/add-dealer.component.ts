import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Location} from "@angular/common";

@Component({
  selector: 'ngx-add-dealer',
  templateUrl: './add-dealer.component.html',
  styleUrls: ['./add-dealer.component.scss'],
})
export class AddDealerComponent implements OnInit {

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
  /*返回*/
  goBack() {
    this.location.back();
  }
}
