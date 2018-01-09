import {Component, Input, OnInit} from '@angular/core';
import {TrusteeModel} from '../../../model/bussiness/trustee.model';

@Component({
  selector: 'ngx-ys-truster-info',
  templateUrl: './truster-info.component.html',
  styleUrls: ['./truster-info.component.scss'],
})
export class TrusterInfoComponent implements OnInit {
  @Input() autoinput_cheshang_source_url = '';
  trusterIdcardData = {};
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
