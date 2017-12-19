import {Component, Input, OnInit} from '@angular/core';
import {DeviceService} from '../../../../../@core/device/device.service';

@Component({
  selector: 'ngx-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
  providers: [DeviceService],
})
export class CarDetailComponent implements OnInit {
  @Input() car;
  photos: any[] = [{
    title: '行驶证正本',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '行驶证副本',
    source: 'assets/images/camera2.jpg',
  }, {
    title: '登记证书首页',
    source: 'assets/images/camera3.jpg',
  }, {
    title: '登记证书末页',
    source: 'assets/images/camera4.jpg',
  }];
  constructor() { }

  ngOnInit() {
  }
  readCard() {
  }
}
