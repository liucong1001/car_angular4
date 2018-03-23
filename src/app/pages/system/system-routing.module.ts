import { MarketStaffEditComponent } from './market-staff/market-staff-edit/market-staff-edit.component';
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
import { PermissionComponent } from './permission/permission.component';
import { AreaComponent } from './area/area.component';
import {MarketStaffComponent} from './market-staff/market-staff.component';
import {MarketStaffAddComponent} from './market-staff/market-staff-add/market-staff-add.component';
import {MarketPhotoComponent} from './market/market-photo.component';
import {MarketBrandComponent} from './market/market-brand.component';
import {MarketFeeComponent} from './market/market-fee.component';
import {RoleComponent} from './role/role.component';
import { RoleAddComponent } from './role/role-add/role-add.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { PhotoExampleComponent } from './photo-example/photo-example.component';
import { PhotoExampleAddComponent } from './photo-example/photo-example-add/photo-example-add.component';
import { PhotoExampleEditComponent } from './photo-example/photo-example-edit/photo-example-edit.component';
import { MarketDifferComponent } from './market/market-differ/market-differ.component';
import { BatchComponent } from './batch/batch.component';

const routes: Routes = [{
  path: '',
  component: SystemComponent,
  children: [
    {path: 'code', component: CodeComponent},
    {path: 'code/edit', component: CodeEditComponent},
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
    {path: 'market/staff/edit', component: MarketStaffEditComponent},
    {path: 'market/market/brand', component: MarketBrandComponent},
    {path: 'market/market/fee', component: MarketFeeComponent},
    {path: 'market/market/fee/edit', component: MarketFeeEditComponent},
    {path: 'market/market/photo', component: MarketPhotoComponent},
    {path: 'market/market/photo/edit', component: MarketPhotoEditComponent},
    {path: 'market/market/differ', component: MarketDifferComponent},
    {path: 'role', component: RoleComponent},
    {path: 'role/add', component: RoleAddComponent},
    {path: 'role/edit', component: RoleEditComponent},
    {path: 'photo-example', component: PhotoExampleComponent},
    {path: 'photo-example/add', component: PhotoExampleAddComponent},
    {path: 'photo-example/edit', component: PhotoExampleEditComponent},
    {path: 'batch', component: BatchComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule { }

export const routedComponents = [
  SystemComponent, CodeComponent, CodeEditComponent,
  TransfercityComponent, TransferCityEditComponent, BlacklistComponent, BlacklistEditComponent,
  CartypeComponent, CartypeEditComponent, PermissionComponent, AreaComponent , MarketComponent, MarketEditComponent,
  MarketBrandComponent, MarketFeeComponent, MarketFeeEditComponent, MarketPhotoComponent, MarketPhotoEditComponent,
  RoleComponent, RoleAddComponent, RoleEditComponent,MarketDifferComponent,
];
