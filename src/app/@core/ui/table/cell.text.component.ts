/**
 * 文本单元格
 */
import {Component, Input} from '@angular/core';
import {Cell, CellComponent} from './cell';

@Component({
  selector: 'ngx-text-cell',
  template: '{{data[property]}}',
})
export class TextCellComponent extends CellComponent {
  @Input() data: any;
  @Input() property: string;
}

export class TextCell extends Cell {
  constructor(public property: string, public cellClass?: string) {
    super('TextCell', cellClass);
  }
}
