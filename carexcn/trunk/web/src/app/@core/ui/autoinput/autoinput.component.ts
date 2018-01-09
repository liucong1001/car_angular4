import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from '../../utils/rest.service';
import {ControlValueAccessor, FormControl} from '@angular/forms';

@Component({
  selector: 'ngx-ys-autoinput',
  templateUrl: './autoinput.component.html',
  styleUrls: ['./autoinput.component.scss'],
})
export class AutoinputComponent implements OnInit, ControlValueAccessor {
  @Output() _value = new EventEmitter();
  @Input() results_resource_url: string;
  @Input() showProperty: string;
  @Input() getProperty: string;
  @Input() disabled: boolean;
  @Input() defaultValue: any;
  @Input() placeholder: string;
  value: any;
  results: any[];
  constructor(private rest: RestService) {
  }
  writeValue(obj: any): void {
    this.value = obj;
  }
  registFunc(value: any) {}
  registerOnChange(fn: any): void {
    this.registFunc = fn;
  }

  registerOnTouched(fn: any): void {
  }

  ngOnInit() {
    if (this.showProperty == null || this.showProperty === undefined) {
      throw new Error('showProperty 是必须的。');
    }
    if (this.results_resource_url == null || this.results_resource_url === undefined) {
      throw new Error('results_resource_url 是必须的。');
    }
    if (this.defaultValue != null || this.defaultValue !== undefined) {
      this.value = this.defaultValue;
    }
  }
  search(_event) {
    if (_event) {
      this.rest.get(this.results_resource_url + _event.query).subscribe((res) => this.results = res as any[]);
    }
  }
  selectedValue(_event) {
    if ( undefined !== this.getProperty ) {
      _event = _event[this.getProperty];
    }
    this.registFunc(_event);
    this._value.emit(_event);
  }
}
