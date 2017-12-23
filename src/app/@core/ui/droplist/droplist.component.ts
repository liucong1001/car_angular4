import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'ngx-ys-droplist',
  templateUrl: './droplist.component.html',
  styleUrls: ['./droplist.component.scss'],
})
export class DroplistComponent implements OnInit {
  @Input() selectItems: SelectItem[] = [];
  @Output() _selectedValue = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }
  _onChange(event) {
    this._selectedValue.emit(event.value);
  }
}
