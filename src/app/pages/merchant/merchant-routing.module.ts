import { MerchantComponent } from './merchant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LinkmanComponent} from './dealers/linkman/linkman.component';
import {AddDealerComponent} from './dealers/add-dealer/add-dealer.component';
import {EditDealerComponent} from './dealers/edit-dealer/edit-dealer.component';
import {BussinessmanComponent} from './dealers/bussinessman/bussinessman.component';
import {AddLinkmanComponent} from './dealers/add-linkman/add-linkman.component';

const routes: Routes = [{
  path: '',
  component: MerchantComponent,
  children: [
    {path: 'bussinessman', component: BussinessmanComponent},
    {path: 'bussinessman/linkman', component: LinkmanComponent},
    {path: 'bussinessman/add-linkman', component: AddLinkmanComponent},
    {path: 'bussinessman/add', component: AddDealerComponent},
    {path: 'bussinessman/edit', component: EditDealerComponent},
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantRoutingModule { }
export const routedComponents = [
  MerchantComponent , BussinessmanComponent,
];
