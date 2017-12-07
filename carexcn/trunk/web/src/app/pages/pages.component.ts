import { Component } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import {ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
       <nb-menu [items]="menu"></nb-menu>
        <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  toastConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    timeout: 50000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'fade',
    limit: 5,
  });
  menu = MENU_ITEMS;
}
