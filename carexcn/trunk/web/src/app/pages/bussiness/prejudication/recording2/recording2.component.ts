import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-recording2',
  templateUrl: './recording2.component.html',
  styleUrls: ['./recording2.component.scss']
})
export class Recording2Component implements OnInit {
  cameras: any[] = [{
    title: '身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '身份证反面',
    source: 'assets/images/camera2.jpg',
  }];
  constructor(private _router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    // console.log('/pages/bussiness/prejudication/recording3');
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording3');
  }
}
