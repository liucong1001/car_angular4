import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CameraComponent} from './camera/camera.component';
import {CalendarModule, FileUploadModule, AutoCompleteModule} from 'primeng/primeng';
import {CameraUploadComponent} from './camera/camera-upload.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AutoinputComponent} from './autoinput/autoinput.component';


@NgModule({
  entryComponents: [],
  exports: [UiTableModule, CameraComponent, CalendarComponent, AutoinputComponent],
  imports: [FormsModule, UiTableModule, RouterModule, FileUploadModule, CalendarModule, AutoCompleteModule],
  declarations: [CameraComponent, CameraUploadComponent, CalendarComponent, AutoinputComponent],
})
export class UiModule {
}
