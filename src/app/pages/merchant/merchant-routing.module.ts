import { MerchantComponent } from './merchant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LinkmanComponent} from './dealers/linkman/linkman.component';
import {ReviseDealerComponent} from './dealers/revise-dealer/revise-dealer.component';
import {AddDealerComponent} from './dealers/add-dealer/add-dealer.component';
import {EditDealerComponent} from './dealers/edit-dealer/edit-dealer.component';
import {BussinessmanComponent} from './dealers/bussinessman/bussinessman.component';
import {AddLinkmanComponent} from './dealers/add-linkman/add-linkman.component';
import {FinanceComponent} from './finance/finance.component';
import {DetailsComponent} from './finance/details/details.component';
import {BindingComponent} from './finance/binding/binding.component';
import {AddComponent} from './finance/add/add.component';

const routes: Routes = [{
  path: '',
  component: MerchantComponent,
  children: [
    {path: 'bussinessman', component: BussinessmanComponent},
    {path: 'finance', component: FinanceComponent},
    {path: 'finance/see', component: DetailsComponent},
    {path: 'finance/binding', component: BindingComponent},
    {path: 'finance/adds', component: AddComponent},
    {path: 'bussinessman/linkman', component: LinkmanComponent},
    {path: 'bussinessman/add-linkman', component: AddLinkmanComponent},
    {path: 'bussinessman/add', component: AddDealerComponent},
    {path: 'bussinessman/edit', component: EditDealerComponent},
    {path: 'revise', component: ReviseDealerComponent},
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
