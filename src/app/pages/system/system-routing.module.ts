import { MarketPhotoEditComponent } from './market/market-photo-edit/market-photo-edit.component';
import { MarketFeeEditComponent } from './market/market-fee-edit/market-fee-edit.component';
import { MarketEditComponent } from './market/market-edit.component';
import { MarketComponent } from './market/market.component';
import { CartypeComponent } from './cartype/cartype.component';
import { CartypeEditComponent } from './cartype/cartype-edit.component';
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
import {MarketStaffComponent} from './market-staff/market-staff.component';
import {MarketStaffAddComponent} from './market-staff/market-staff-add/market-staff-add.component';
import {MarketPhotoComponent} from './market/market-photo.component';
import {MarketBrandComponent} from './market/market-brand.component';
import {MarketFeeComponent} from './market/market-fee.component';


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
    {path: 'cartype/edit', component: CartypeEditComponent},
    {path: 'perm', component: PermissionComponent},
    {path: 'area', component: AreaComponent},
    {path: 'market/market', component: MarketComponent},
    {path: 'market/market/edit', component: MarketEditComponent},
    {path: 'market/staff', component: MarketStaffComponent},
    {path: 'market/staff/add', component: MarketStaffAddComponent},
    {path: 'market/brand', component: MarketBrandComponent},
    {path: 'market/fee', component: MarketFeeComponent},
    {path: 'market/fee/edit', component: MarketFeeEditComponent},
    {path: 'market/photo', component: MarketPhotoComponent},
    {path: 'market/photo/edit', component: MarketPhotoEditComponent},
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
  CartypeComponent, CartypeEditComponent, PermissionComponent, AreaComponent , MarketComponent, MarketEditComponent,
  MarketBrandComponent, MarketFeeComponent, MarketFeeEditComponent, MarketPhotoComponent, MarketPhotoEditComponent,
];
