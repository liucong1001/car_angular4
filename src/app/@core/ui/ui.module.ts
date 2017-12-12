import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CameraComponent } from './camera/camera.component';

@NgModule({
  entryComponents: [],
  exports: [UiTableModule, CameraComponent],
  imports: [UiTableModule, RouterModule],
  declarations: [CameraComponent],
})
export class UiModule {
}
