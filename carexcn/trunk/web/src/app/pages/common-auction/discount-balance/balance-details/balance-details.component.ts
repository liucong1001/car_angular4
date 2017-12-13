import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-balance-details',
  templateUrl: './balance-details.component.html',
  styleUrls: ['./balance-details.component.scss'],
})
export class BalanceDetailsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  /*返回*/
  goBack(): void {
    this.location.back();
  }
}
