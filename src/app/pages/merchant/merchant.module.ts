import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantRoutingModule, routedComponents } from './merchant-routing.module';
import { FormsModule } from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {RouterModule} from '@angular/router';
import { DealersEditComponent } from './dealers/dealers-edit/dealers-edit.component';
import { DealersContactsComponent } from './dealers/dealers-contacts/dealers-contacts.component';
import { DealersContactsFormComponent } from './dealers/dealers-contacts-form/dealers-contacts-form.component';
import { MiddleManComponent } from './middle-man/middle-man/middle-man.component';

@NgModule({
  imports: [
    CommonModule,
    MerchantRoutingModule,
    FormsModule,
    ThemeModule,
    HttpModule,
    HttpClientModule,
    UiTableModule,
    RouterModule,
  ],
  declarations: [...routedComponents, DealersEditComponent, DealersContactsComponent, DealersContactsFormComponent, MiddleManComponent],
})
export class MerchantModule { }
