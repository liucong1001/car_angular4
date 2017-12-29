import {Input, OnInit, TemplateRef, Type} from '@angular/core';

export class CellComponent {
  @Input() cellClass: string;
}

/**
 * 表格单元格定义
 */
export class Cell implements OnInit {
  ngOnInit(): void {
    if (!this.cellClass) {
      this.cellClass = 'cell';
    }
  }

  constructor(public type: string, public cellClass?: string) {}
}

/**
 * 自定义单元格
 */
export class CustomCell extends Cell {
  constructor(public template: TemplateRef<any> | string, cellClass?: string) {
    super('CustomCell', cellClass);
  }
}

/**
 * 自定义单元格数据
 */
export class CustomCellData {
  public data: any;
  public cell: CustomCell;
}

/**
 * 代码集单元格
 */
export class CodemapCell extends CustomCell {
  constructor(public property, public codemap: string, cellClass?: string) {
    super('codemapCell', cellClass);
  }
}
