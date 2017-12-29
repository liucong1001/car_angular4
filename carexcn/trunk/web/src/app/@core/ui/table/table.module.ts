import {NgModule} from '@angular/core';
import {TextCellComponent} from './cell.text.component';
import {TableComponent} from './table.component';
import {MenuCellComponent} from './cell.menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomCellComponent} from './cell.custom.component';
import {SystemModule} from '../../data/system/system.module';
import {CheckboxCellComponent} from './cell.checkbox.component';
import {PipesModule} from "../../pipes/pipes.module";

const components = [
  TableComponent,
  TextCellComponent,
  CheckboxCellComponent,
  MenuCellComponent,
  CustomCellComponent,
];
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, NgbModule, RouterModule, SystemModule, PipesModule ],
})
export class UiTableModule {
}
