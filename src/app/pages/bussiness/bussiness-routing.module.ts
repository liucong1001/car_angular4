import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrejudicationComponent} from './prejudication/prejudication.component';
import {TransferComponent} from './transfer/transfer.component';
import {RecordingComponent} from './prejudication/recording/recording.component';
import {JudicationComponent} from './prejudication/judication/judication.component';
import {Recording2Component} from './prejudication/recording2/recording2.component';
import {Recording3Component} from './prejudication/recording3/recording3.component';
import {Recording4Component} from './prejudication/recording4/recording4.component';
import {RecordingLastComponent} from './prejudication/recording-last/recording-last.component';
import {RecordingContinueComponent} from './prejudication/recording-continue/recording-continue.component';

const routes: Routes = [
  {
    path: 'prejudication',
    component: PrejudicationComponent,
  },
  {
    path: 'transfer',
    component: TransferComponent,
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
    path: 'prejudication/recording-continue',
    component: RecordingContinueComponent,
  },
  {
    path: 'prejudication/judication',
    component: JudicationComponent,
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
export class BussinessRoutingModule { }
