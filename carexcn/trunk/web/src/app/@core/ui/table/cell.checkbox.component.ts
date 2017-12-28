/**
 * 勾选框单元格
 */
import {Component, Input, OnInit} from '@angular/core';
import {Cell, CellComponent} from './cell';

@Component({
  selector: 'ngx-checkbox-cell',
  templateUrl: './cell.checkbox.component.html',
})
export class CheckboxCellComponent extends CellComponent implements OnInit {
  @Input() data: any;
  @Input() property: string;
  @Input() _disabled: boolean;
  @Input() trueValue: any;
  @Input() callback;
  ngOnInit(): void {
  }
}

export class CheckboxCell extends Cell {
  constructor(
    public property: string,
    public cellClass: string,
    public _disabled: boolean,
    public trueValue: any,
    public callback = (res) => {console.info(res); console.info(_disabled); },
  ) {
    super('CheckboxCell', cellClass);
  }
}
