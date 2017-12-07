import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  entryComponents: [],
  exports: [UiTableModule],
  imports: [UiTableModule, RouterModule],
})
export class UiModule {
}
