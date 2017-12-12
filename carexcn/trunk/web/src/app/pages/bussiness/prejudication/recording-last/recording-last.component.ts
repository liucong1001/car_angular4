import { Component, OnInit } from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-recording-last',
  templateUrl: './recording-last.component.html',
  styleUrls: ['./recording-last.component.scss'],
})
export class RecordingLastComponent implements OnInit {

  currentTheme: string;
  themeSubscription: any;

  constructor(private themeService: NbThemeService, private _router: Router) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }
  ngOnInit() {
  }
  toPrint() {
  }
  toContinue() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording-continue');
  }
  onJudication() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/judication');
  }
}
