import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {CodeitemService} from '../../data/system/codeitem.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
@Component({
  selector: 'ngx-ys-codeitem-droplist',
  templateUrl: './codeitem-droplist.component.html',
  styleUrls: ['./codeitem-droplist.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CodeitemDroplistComponent),
  }],
})
export class CodeitemDroplistComponent implements OnInit, ControlValueAccessor {
  items: SelectItem[] = [];

  @Input() codeMap = '';
  @Input() pleaseSelect = '请选择';
  @Output() _selectedValue = new EventEmitter();
  private value: any;
  private change(val: any): void {}
  private touched(): void {}

  constructor(private codeitem: CodeitemService) {
  }
  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  ngOnInit() {
    this.codeitem.convert(this.codeMap).then((res) => {
      this.items.push({label: this.pleaseSelect, value: null});
        for (const r in res) {
          if (res.hasOwnProperty(r)) {
            this.items.push({label: res[r], value: r});
          }
          // console.log(r + ' ' + res[r]);
        }
    });
  }
  _onChange(event) {
    this.change(event.value);
    this._selectedValue.emit(event.value);
  }
}
