import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintComponent } from './print/print.component';
import {BillComponent} from "./bill.component";
import { SearchComponent } from './search/search.component';
import { PrintSuccessComponent } from './print/print-success/print-success.component';
import { RefundComponent } from './refund/refund.component';

const routes: Routes = [{
  path: '',
  component: BillComponent,
  children: [
    {path: 'print', component: PrintComponent},
    {path: 'search', component: SearchComponent},
    {path: 'print/success', component: PrintSuccessComponent},
    {path: 'refund', component: RefundComponent},

  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }

export const routedComponents = [
  BillComponent,
  PrintComponent,
  SearchComponent,
  PrintSuccessComponent,
  RefundComponent
];
