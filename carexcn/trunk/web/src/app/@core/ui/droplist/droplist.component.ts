import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {ControlValueAccessor, FormControl} from '@angular/forms';

@Component({
  selector: 'ngx-ys-droplist',
  templateUrl: './droplist.component.html',
  styleUrls: ['./droplist.component.scss'],
})
export class DroplistComponent implements ControlValueAccessor {
  @Input() selectItems: SelectItem[] = [];
  @Output() _selectedValue = new EventEmitter();
  @Input() _fromControl = FormControl;
  _value: any;
  constructor() {
  }

  writeValue(obj: any): void {
    this._value = obj;
  }
  registFunc(value: any) {
  }
  registerOnChange(fn: any): void {
    this.registFunc = fn;
  }

  registerOnTouched(fn: any): void {
  }
  ngOnInit() {
  }
  _onChange(event) {
    this.registFunc(event.value);
    this._selectedValue.emit(event.value);
  }
}
