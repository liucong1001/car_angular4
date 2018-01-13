import { Component, OnInit } from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {Router} from '@angular/router';
import {LocalstorageService} from "../../../../@core/cache/localstorage.service";
import {MessageService} from "../../../../@core/utils/message.service";
import {TradeForm} from "../../../../@core/model/bussiness/trade/trade.form";

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
  trade: TradeForm;
  constructor(
    private themeService: NbThemeService,
    private _router: Router,
    private _message: MessageService,
    private _localstorage: LocalstorageService,
  ) {
    /**
     * 缓存前缀名以业务为单位，一个缓存前缀对应一个业务，一个缓存业务完成则删除该前缀的所有缓存
     * @type {string}
     */
    this._localstorage.prefix = 'bussiness_prejudication_recording';
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }
  ngOnInit() {
    let maybe_trade = this._localstorage.get('trade');
    if (maybe_trade) {
      console.info(maybe_trade);
      this.trade = maybe_trade as TradeForm;
      this._message.success('archiveNo', this.trade.archiveNo);
    }
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
