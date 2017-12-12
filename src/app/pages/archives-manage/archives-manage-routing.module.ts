import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArchivesManageComponent} from './archives-manage.component';
import {InquiryComponent} from './inquiry/inquiry.component';
import {SendComponent} from './send/send.component';
import {ArriveComponent} from './arrive/arrive.component';
import {SignComponent} from './sign/sign.component';
import {OldLicenceComponent} from './old-licence/old-licence.component';

const routes: Routes = [{
  path: '',
  component: ArchivesManageComponent,
  children: [
    {path: 'inquiry', component: InquiryComponent},
    {path: 'send', component: SendComponent},
    {path: 'arrive', component: ArriveComponent},
    {path: 'sign', component: SignComponent},
    {path: 'old-licence', component: OldLicenceComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchivesManageRoutingModule { }
export const routedComponents = [
  ArchivesManageComponent,
  InquiryComponent,
  SendComponent,
  ArriveComponent,
  SignComponent,
  OldLicenceComponent,
];
