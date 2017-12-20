import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {NbAuthModule} from '@nebular/auth';
import {NbCheckboxModule} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    NbAuthModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent, UserComponent],
})
export class AuthModule { }
