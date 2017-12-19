import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {NbAuthModule} from '@nebular/auth';
import {NbCheckboxModule} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    NbAuthModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent],
})
export class AuthModule { }
