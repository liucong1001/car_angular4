import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportFormComponent} from "./report-form.component";
import { TransDetailsComponent } from './trans-details/trans-details.component';

const routes: Routes = [{
  path: '',
  component: ReportFormComponent,
  children: [
    {path: 'transDetails', component: TransDetailsComponent},

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportFormRoutingModule { }
export const routedComponents = [
  ReportFormComponent,
  TransDetailsComponent
];
