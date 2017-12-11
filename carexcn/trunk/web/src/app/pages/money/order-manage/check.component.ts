import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-check',
  templateUrl: 'check.component.html',
  styleUrls: ['check.component.scss'],
})
export class CheckComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor (private location: Location) {}
  /*返回*/
  goBack(): void {
    this.location.back();
  }
}
