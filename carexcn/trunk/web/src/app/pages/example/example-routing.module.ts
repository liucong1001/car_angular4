import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormExampleComponent} from './form-example/form-example.component';
import {UiExampleComponent} from './ui-example/ui-example.component';

const routes: Routes = [
  {
    path: 'form-example',
    component: FormExampleComponent,
  }, {
    path: 'ui-example',
    component: UiExampleComponent,
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
];
