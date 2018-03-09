import { MerchantComponent } from './merchant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LinkmanComponent} from './dealers/linkman/linkman.component';
import {AddDealerComponent} from './dealers/add-dealer/add-dealer.component';
import {EditDealerComponent} from './dealers/edit-dealer/edit-dealer.component';
import {BusinessmanComponent} from './dealers/businessman/businessman.component';
import {AddLinkmanComponent} from './dealers/add-linkman/add-linkman.component';
import {EditLinkmanComponent} from './dealers/edit-linkman/edit-linkman.component';
import {FinanceComponent}from './finance/finance.component';
import {BindingComponent} from './finance/binding/binding.component';

const routes: Routes = [{
  path: '',
  component: MerchantComponent,
  children: [
    {path: 'businessman', component: BusinessmanComponent},
    {path: 'businessman/linkman', component: LinkmanComponent},
    {path: 'businessman/add-linkman', component: AddLinkmanComponent},
    {path: 'businessman/edit-linkman', component: EditLinkmanComponent},
    {path: 'businessman/add', component: AddDealerComponent},
    {path: 'businessman/edit', component: EditDealerComponent},
    {path: 'finance', component: FinanceComponent},
    {path: 'finance/binding', component: BindingComponent},
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantRoutingModule { }
export const routedComponents = [
  MerchantComponent , BusinessmanComponent,FinanceComponent,BindingComponent
];
