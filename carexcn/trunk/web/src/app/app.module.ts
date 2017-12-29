/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToasterModule} from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import {ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from './@core/pipes/pipes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,


    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ReactiveFormsModule,
    ToasterModule,
    PipesModule,
  ],
  bootstrap: [AppComponent],
  providers: [

    { provide: APP_BASE_HREF, useValue: '/'},
  ],
})
export class AppModule {
}
