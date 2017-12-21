import {Input, OnInit, Type} from '@angular/core';

export class CellComponent {
  @Input() cellClass: string;
}

export class Cell implements OnInit {
  ngOnInit(): void {
    if (!this.cellClass) {
      this.cellClass = 'cell';
    }
  }

  constructor(public type: string, public cellClass?: string) {}
}
