import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BussinessRoutingModule} from './bussiness-routing.module';
import {PrejudicationComponent} from './prejudication/prejudication.component';
import {JudicationComponent} from './prejudication/judication/judication.component';
import {RecordingComponent} from './prejudication/recording/recording.component';
import {Recording2Component} from './prejudication/recording2/recording2.component';
import {Recording3Component} from './prejudication/recording3/recording3.component';
import {Recording4Component} from './prejudication/recording4/recording4.component';
import {RecordingLastComponent} from './prejudication/recording-last/recording-last.component';
import {RecordingContinueComponent} from './prejudication/recording-continue/recording-continue.component';
import {ThemeModule} from '../../@theme/theme.module';
import {JudicationPhotoComponent} from './prejudication/judication-photo/judication-photo.component';
import {UiModule} from '../../@core/ui/ui.module';
import { TrecordingComponent } from './transfer/trecording/trecording.component';
import { TjudicationComponent } from './transfer/tjudication/tjudication.component';
import { Trecording2Component } from './transfer/trecording2/trecording2.component';
import { TrecordingLastComponent } from './transfer/trecording-last/trecording-last.component';
import { TjudicationPhotoComponent } from './transfer/tjudication-photo/tjudication-photo.component';
import { TjudicationFingerComponent } from './transfer/tjudication-finger/tjudication-finger.component';
import {SystemModule} from '../../@core/data/system/system.module';
import {CacheModule} from '../../@core/cache/cache.module';
import {MobileRecordingComponent} from './mobile-recording/mobile-recording.component';
import { MobileTestComponent } from './mobile-recording/mobile-test/mobile-test.component';
import { MobileReviewComponent } from './mobile-recording/mobile-review/mobile-review.component';
import { MobileInputComponent } from './mobile-recording/mobile-input/mobile-input.component';
import {CertTypePipe} from '../../@core/data/bussiness/certTypePipe';
import {BussinessFormGroup} from './bussiness.form-group';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    BussinessRoutingModule,
    BussinessFormGroup,
    UiModule,
    CacheModule,
    SystemModule,
  ],
  declarations: [
    PrejudicationComponent,
    JudicationComponent,
    RecordingComponent,
    Recording2Component,
    Recording3Component,
    Recording4Component,
    RecordingLastComponent,
    RecordingContinueComponent,
    JudicationPhotoComponent,
    TrecordingComponent,
    TjudicationComponent,
    TrecordingComponent,
    TjudicationComponent,
    Trecording2Component,
    TrecordingLastComponent,
    TjudicationPhotoComponent,
    TjudicationFingerComponent,
    MobileRecordingComponent,
    MobileTestComponent,
    MobileReviewComponent,
    MobileInputComponent,
    CertTypePipe,
  ],
})
export class BussinessModule {
}
