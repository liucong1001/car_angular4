import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Column} from '../../../@core/ui/table/table.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {IccardService} from '../../../@core/device/iccard.service';
import {IccardModel, IccardOperaModel} from '../../../@core/model/bussiness/iccard.model';
import {MessageService} from '../../../@core/utils/message.service';
import {DeviceService} from '../../../@core/device/device.service';

/*@Component({
  selector: 'ngx-recharge',
  templateUrl: './recharge-keep.component.html',
})
export class RechargeComponent {}/!*位置很重要*!/*/

/*
@Component({
  selector: 'ngx-recharge-record',
  templateUrl: './recharge-keep.component.html',
})
export class RechargeRecordComponent {}
*/

@Component({
  selector: 'ngx-recharge-keep',
  templateUrl: './recharge-keep.component.html',
  styleUrls: ['./recharge-keep.component.scss'],
  providers: [IccardService, DeviceService],
})

export class RechargeKeepComponent implements OnInit {

  /*tabs: any[] = [
    {
      title: 'IC卡充值',
      route: '/pages/ic-card/recharge-keep/recharge',
    },
    {
      title: 'IC卡充值记录',
      route: '/pages/ic-card/recharge-keep/recharge-record',
    },
  ];*/
  // 组件初始华
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
              console.log(e);
              self.message.success('IC卡操作', 'IC卡连接不稳定。未能获取到余额');
            });
            self.message.success('IC卡操作', '充值 ' + this.iccardRechargeData.amountDisplay + '元 成功！');
          }
        }).catch((e) => {
          console.log(e);
          self.message.error('IC卡操作', '充值失败！请检查IC卡是否完好，链接是否正常。');
        });
      }
    }).catch((e) => {
      console.log(e);
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
          console.log(e);
          self.message.success('IC卡操作', 'IC卡连接不稳定。未能获取到余额');
        });
      }
    }).catch((e) => {
      console.log(e);
      this.message.error('IC卡连接失败！', '设备或IC卡不正常或连接有误。');
    });
  }

}
