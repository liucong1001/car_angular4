import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-codemirror',
  templateUrl: './codemirror.component.html',
  styleUrls: ['./codemirror.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CodemirrorComponent),
  }],
})
export class CodemirrorComponent implements OnInit, ControlValueAccessor {
  onChange(event: any): void {}
  onTouched(): void {}
  value: any;

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  constructor() { }

  ngOnInit() {
  }

  config = {
    lineNumbers: true,
    mode: 'javascript',
    // theme: 'ambiance',
  };
}
