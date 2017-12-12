import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-recording3',
  templateUrl: './recording3.component.html',
  styleUrls: ['./recording3.component.scss'],
})
export class Recording3Component implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording4');
  }
}
