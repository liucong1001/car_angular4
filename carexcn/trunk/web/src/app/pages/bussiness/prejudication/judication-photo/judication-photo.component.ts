import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../../../@core/device/device.service';

/**
 * 预审业务 - 预审审核 - 卖方拍照 --—接口与页面的交互逻辑
 * 1、拍照卖家头像，录入卖家指纹
 * 2、
 */
@Component({
  selector: 'ngx-judication-photo',
  templateUrl: './judication-photo.component.html',
  styleUrls: ['./judication-photo.component.scss'],
  providers: [DeviceService],
})
export class JudicationPhotoComponent implements OnInit {
  cameras: any[] = [{
    title: '卖家头像拍照',
    source: 'assets/images/camera1.jpg',
  }];
  constructor() { }
  ngOnInit() {
  }
}
