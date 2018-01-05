import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-ys-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.scss'],
})
export class SellerInfoComponent implements OnInit {
  @Input() btn_show = true;
  photos: any[] = [{
    title: '身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '身份证反面',
    source: 'assets/images/camera2.jpg',
  }];
  constructor() { }

  ngOnInit() {
  }

}
