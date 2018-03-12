import {UiTableModule} from './table/table.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CameraComponent} from './camera/camera.component';
import {CameraCarexcnComponent} from './camera/camera-carexcn.component';
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
import {CarlistComponent} from './business/carlist/carlist.component';
import {CardetailComponent} from './business/cardetail/cardetail.component';
import { SellerInfoComponent } from './business/seller-info/seller-info.component';
import { TrusterInfoComponent } from './business/truster-info/truster-info.component';
import { ArchiveNoComponent } from './business/archive-no/archive-no.component';
import {ErrorClassDirective} from './form/error-class.directive';
import { InputComponent } from './form/input/input.component';
import { SelectComponent } from './form/select/select.component';
import { CodemirrorComponent } from './form/codemirror/codemirror.component';
import {CodemirrorModule} from 'ng2-codemirror';
import { YsCardComponent } from './business/ys-card/ys-card.component';
import { DynamicPhotoFormComponent } from './business/dynamic-photo-form/dynamic-photo-form.component';
import { PhotoDetailComponent } from './business/photo-detail/photo-detail.component';
import {InputWithPhotoDirective} from './business/photo-detail/input-with-photo.directive';
import { ArchiveNoVehicleComponent } from './business/archive-no-vehicle/archive-no-vehicle.component';
import { ArchiveNoTransferComponent } from './business/archive-no-transfer/archive-no-transfer.component';
import { BuyerInfoComponent } from './business/buyer-info/buyer-info.component';
import { CarTransferComponent } from './business/car-transfer/car-transfer.component';
import {CarlistTransferComponent} from "./business/carlist-transfer/carlist-transfer.component";
import { ImgComponent } from './img/img.component';

const COMPONENTS = [
  CameraComponent,
  CameraCarexcnComponent,
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
  BuyerInfoComponent,
  TrusterInfoComponent,
  ArchiveNoComponent,
  FormFilterComponent,
  ErrorClassDirective,
  InputWithPhotoDirective,
  InputComponent,
  SelectComponent,
  CodemirrorComponent,
  YsCardComponent,
  DynamicPhotoFormComponent,
  PhotoDetailComponent,
  ArchiveNoVehicleComponent,
  ArchiveNoTransferComponent,
  CarTransferComponent,
  CarlistTransferComponent,
  ImgComponent,
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
