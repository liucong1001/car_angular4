import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent implements OnInit {
  @Input() car;
  constructor(private _router: Router) { }

  ngOnInit() {
  }
  readCard() {
  }
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording-last');
  }
  reBack() {
    this._router.navigateByUrl('/pages/bussiness/prejudication');
  }
}
