import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CameraComponent} from './camera/camera.component';
import {CalendarModule, FileUploadModule, AutoCompleteModule} from 'primeng/primeng';
import {CameraUploadComponent} from './camera/camera-upload.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AutoinputComponent} from './autoinput/autoinput.component';


@NgModule({
  entryComponents: [],
  exports: [UiTableModule, AutoCompleteModule, CameraComponent, CalendarComponent, AutoinputComponent],
  imports: [UiTableModule, RouterModule, FileUploadModule, CalendarModule, AutoCompleteModule],
  declarations: [CameraComponent, CameraUploadComponent, CalendarComponent, AutoinputComponent],
})
export class UiModule {
}
