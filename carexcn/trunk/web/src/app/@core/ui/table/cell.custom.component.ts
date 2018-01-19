import {
  Component, Input, OnInit, TemplateRef, ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {CellComponent, CustomCell } from './cell';

@Component({
  selector: 'ngx-custom-cell',
  template: `
    <div #customCell></div>
    <ng-template #dictCell let-data let-cell="cell">{{cell.dict[cell.property | getProperty: data]}}</ng-template>
    <ng-template #codemapCell let-data let-cell="cell">{{cell.property | getProperty: data | code_trans:cell.codemap | async}}</ng-template>
  `,
})
export class CustomCellComponent extends CellComponent implements OnInit {
  // constructor() {
  //   // super();
  // }

  @Input() data: any;
  @Input() cell: CustomCell;
  @ViewChild('customCell', {read: ViewContainerRef})
  private target: ViewContainerRef;

  @ViewChild('codemapCell')
  private codemapCell: TemplateRef<any>;
  @ViewChild('dictCell')
  private dictCell: TemplateRef<any>;

  ngOnInit(): void {
    const templateMap = {
      codemapCell: this.codemapCell,
      dictCell: this.dictCell,
    };
    if (this.cell.template) {
      if (typeof this.cell.template === 'string') {
        if (templateMap[this.cell.template]) {
          this.target.createEmbeddedView(templateMap[this.cell.template], {$implicit: this.data, cell: this.cell});
        }
      }else {
        this.target.createEmbeddedView(this.cell.template, {$implicit: this.data, cell: this.cell});
      }
    }
  }

}
