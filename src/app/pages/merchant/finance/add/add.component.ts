import { Component, OnInit } from '@angular/core';
import {IccardModel, IccardOperaModel} from '../../../../@core/model/bussiness/iccard.model';
import {Location} from '@angular/common';
import {MessageService} from '../../../../@core/utils/message.service';
import {IccardService} from '../../../../@core/device/iccard.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  // 组件初始华
  ngOnInit() {
  }
  constructor(private iccard: IccardService,
              private message: MessageService,
              private location: Location,
  ) { }
  public iccardData = new IccardModel('云石科技', '0001', 18);
  public iccardPayData = new IccardOperaModel();
  public iccardRechargeData = new IccardOperaModel();
  /*返回*/
  goBack() {
    this.location.back();
  }
  /**
   * IC卡文本写入
   */
  iccardText() {
    const self = this;
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      if (true === res) {
        self.iccard.showText(this.iccardData.Text);
        this.message.info('IC卡操作', '文本已写入！');
      }
    });
  }
  /**
   * 读取IC卡信息
   */
  readIccard() {
    const self = this;
    this.iccardPayData.amount = this.iccardPayData.amountDisplay * 100; // 单位转换
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      // console.log(res);
      if (true === res) {
        self.iccard.scanCard().then((s) => {
          self.iccardData.Banlance = s.Banlance;
          self.iccardData.BanlanceDisplay = (s.Banlance) / 100 ;
        }).catch((e) => {
          // console.log(e);
          self.message.success('IC卡操作', 'IC卡连接不稳定。未能获取到余额');
        });
      }
    }).catch((e) => {
      // console.log(e);
      this.message.error('IC卡连接失败！', '设备或IC卡不正常或连接有误。');
    });
  }

}
