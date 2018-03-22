import {Component, OnInit,OnChanges,DoCheck,} from '@angular/core';
import {Location} from '@angular/common';
import {IccardService} from '../../../../@core/device/iccard.service';
import {IccardModel, IccardOperaModel} from '../../../../@core/model/business/iccard.model';
import {MessageService} from '../../../../@core/utils/message.service';
import {IcCardOperationService}from '../../../../@core/data/ic-card/card.service'
import {PaymentOrderService} from "../../../../@core/data/money/paymentOrder.service"
import {paymentOrderModel,paymentOrderPayModel} from "../../../../@core/model/money/paymentOrder.model"
import {IcCardRechargemap,icCardData} from '../../../../@core/model/icCard/recharge';
import { ActivatedRoute, Router,Params, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {OrderRefundService} from "../../../../@core/data/money/orderRefund.service";
import {BusinessObjectPayment} from "../../../../@core/model/money/payment.model";
import {OrderRefund} from "../../../../@core/model/money/orderRefund.model";

// export  BusinessObjectPayment  OrderRefund
// BusinessObjectPayment

@Component({
  selector: 'ngx-order-refund',
  templateUrl: './order-refund.component.html',
  styleUrls: ['./order-refund.component.scss'],
  providers:[IcCardOperationService,PaymentOrderService,OrderRefundService],
})

export class OrderRefundComponent implements OnInit {

  arcInfo :BusinessObjectPayment;
  order = new OrderRefund();
  constructor(private IcCardOperationService: IcCardOperationService,  public router: Router,
              private route: ActivatedRoute, private message: MessageService,private iccard: IccardService,
              private paymentOrderService:PaymentOrderService,private location: Location,
              private orderRefundService:OrderRefundService
  ) {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        console.log('id',params['id']);
        this.order.paymentId =  params['id'];
        this.order.payStatus = this.payStatus;
        console.log('对象',this.order);
         this.orderRefundService.getArcInfo(params['id']).then(res=>{
                this.arcInfo = res;
         }).catch(err=>{
           this.message.error('获取订单信息失败', err.json().message);
         })
      }
    });
  }

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

  /**
   * 退费
   */


  cancel(){
    if(this.payStatus =='0'){
        this.order.icCardNo = this.icCardInfo.CardNumber;
    }
     console.log('退费',this.order);
    this.orderRefundService.cancelPayment(this.order).then(res=>{
      this.message.success('','退费成功');
      this.router.navigate( ['/pages/money/order/cancel']);
    })
  }

  statusChange(event){
    this.order.payStatus = event;
  }


}
