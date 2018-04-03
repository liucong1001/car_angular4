import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {MessageService} from '../../../../@core/utils/message.service';
// import {BusinessFormGroup} from '../../business.form-group';
import {BusinessTradeForm} from '../../../../@core/model/business/restruct/business.trade.form';

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
  trade: BusinessTradeForm;
  constructor(
    private _router: Router,
    private _message: MessageService,
    private _localstorage: LocalstorageService,
    // public _businessFormGroup: BusinessFormGroup,
  ) {}
  ngOnInit() {
    let maybe_trade = this._localstorage.get('business_recorded_trade');
    if (maybe_trade) {
      console.info(maybe_trade);
      this.trade = maybe_trade as BusinessTradeForm;
      this._message.success('archiveNo', this.trade.archiveNo);
    }
  }
  toPrint() {
  }
  toContinue() {
    this._router.navigate([
      '/pages/business/prejudication/continue',
      { batchNo: this.trade.prejudication.batchNo},
      ]);
  }
  toJudication() {
    this._router.navigate([
      '/pages/business/prejudication/judication',
      { batchNo: this.trade.prejudication.batchNo},
      ]);
  }
}
