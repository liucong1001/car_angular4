import { MiddleManComponent } from './middle-man/middle-man/middle-man.component';
import { DealersContactsFormComponent } from './dealers/dealers-contacts-form/dealers-contacts-form.component';
import { DealersContactsComponent } from './dealers/dealers-contacts/dealers-contacts.component';
import { DealersEditComponent } from './dealers/dealers-edit/dealers-edit.component';
import { DealersComponent } from './dealers/dealers/dealers.component';
import { MerchantComponent } from './merchant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import MiddleManComponent

const routes: Routes = [{
  path: '',
  component: MerchantComponent,
  children: [
    {path: 'dealers', component: DealersComponent},
    {path: 'dealers/edit', component: DealersEditComponent},
    {path: 'contacts', component: DealersContactsComponent},
    {path: 'contacts/form', component: DealersContactsFormComponent},
    {path: 'dealers/middleman', component: MiddleManComponent},
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantRoutingModule { }
export const routedComponents = [
  MerchantComponent , DealersComponent,
];
