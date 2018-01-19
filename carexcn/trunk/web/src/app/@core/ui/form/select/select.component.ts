import {Component, Input, OnInit} from '@angular/core';
import {BaseFormControl} from '../base-form-control';

@Component({
  selector: 'ngx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends BaseFormControl implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

  @Input() codemap: string;
  @Input() items: any[];
  @Input() textField: string;
  @Input() valueField: string;
  @Input() defautOptionText = '无';
  @Input() defautOptionValue = '';
}
