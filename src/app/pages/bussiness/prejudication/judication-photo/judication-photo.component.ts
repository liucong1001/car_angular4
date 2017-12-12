import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-judication-photo',
  templateUrl: './judication-photo.component.html',
  styleUrls: ['./judication-photo.component.scss'],
})
export class JudicationPhotoComponent implements OnInit {
  cameras: any[] = [{
    title: '身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '身份证反面',
    source: 'assets/images/camera2.jpg',
  }, {
    title: '代办联系人头像',
    source: 'assets/images/camera3.jpg',
  }, {
    title: '商户联系人确认单',
    source: 'assets/images/camera4.jpg',
  }];
  constructor() { }
  ngOnInit() {
  }
}
