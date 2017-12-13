import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CameraComponent } from './camera/camera.component';
import {FileUploadModule} from 'primeng/primeng';
import {CameraUploadComponent} from './camera/camera-upload.component';


@NgModule({
  entryComponents: [],
  exports: [UiTableModule, CameraComponent],
  imports: [UiTableModule, RouterModule, FileUploadModule],
  declarations: [CameraComponent, CameraUploadComponent],
})
export class UiModule {
}
