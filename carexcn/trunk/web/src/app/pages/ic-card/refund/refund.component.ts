import { Component, OnInit } from '@angular/core';
import {IccardModel, IccardOperaModel} from '../../../@core/model/bussiness/iccard.model';
import {MessageService} from '../../../@core/utils/message.service';
import {IccardService} from '../../../@core/device/iccard.service';

@Component({
  selector: 'ngx-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss'],
})
export class RefundComponent implements OnInit {

  ngOnInit() {
  }
  constructor(private iccard: IccardService, private message: MessageService) { }
  public iccardData = new IccardModel('云石科技', '0001', 18);
  public iccardPayData = new IccardOperaModel();
  public iccardRechargeData = new IccardOperaModel();
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
   * IC卡充值
   */
  iccardRecharge() {
    const self = this;
    this.iccardRechargeData.amount = this.iccardRechargeData.amountDisplay * 100; // 单位转换
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      console.log(res);
      if (true === res) {
        self.iccard.recharge(self.iccardRechargeData).then((r) => {
          if (r) {
            self.iccard.scanCard().then((s) => {
              self.iccardData.Banlance = s.Banlance;
              self.iccardData.BanlanceDisplay = (s.Banlance) / 100 ;
            }).catch((e) => {
              console.error(e);
              self.message.success('IC卡操作', 'IC卡连接不稳定。未能获取到余额');
            });
            self.message.success('IC卡操作', '充值 ' + this.iccardRechargeData.amountDisplay + '元 成功！');
          }
        }).catch((e) => {
          console.error(e);
          self.message.error('IC卡操作', '充值失败！请检查IC卡是否完好，链接是否正常。');
        });
      }
    }).catch((e) => {
      console.error(e);
      this.message.error('IC卡操作', '设备连接失败！请检查设备链接是否成功。');
    });
  }
  /**
   * 读取IC卡信息
   */
  readIccard() {
    const self = this;
    this.iccardPayData.amount = this.iccardPayData.amountDisplay * 100; // 单位转换
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      console.log(res);
      if (true === res) {
        self.iccard.scanCard().then((s) => {
          self.iccardData.Banlance = s.Banlance;
          self.iccardData.BanlanceDisplay = (s.Banlance) / 100 ;
        }).catch((e) => {
          console.error(e);
          self.message.success('IC卡操作', 'IC卡连接不稳定。未能获取到余额');
        });
      }
    }).catch((e) => {
      console.error(e);
      this.message.error('IC卡连接失败！', '设备或IC卡不正常或连接有误。');
    });
  }

}
