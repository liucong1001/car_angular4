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
  value: string;
  results: string[];
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
  }
  search(_event) {
    this.rest.get(this.results_resource_url + _event.query).subscribe((res) => this.results = res as string[]);
  }
  selectedValue(_event) {
    this.registFunc(_event);
    this._value.emit(_event);
  }
}
