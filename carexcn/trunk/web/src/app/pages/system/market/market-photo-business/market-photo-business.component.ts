import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-market-photo-business',
  templateUrl: './market-photo-business.component.html',
  styleUrls: ['./market-photo-business.component.scss'],
})
export class MarketPhotoBusinessComponent implements OnInit {

  @Input() business = [];
  @Output()  clickActive =  new EventEmitter<any>();
  constructor() { }
  ngOnInit() {
  }

  selected = 0;
  choseBusiness(data, index) {
    console.log('选择了', data, index);
    this.selected = index;
    this.clickActive.emit({data, index});
  }
}
