import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-market-photo-form-name',
  templateUrl: './market-photo-form-name.component.html',
  styleUrls: ['./market-photo-form-name.component.scss'],
})
export class MarketPhotoFormNameComponent implements OnInit {

  @Input() formName = [];
  @Output()  clickActive =  new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  selected = null;
  choseFormName(data, index ) {
    this.selected = index;
    this.clickActive.emit({data, index});
  }

}
