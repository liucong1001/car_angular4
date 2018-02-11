import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonAuctionComponent} from './common-auction.component';
import {AuctionManageComponent} from './auction-manage/auction-manage.component';
import {DiscountBalanceComponent} from './discount-balance/discount-balance.component';
import {RebateFormComponent} from './rebate-form/rebate-form.component';
import {BalanceDetailsComponent} from './discount-balance/balance-details/balance-details.component';
import {AddProjectComponent} from './auction-manage/add-project/add-project.component';
import {CarsManageComponent} from './auction-manage/cars-manage/cars-manage.component';
import {AddCarComponent} from './auction-manage/add-car/add-car.component';
import { EditProjectComponent } from './auction-manage/edit-project/edit-project.component';
import { EditCarComponent } from './auction-manage/edit-car/edit-car.component';
import { CarDetailsComponent } from './discount-balance/balance-details/car-details/car-details.component';

const routes: Routes = [{
  path: '',
  component: CommonAuctionComponent,
  children: [
    {path: 'auction-manage', component: AuctionManageComponent},
    {path: 'auction-manage/add-project', component: AddProjectComponent},
    {path: 'auction-manage/edit-project', component: EditProjectComponent},
    {path: 'auction-manage/cars-manage', component: CarsManageComponent},
    {path: 'auction-manage/add-car', component: AddCarComponent},
    {path: 'auction-manage/edit-car', component: EditCarComponent},
    {path: 'rebate-form', component: RebateFormComponent},
    {path: 'discount-balance', component: DiscountBalanceComponent},
    {path: 'discount-balance/balance-details', component: BalanceDetailsComponent},
    {path: 'discount-balance/balance-details/car-details', component: CarDetailsComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonAuctionRoutingModule { }
export const routedComponents = [
  CommonAuctionComponent,
  AuctionManageComponent,
  DiscountBalanceComponent,
  RebateFormComponent,
  BalanceDetailsComponent,
  AddProjectComponent,
  CarsManageComponent,
  AddCarComponent,
  EditProjectComponent,
  EditCarComponent,
  CarDetailsComponent
];

