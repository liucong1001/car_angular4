import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from '../../utils/rest.service';

@Component({
  selector: 'ngx-ys-autoinput',
  templateUrl: './autoinput.component.html',
  styleUrls: ['./autoinput.component.scss'],
})
export class AutoinputComponent implements OnInit {
  @Output() _value = new EventEmitter();
  @Input() results_resource_url: string;
  value: string;
  results: string[];
  constructor(private rest: RestService) {
  }

  ngOnInit() {
  }
  search(_event) {
    this.rest.get(this.results_resource_url + _event.query).subscribe((res) => this.results = res as string[]);
  }
  selectedValue(_event) {
    this._value.emit(_event);
  }
}
