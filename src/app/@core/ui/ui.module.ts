import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CameraComponent} from './camera/camera.component';
import {CalendarModule, FileUploadModule} from 'primeng/primeng';
import {CameraUploadComponent} from './camera/camera-upload.component';
import {CalendarComponent} from './calendar/calendar.component';


@NgModule({
  entryComponents: [],
  exports: [UiTableModule, CameraComponent, CalendarComponent],
  imports: [UiTableModule, RouterModule, FileUploadModule, CalendarModule],
  declarations: [CameraComponent, CameraUploadComponent, CalendarComponent],
})
export class UiModule {
}
