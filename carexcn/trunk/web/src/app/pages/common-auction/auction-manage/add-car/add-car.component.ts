import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss'],
})
export class AddCarComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  /*返回*/
  goBack() {
    this.location.back();
  }
}
