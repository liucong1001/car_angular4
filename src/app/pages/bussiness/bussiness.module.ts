import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BussinessRoutingModule} from './bussiness-routing.module';
import {PrejudicationComponent} from './prejudication/prejudication.component';
import {TransferComponent} from './transfer/transfer.component';
import {JudicationComponent} from './prejudication/judication/judication.component';
import {RecordingComponent} from './prejudication/recording/recording.component';
import {Recording2Component} from './prejudication/recording2/recording2.component';
import {Recording3Component} from './prejudication/recording3/recording3.component';
import {Recording4Component} from './prejudication/recording4/recording4.component';
import {RecordingLastComponent} from './prejudication/recording-last/recording-last.component';
import {RecordingContinueComponent} from './prejudication/recording-continue/recording-continue.component';
import {CarListComponent} from './prejudication/recording-continue/car-list/car-list.component';
import {CarDetailComponent} from './prejudication/recording-continue/car-detail/car-detail.component';
import {ThemeModule} from '../../@theme/theme.module';
import {JudicationPhotoComponent} from './prejudication/judication-photo/judication-photo.component';
import {UiModule} from '../../@core/ui/ui.module';
import {UiExampleComponent} from './ui-example/ui-example.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    BussinessRoutingModule,
    UiModule,
  ],
  declarations: [
    PrejudicationComponent,
    TransferComponent,
    JudicationComponent,
    RecordingComponent,
    Recording2Component,
    Recording3Component,
    Recording4Component,
    RecordingLastComponent,
    RecordingContinueComponent,
    CarListComponent,
    CarDetailComponent,
    JudicationPhotoComponent,
    UiExampleComponent,
  ],
})
export class BussinessModule {
}
