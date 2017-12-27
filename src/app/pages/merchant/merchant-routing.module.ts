import { MerchantComponent } from './merchant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LinkmanComponent} from './dealers/linkman/linkman.component';
import {ReviseDealerComponent} from './dealers/revise-dealer/revise-dealer.component';
import {SonComponent} from './dealers/son/son.component';
import {AddSonComponent} from './dealers/add-son/add-son.component';
import {AddDealerComponent} from './dealers/add-dealer/add-dealer.component';
import {EditDealerComponent} from './dealers/edit-dealer/edit-dealer.component';
import {BussinessmanComponent} from './dealers/bussinessman/bussinessman.component';
import {AddLinkmanComponent} from './dealers/add-linkman/add-linkman.component';
// import MiddleManComponent

const routes: Routes = [{
  path: '',
  component: MerchantComponent,
  children: [
    {path: 'bussinessman', component: BussinessmanComponent},
    /*{path: 'dealers/edit', component: DealersEditComponent},
    {path: 'contacts', component: DealersContactsComponent},
    {path: 'contacts/form', component: DealersContactsFormComponent},
    {path: 'dealers/middleman', component: MiddleManComponent},*/
    {path: 'bussinessman/linkman', component: LinkmanComponent},
    {path: 'bussinessman/add-linkman', component: AddLinkmanComponent},
    {path: 'bussinessman/add', component: AddDealerComponent},
    {path: 'bussinessman/edit', component: EditDealerComponent},
    {path: 'revise', component: ReviseDealerComponent},
    {path: 'bussinessman/son', component: SonComponent},
    {path: 'bussinessman/add-son', component: AddSonComponent},
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
