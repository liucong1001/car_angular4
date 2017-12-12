
import {NgModule} from '@angular/core';
import {TextCellComponent} from './cell.text.component';
import {TableComponent} from './table.component';
import {MenuCellComponent} from './cell.menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
const components = [
  TableComponent, TextCellComponent, MenuCellComponent,
];
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, NgbModule, RouterModule],
})
export class UiTableModule {
}
