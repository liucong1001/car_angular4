import { MarketFeeComponent } from './market/market-fee.component';
import { MarketBrandComponent } from './market/market-brand.component';
import { MarketEditComponent } from './market/market-edit.component';
import { MarketComponent } from './market/market.component';
import { CartypeComponent } from './cartype/cartype.component';
import { BlacklistEditComponent } from './blacklist/blacklist-edit.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { TransferCityEditComponent } from './transfer-city/transferCity-edit.component';
import { TransfercityComponent } from './transfer-city/transferCity.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SystemComponent} from './system.component';
import {CodeComponent} from './code/code.component';
import {CodeEditComponent} from './code/code-edit.component';
import { ManagerComponent } from './manager/manager.component';
import { ManageritemEditComponent } from './manager/manageritem-edit.component';
import { PermissionComponent } from './permission/permission.component';
import { AreaComponent } from './area/area.component';
import  {MarketPhotoComponent} from './market/market-photo.component'

const routes: Routes = [{
  path: '',
  component: SystemComponent,
  children: [
    {path: 'code', component: CodeComponent},
    {path: 'code/edit', component: CodeEditComponent},
    {path: 'manager', component: ManagerComponent},
    {path: 'manager/edit', component: ManageritemEditComponent},
    {path: 'transfercity', component: TransfercityComponent},
    {path: 'transfercity/edit', component: TransferCityEditComponent},
    {path: 'blacklist', component: BlacklistComponent},
    {path: 'blacklist/edit', component: BlacklistEditComponent},
    {path: 'cartype', component: CartypeComponent},
    {path: 'perm', component: PermissionComponent},
    {path: 'area', component: AreaComponent},
    {path: 'market', component: MarketComponent},
    {path: 'market/edit', component: MarketEditComponent},
    {path: 'market/brand', component: MarketBrandComponent},
    {path: 'market/fee', component: MarketFeeComponent},
    {path: 'market/photo', component: MarketPhotoComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule { }

export const routedComponents = [
  SystemComponent, CodeComponent, CodeEditComponent, ManagerComponent, ManageritemEditComponent,
  TransfercityComponent, TransferCityEditComponent, BlacklistComponent, BlacklistEditComponent,
  CartypeComponent, PermissionComponent, AreaComponent , MarketComponent, MarketEditComponent,
  MarketBrandComponent, MarketFeeComponent,MarketPhotoComponent
];
