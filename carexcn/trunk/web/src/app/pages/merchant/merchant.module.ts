import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantRoutingModule, routedComponents } from './merchant-routing.module';
import { FormsModule } from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {RouterModule} from '@angular/router';
import { LinkmanComponent } from './dealers/linkman/linkman.component';
import {UiModule} from '../../@core/ui/ui.module';
import { AddDealerComponent } from './dealers/add-dealer/add-dealer.component';
import { EditDealerComponent } from './dealers/edit-dealer/edit-dealer.component';
import { BusinessmanComponent } from './dealers/businessman/businessman.component';
import { AddLinkmanComponent } from './dealers/add-linkman/add-linkman.component';
import { FinanceComponent } from './finance/finance.component';
import { DetailsComponent } from './finance/details/details.component';
import { BindingComponent } from './finance/binding/binding.component';
import { AddComponent } from './finance/add/add.component';
import { EditLinkmanComponent } from './dealers/edit-linkman/edit-linkman.component';
import { MerchantFormGroup } from './dealers/merchant.form-group';

@NgModule({
  imports: [
    CommonModule,
    MerchantRoutingModule,
    MerchantFormGroup,
    FormsModule,
    ThemeModule,
    HttpModule,
    HttpClientModule,
    UiTableModule,
    RouterModule,
    UiModule,
  ],
  declarations: [
    ...routedComponents,
    LinkmanComponent,
    AddDealerComponent,
    EditDealerComponent,
    BusinessmanComponent,
    AddLinkmanComponent,
    FinanceComponent,
    DetailsComponent,
    BindingComponent,
    AddComponent,
    EditLinkmanComponent,
  ],
})
export class MerchantModule { }
