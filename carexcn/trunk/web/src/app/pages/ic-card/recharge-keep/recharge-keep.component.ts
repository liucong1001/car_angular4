import {Component, OnInit,OnChanges,DoCheck,} from '@angular/core';
import {IccardService} from '../../../@core/device/iccard.service';
import {IccardModel, IccardOperaModel} from '../../../@core/model/bussiness/iccard.model';
import {MessageService} from '../../../@core/utils/message.service';
import {IcCardOperationService}from '../../../@core/data/ic-card/card.service'
import {IcCardRechargemap,icCardData} from '../../../@core/model/icCard/recharge';
@Component({
  selector: 'ngx-recharge-keep',
  templateUrl: './recharge-keep.component.html',
  styleUrls: ['./recharge-keep.component.scss'],
  providers:[IcCardOperationService],
})

export class RechargeKeepComponent implements OnInit {


  // 组件初始华
  ngOnInit() {
    this.iccardInit();

    this.getCardData = {
      icAccount:{
        balance:null,
        ownedAccount:{
          accountName: null
        }
      }
    };
    this.iccardRechargemap = {
           icCardNo:null,
           give:null,
           recharge:null,
           amount:null,
           cloudUser:'0001'
    };
  }
  constructor(private iccard: IccardService, private message: MessageService ,private IcCardOperationService:IcCardOperationService) { }
  public icCardInfo= new IccardModel('云石科技', '0001', 18);
  public iccardData = new IccardModel('云石科技', '0001', 18);
  public iccardPayData = new IccardOperaModel();
  public iccardRechargeData = new IccardOperaModel();
  public  iccardRechargemap = new IcCardRechargemap();
  public  getCardData = new icCardData();

  ngDoCheck(){
     // this.readIccard();
  }

  /**
   * ic卡初始化
   */
  iccardInit(){
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then( res =>{
      this.message.success('','ic卡初始化完成!');
    }).catch(err =>{
      this.message.error('',err.jsson.message);
    })
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
          this.icCardInfo = s;
          this.getInfo();
          console.log("ic卡",this.iccardData,this.icCardInfo);
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


  getInfo(){
     if(this.icCardInfo.CardNumber&&this.icCardInfo.CardNumber!=null){
          console.log("检测到卡号",this.icCardInfo.CardNumber);
          this.IcCardOperationService.get(this.icCardInfo.CardNumber).then(res=>{
            console.log('拿到卡信息',res,res.icAccount,res.icAccount.ownedAccount.accountName);
            // .ownedAccount.accountName
            this.getCardData = {
              // icAccount:balance  :res.icAccount.balance
               icAccount:{
                 balance:res.icAccount.balance,
                 ownedAccount:{
                   accountName:  res.icAccount.ownedAccount.accountName
                 }
               }
            };
          })
     }

  }

  /**
   * ic卡充值
   */
  recharge(){
    this.iccardRechargemap.icCardNo = this.icCardInfo.CardNumber;
    this.iccardRechargemap.amount =  this.iccardRechargemap.give + this.iccardRechargemap.recharge;
    console.log("充值对象",this.iccardRechargemap);
        this.IcCardOperationService.recharge(this.iccardRechargemap).then(res =>{
          this.message.success('恭喜你', '充值成功！');
          this.iccard.showText('充值金额:'+this.iccardRechargemap.recharge+'\n赠送金额:'+this.iccardRechargemap.give);
          this.iccardRechargemap.recharge = null;
          this.iccardRechargemap.give = null;
          this.readIccard();
        }).catch(err=>{
          this.message.error('充值失败',err.json().message);
        })
  }

}
