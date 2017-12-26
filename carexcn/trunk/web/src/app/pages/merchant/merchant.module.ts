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
import { ReviseDealerComponent } from './dealers/revise-dealer/revise-dealer.component';
import { SonComponent } from './dealers/son/son.component';
import { AddSonComponent } from './dealers/add-son/add-son.component';
import { BussinessmanComponent } from './dealers/bussinessman/bussinessman.component';
import { AddLinkmanComponent } from './dealers/add-linkman/add-linkman.component';

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
    UiModule,
  ],
  declarations: [
    ...routedComponents,
    LinkmanComponent,
    AddDealerComponent,
    ReviseDealerComponent,
    SonComponent,
    AddSonComponent,
    BussinessmanComponent,
    AddLinkmanComponent,
  ],
})
export class MerchantModule { }
