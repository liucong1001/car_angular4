/**
 * 文本单元格
 */
import {Component, Input} from '@angular/core';
import {Cell, CellComponent} from './cell';

@Component({
  selector: 'ngx-text-cell',
  template: '{{property | getProperty: data}}',
})
export class TextCellComponent extends CellComponent {
  @Input() data: any;
  @Input() property: string;
  // getData(d: any, key: string) {
  //   const dotIdx = key.indexOf('.');
  //   let props = key;
  //   if (dotIdx > 1) {
  //     props = key.substring(0, dotIdx);
  //   }
  //   const ret = d[props];
  //   if (ret === undefined || ret === null || dotIdx < 1) {
  //     return ret;
  //   }
  //   return this.getData(ret, key.substring(dotIdx + 1));
  // }
}

export class TextCell extends Cell {
  constructor(public property: string, public cellClass?: string) {
    super('TextCell', cellClass);
  }
}
