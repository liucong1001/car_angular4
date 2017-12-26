import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {MessageService} from "../../../../@core/utils/message.service";

@Component({
  selector: 'ngx-add-son',
  templateUrl: './add-son.component.html',
  styleUrls: ['./add-son.component.scss'],
})
export class AddSonComponent implements OnInit {

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
