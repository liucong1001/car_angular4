import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-ys-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.scss'],
})
export class CardetailComponent implements OnInit {
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
