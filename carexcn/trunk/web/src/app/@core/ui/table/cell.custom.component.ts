import {
  Component, Input, OnInit, TemplateRef, ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {CellComponent, CustomCellData} from './cell';

@Component({
  selector: 'ngx-custom-cell',
  template: `
    <div #customCell></div>
    <ng-template #codemapCell let-data>{{data.row.position | code_trans:data.cell.codemap | async}}</ng-template>
  `,
})
export class CustomCellComponent extends CellComponent implements OnInit {
  // constructor() {
  //   // super();
  // }

  @Input() data: CustomCellData;
  @ViewChild('customCell', {read: ViewContainerRef})
  private target: ViewContainerRef;

  @ViewChild('codemapCell')
  private codemapCell: TemplateRef<any>;

  ngOnInit(): void {
    const templateMap = {
      codemapCell: this.codemapCell,
    };
    if (this.data.cell.template) {
      if (typeof this.data.cell.template === 'string') {
        if (templateMap[this.data.cell.template]) {
          this.target.createEmbeddedView(templateMap[this.data.cell.template], {$implicit: this.data});
        }
      }else {
        this.target.createEmbeddedView(this.data.cell.template, {$implicit: this.data});
      }
    }
  }

}
