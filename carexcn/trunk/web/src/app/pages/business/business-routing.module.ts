import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecordingComponent} from './prejudication/recording/recording.component';
import {JudicationComponent} from './prejudication/judication/judication.component';
import {Recording2Component} from './prejudication/recording2/recording2.component';
import {Recording3Component} from './prejudication/recording3/recording3.component';
import {Recording4Component} from './prejudication/recording4/recording4.component';
import {RecordingLastComponent} from './prejudication/recording-last/recording-last.component';
import {RecordingContinueComponent} from './prejudication/recording-continue/recording-continue.component';
import {JudicationPhotoComponent} from './prejudication/judication-photo/judication-photo.component';
import {TrecordingComponent} from './transfer/trecording/trecording.component';
import {TjudicationComponent} from './transfer/tjudication/tjudication.component';
import {Trecording2Component} from './transfer/trecording2/trecording2.component';
import {TrecordingLastComponent} from './transfer/trecording-last/trecording-last.component';
import {TjudicationPhotoComponent} from './transfer/tjudication-photo/tjudication-photo.component';
import {MobileRecordingComponent} from './mobile-recording/mobile-recording.component';
import {MobileTestComponent} from './mobile-recording/mobile-test/mobile-test.component';
import {MobileReviewComponent} from './mobile-recording/mobile-review/mobile-review.component';
import {MobileInputComponent} from './mobile-recording/mobile-input/mobile-input.component';
import {ChangeComponent} from './change/change.component';

const routes: Routes = [
  {
    path: 'mobile-recording',
    component: MobileRecordingComponent,
  },
  {
    path: 'mobile-recording/test',
    component: MobileTestComponent,
  },
  {
    path: 'mobile-recording/input',
    component: MobileInputComponent,
  },
  {
    path: 'mobile-recording/review',
    component: MobileReviewComponent,
  },
  {
    path: 'transfer/trecording',
    component: TrecordingComponent,
  },
  {
    path: 'transfer/trecording2',
    component: Trecording2Component,
  },
  {
    path: 'transfer/trecording-last',
    component: TrecordingLastComponent,
  },
  {
    path: 'transfer/tjudication',
    component: TjudicationComponent,
  },
  {
    path: 'transfer/tjudication-photo',
    component: TjudicationPhotoComponent,
  },
  {
    path: 'prejudication/recording',
    component: RecordingComponent,
  },
  {
    path: 'prejudication/recording2',
    component: Recording2Component,
  },
  {
    path: 'prejudication/recording3',
    component: Recording3Component,
  },
  {
    path: 'prejudication/recording4',
    component: Recording4Component,
  },
  {
    path: 'prejudication/recording-last',
    component: RecordingLastComponent,
  },
  {
    path: 'prejudication/continue',
    component: RecordingContinueComponent,
  },
  {
    path: 'prejudication/judication',
    component: JudicationComponent,
  },
  {
    path: 'prejudication/judication-photo',
    component: JudicationPhotoComponent,
  },
  {
    path: 'change',
    component: ChangeComponent,
  },
  {
    path: '',
    redirectTo: 'prejudication',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule { }
