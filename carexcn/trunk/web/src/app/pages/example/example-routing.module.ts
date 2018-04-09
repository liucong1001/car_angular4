import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormExampleComponent} from './form-example/form-example.component';
import {UiExampleComponent} from './ui-example/ui-example.component';
import {ApiCheckComponent} from './api-check/api-check.component';
import {BigFormComponent} from './big-form/big-form.component';

const routes: Routes = [
  {
    path: 'form-example',
    component: FormExampleComponent,
  }, {
    path: 'ui-example',
    component: UiExampleComponent,
  }, {
    path: 'api-check',
    component: ApiCheckComponent,
  }, {
    path: 'big-form',
    component: BigFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExampleRoutingModule { }

export const routedComponents = [
  FormExampleComponent,
  UiExampleComponent,
  ApiCheckComponent,
  BigFormComponent,
];
