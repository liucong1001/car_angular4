import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CameraComponent} from './camera/camera.component';
import {CalendarModule, FileUploadModule, AutoCompleteModule, DropdownModule} from 'primeng/primeng';
import {CameraUploadComponent} from './camera/camera-upload.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AutoinputComponent} from './autoinput/autoinput.component';
import { CodeitemDroplistComponent } from './codeitem-droplist/codeitem-droplist.component';


@NgModule({
  entryComponents: [],
  exports: [UiTableModule, CameraComponent, CalendarComponent, AutoinputComponent, CodeitemDroplistComponent],
  imports: [FormsModule, UiTableModule, RouterModule, FileUploadModule, CalendarModule, AutoCompleteModule, DropdownModule],
  declarations: [CameraComponent, CameraUploadComponent, CalendarComponent, AutoinputComponent, CodeitemDroplistComponent],
})
export class UiModule {
}
