import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {MessageService} from '../../../../@core/utils/message.service';

@Component({
  selector: 'ngx-add-linkman',
  templateUrl: './add-linkman.component.html',
  styleUrls: ['./add-linkman.component.scss'],
})
export class AddLinkmanComponent implements OnInit {

  public fingerImgUrl = '/assets/images/camera1.jpg';
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
