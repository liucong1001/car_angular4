import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-trecording2',
  templateUrl: './trecording2.component.html',
  styleUrls: ['./trecording2.component.scss'],
})
export class Trecording2Component implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/transfer/trecording-last');
  }

}
