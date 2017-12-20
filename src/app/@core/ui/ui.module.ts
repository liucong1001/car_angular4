import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CameraComponent} from './camera/camera.component';
import {CalendarModule, FileUploadModule, AutoCompleteModule, ColorPickerModule, EditorModule} from 'primeng/primeng';
import {CameraUploadComponent} from './camera/camera-upload.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AutoinputComponent} from './autoinput/autoinput.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  entryComponents: [],
  exports: [UiTableModule, CameraComponent, CalendarComponent, AutoinputComponent],
  imports: [FormsModule, UiTableModule, RouterModule, FileUploadModule, CalendarModule, ColorPickerModule, AutoCompleteModule, EditorModule],
  declarations: [CameraComponent, CameraUploadComponent, CalendarComponent, AutoinputComponent],
})
export class UiModule {
}
