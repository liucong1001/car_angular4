import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ngx-market-photo-certificate-code',
  templateUrl: './market-photo-certificate-code.component.html',
  styleUrls: ['./market-photo-certificate-code.component.scss'],
})
export class MarketPhotoCertificateCodeComponent implements OnInit {

  @Input() CertifiCateCode = [];
  @Output()  clickActive =  new EventEmitter();
  @Output()  choseForm =  new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  show = false;
  selected = null;
  @Input() formName = [];

  choseCode(data, index) {
    this.selected = index;
    this.show = !this.show;
    this.clickActive.emit({data, index});
  }
  choseFormName(event){
    this.choseForm.emit(event);
  }

}
