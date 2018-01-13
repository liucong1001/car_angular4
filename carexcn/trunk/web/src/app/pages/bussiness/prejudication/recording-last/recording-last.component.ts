import { Component, OnInit } from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {Router} from '@angular/router';

/**
 * 录入成功的提示
 * 1、接受必须的参数并显示
 *    接收到的数据应包含：预审流水号，批次号，二维码
 * 2、当用户点击不同的按钮则跳转到不同的按钮
 */
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
    // console.info(this.currentTheme);
    // this._router.navigateByUrl('/pages/bussiness/prejudication/recording-continue');
  }
  toJudication() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/judication');
  }
}
