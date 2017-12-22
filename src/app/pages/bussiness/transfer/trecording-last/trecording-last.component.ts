import { Component, OnInit } from '@angular/core';
import {NbThemeService} from "@nebular/theme";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-trecording-last',
  templateUrl: './trecording-last.component.html',
  styleUrls: ['./trecording-last.component.scss'],
})
export class TrecordingLastComponent implements OnInit {

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
  onJudication() {
    this._router.navigateByUrl('/pages/bussiness/transfer/tjudication');
  }

}
