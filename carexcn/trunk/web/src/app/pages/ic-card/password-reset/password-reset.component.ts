import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  tabs: any[] = [
    {
      title: '密码重置',
      route: '/pages/ic-card/password-reset/reset',
    },
    {
      title: 'IC卡充值记录',
      route: '/pages/ic-card/password-reset/tab',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
@Component({
  selector: 'ngx-tab',
  template: `
    <p>Tab 2 works!</p>
  `,
})
export class TabComponent {
}
@Component({
  selector: 'ngx-reset',
  template: '',
})
export class ResetComponent {
}
