import {RouterModule, Routes} from '@angular/router';
import {ManagerComponent} from './manager.component';
import {NgModule} from '@angular/core';
import {ValidatorComponent} from './validator/validator.component';
import {ValidatorEditComponent} from './validator/validator-edit/validator-edit.component';
import {ValidatorAddComponent} from './validator/validator-add/validator-add.component';

const routes: Routes = [{
  path: '',
  component: ManagerComponent,
  children: [
    {path: 'validator', component: ValidatorComponent},
    {path: 'validator/add', component: ValidatorAddComponent},
    {path: 'validator/edit/:id', component: ValidatorEditComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {
}
export const routedComponents = [
  ManagerComponent,
  ValidatorComponent,
  ValidatorEditComponent,
  ValidatorAddComponent,
];
