import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CameraComponent} from './camera/camera.component';
import {CalendarModule, FileUploadModule, AutoCompleteModule, DropdownModule, MultiSelectModule} from 'primeng/primeng';
import {CameraUploadComponent} from './camera/camera-upload.component';
import { CameraModalComponent } from './camera/camera-modal/camera-modal.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AutoinputComponent} from './autoinput/autoinput.component';
import { ValidErrorComponent } from './valid-error/valid-error.component';
import { CommonModule } from '@angular/common';
import { CodeitemDroplistComponent } from './codeitem-droplist/codeitem-droplist.component';
import { DroplistComponent } from './droplist/droplist.component';
import { ThemeModule } from '../../@theme/theme.module';
import { FormFilterComponent } from './form-filter/form-filter.component';
import {CarlistComponent} from './bussiness/carlist/carlist.component';
import {CardetailComponent} from './bussiness/cardetail/cardetail.component';
import { SellerInfoComponent } from './bussiness/seller-info/seller-info.component';
import { TrusterInfoComponent } from './bussiness/truster-info/truster-info.component';
import { ArchiveNoComponent } from './bussiness/archive-no/archive-no.component';
import {ErrorClassDirective} from './form/error-class.directive';
import { InputComponent } from './form/input/input.component';
import { SelectComponent } from './form/select/select.component';
import { CodemirrorComponent } from './form/codemirror/codemirror.component';
import {CodemirrorModule} from 'ng2-codemirror';
import { YsCardComponent } from './bussiness/ys-card/ys-card.component';
import { DynamicPhotoFormComponent } from './bussiness/dynamic-photo-form/dynamic-photo-form.component';
import { PhotoDetailComponent } from './bussiness/photo-detail/photo-detail.component';

const COMPONENTS = [
  CameraComponent,
  CameraModalComponent,
  CameraUploadComponent,
  CalendarComponent,
  AutoinputComponent,
  ValidErrorComponent,
  CodeitemDroplistComponent,
  DroplistComponent,
  CarlistComponent,
  CardetailComponent,
  SellerInfoComponent,
  TrusterInfoComponent,
  ArchiveNoComponent,
  FormFilterComponent,
  ErrorClassDirective,
  InputComponent,
  SelectComponent,
  CodemirrorComponent,
  YsCardComponent,
  DynamicPhotoFormComponent,
  PhotoDetailComponent,
];

@NgModule({
  entryComponents: [
    CameraModalComponent,
  ],
  exports: [
    ...COMPONENTS,
    UiTableModule,
  ],
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiTableModule,
    RouterModule,
    FileUploadModule,
    CalendarModule,
    AutoCompleteModule,
    DropdownModule,
    CodemirrorModule,
    MultiSelectModule,
  ],

  declarations: [
    ...COMPONENTS,
  ],
})
export class UiModule {
}
