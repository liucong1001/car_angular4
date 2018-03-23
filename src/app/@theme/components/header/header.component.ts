import {Component, Input, OnInit, ViewChild} from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {MarketStaff} from '../../../@core/model/system/market-staff';
import {AuthSessionToken} from '../../../@core/data/security/auth-session-token';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: MarketStaff;

  userMenu = [{ title: '个人资料' }, {title: '修改密码', url:''}, { title: '注销' , url: '/auth/login'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private authService: NbAuthService,
              private router: Router) {
  }


  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: AuthSessionToken) => {
      this.user = token.getPayload();
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  menuClick(e) {
    // if (e.title === '注销') {
    //   // this.authService.logout('email').map(ret => {
    //   //   this.router.navigate(['/oauth/login'])
    //   // }).catch(err => {
    //   //
    //   // });
    // }
  }
}
