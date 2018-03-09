import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

/**
 * API_URL:/rest/business/trade/prejudication POST
 *
 */
@Component({
  selector: 'ngx-prejudication',
  templateUrl: './prejudication.component.html',
  styleUrls: ['./prejudication.component.scss'],
})
export class PrejudicationComponent implements OnInit {
  cameras: any[] = [{
    title: '预审录入',
    source: 'assets/images/camera1.jpg',
    linkto: '/pages/business/prejudication/recording',
  }, {
    title: '预审审核',
    source: 'assets/images/camera2.jpg',
    linkto: '/pages/business/prejudication/judication',
  }];

  selectCamera(linkto: string) {
    // console.log(linkto);
    this._router.navigateByUrl(linkto);
  }
  constructor(private _router: Router) { }

  ngOnInit() {
  }

}
