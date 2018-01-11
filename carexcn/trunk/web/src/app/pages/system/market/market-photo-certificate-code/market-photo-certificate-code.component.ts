import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

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
  selected = null;
  @Input() formName = [];
  choseCode(data, index) {
    this.selected = index;
    this.clickActive.emit({data, index});
  }
  choseFormName(event){
    this.choseForm.emit(event);
  }

}
