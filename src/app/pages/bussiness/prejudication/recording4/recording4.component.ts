import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-recording4',
  templateUrl: './recording4.component.html',
  styleUrls: ['./recording4.component.scss']
})
export class Recording4Component implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    // console.log('/pages/bussiness/prejudication/recording-last');
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording-last');
  }
}
