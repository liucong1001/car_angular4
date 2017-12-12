import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CameraComponent } from './camera/camera.component';

@NgModule({
  entryComponents: [],
  exports: [UiTableModule],
  imports: [UiTableModule, RouterModule, CameraComponent],
  declarations: [CameraComponent],
})
export class UiModule {
}
