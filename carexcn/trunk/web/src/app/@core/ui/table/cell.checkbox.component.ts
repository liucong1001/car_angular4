/**
 * 勾选框单元格
 */
import {Component, Input, OnInit} from '@angular/core';
import {Cell, CellComponent} from './cell';

@Component({
  selector: 'ngx-checkbox-cell',
  template: '<label class="custom-control custom-checkbox">' +
  '<input #checkbox class="custom-control-input" type="checkbox" checked="getData(data,property)" ' +
  '(change)="callback(checkbox.checked)" [disabled]="this._disabled">' +
  '<span class="custom-control-indicator"></span></label>',
})
export class CheckboxCellComponent extends CellComponent implements OnInit {
  @Input() data: any;
  @Input() property: string;
  @Input() _disabled: boolean;
  @Input() callback;
  ngOnInit(): void {
  }
  getData(data: any, property: string) {
    return '1' === data[property] ? true : false;
  }
}

export class CheckboxCell extends Cell {
  constructor(
    public property: string,
    public cellClass: string,
    public _disabled: boolean,
    public callback = (res) => {console.info(res); console.info(_disabled); },
  ) {
    super('CheckboxCell', cellClass);
  }
}
