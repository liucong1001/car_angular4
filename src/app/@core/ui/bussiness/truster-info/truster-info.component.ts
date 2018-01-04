import { Component, OnInit } from '@angular/core';
import {TrusteeModel} from '../../../model/bussiness/trustee.model';

@Component({
  selector: 'ngx-ys-truster-info',
  templateUrl: './truster-info.component.html',
  styleUrls: ['./truster-info.component.scss'],
})
export class TrusterInfoComponent implements OnInit {
  trusterIdcardData = {};
  constructor() { }

  ngOnInit() {
  }

}
