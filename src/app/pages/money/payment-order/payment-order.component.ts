import {Component, OnInit,OnChanges,DoCheck,} from '@angular/core';
import {Location} from '@angular/common';
import {IccardService} from '../../../@core/device/iccard.service';
import {IccardModel, IccardOperaModel} from '../../../@core/model/business/iccard.model';
import {MessageService} from '../../../@core/utils/message.service';
import {IcCardOperationService}from '../../../@core/data/ic-card/card.service'
import { ActivatedRoute, Router,Params, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {PaymentOrderService} from "../../../@core/data/money/paymentOrder.service"
import {paymentOrderModel,paymentOrderPayModel} from "../../../@core/model/money/paymentOrder.model"
import {IcCardRechargemap,icCardData} from '../../../@core/model/icCard/recharge';

@Component({
  selector: 'ngx-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss'],
  providers:[IcCardOperationService,PaymentOrderService],
})
export class PaymentOrderComponent implements OnInit {

  constructor(private IcCardOperationService: IcCardOperationService,  public router: Router,
              private route: ActivatedRoute, private message: MessageService,private iccard: IccardService,
              private paymentOrderService:PaymentOrderService,private location: Location) {
            this.route.params.subscribe((params: Params) => {
              if (params['id']) {
                this.paymentOrderService.getOrderInfo(params['id']).then(res => {
                  this.OrderInfo = res;
                  this.icCardPayMoney = this.OrderInfo.actualAmount;
                  this.cashPayMoney = 0;
                }).catch(err => {
                  this.message.error('获取失败', err.json().message);
                });
              }
            });
  }

  OrderInfo = new paymentOrderModel() ;
  public  payMoneyModel =  paymentOrderPayModel ['']= [];

  public  icCardPayMoney :number;
  public  cashPayMoney :number;

  ngOnInit() {
    this.iccardInit();
  }

  public iccardData = new IccardModel('云石科技', '0001', 18);
  public icCardInfo= new IccardModel('云石科技', '0001', 18);
  public  payStatus :string ='0';
  public  getCardData = new icCardData();
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
   * 读取IC卡信息
   */
  readIccard() {
    const self = this;
    // this.iccardPayData.amount = this.iccardPayData.amountDisplay * 100; // 单位转换
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
        this.getCardData = {
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


  payMoney(){
   // this.payMoneyModel.push({
   //
   // },{
   //
   // });
    console.log('OrderInfo对象',this.OrderInfo);
    this.payMoneyModel=[{
      //ic卡支付
      payStatus:this.payStatus,
      payAmount:this.icCardPayMoney,
      payIcCard:this.icCardInfo.CardNumber,
      // businessID:this.OrderInfo.business.id,
      payOrderId:this.OrderInfo.id,
      passWord:'123456',
      cloudUser:'0001',
    },{
      //现金支付
      payStatus:'1',
      payAmount:this.cashPayMoney,
      payIcCard:null,
      // businessID:this.OrderInfo.business.id,
      payOrderId:this.OrderInfo.id,
      passWord:null,
      cloudUser:'0001',
    }];


   const model = {'receiveRecordForms': this.payMoneyModel};
    console.log('确定扣款对象',this.payMoneyModel);
     this.paymentOrderService.payOrder(model).then(res=>{
        this.message.success('','支付成功！');
        this.back();
     }).catch(err=>{
       this.message.error('扣款失败',err.json().message);
     })

  }
  cancel(){
    console.log('撤销扣款');
  }
  back(){
    this.location.back();
  }

}
