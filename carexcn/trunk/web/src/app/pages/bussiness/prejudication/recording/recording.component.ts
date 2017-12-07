import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss']
})
export class RecordingComponent implements OnInit {

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
  constructor(private _router: Router) { }
  selectCamera(camera) {
    // console.log(camera);
  }
  ngOnInit() {
  }
  onSubmit() {
    // console.log('/pages/bussiness/prejudication/recording');
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording2');
  }
}
