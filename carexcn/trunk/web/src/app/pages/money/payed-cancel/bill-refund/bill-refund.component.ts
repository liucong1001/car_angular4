import { Component, OnInit } from '@angular/core';
import {BillRefundService} from "../../../../@core/data/money/bill-refund.service";
import {ActivatedRoute, Router, Params} from '@angular/router';
import {PaymentService} from "../../../../@core/data/money/payment.service";
import {BackPaymentForm, BillRefund} from "../../../../@core/model/money/bill-refund";
import {BusinessObjectPayment} from "../../../../@core/model/money/payment.model";
import {IccardService} from '../../../../@core/device/iccard.service';
import {IccardModel, IccardOperaModel} from '../../../../@core/model/business/iccard.model';
import {MessageService} from '../../../../@core/utils/message.service';
import {IcCardOperationService}from '../../../../@core/data/ic-card/card.service'
import {IcCardRechargemap,icCardData} from '../../../../@core/model/icCard/recharge';

// BusinessObjectPayment
// BackPaymentForm
@Component({
  selector: 'ngx-bill-refund',
  templateUrl: './bill-refund.component.html',
  styleUrls: ['./bill-refund.component.scss'],
  providers:[BillRefundService,PaymentService,IcCardOperationService,MessageService,IcCardOperationService],
})
export class BillRefundComponent implements OnInit {

  constructor(public service:BillRefundService,
              public router: Router,
              public route: ActivatedRoute,
              public paymentService: PaymentService,
              private message: MessageService,
              private iccard: IccardService,
              private IcCardOperationService: IcCardOperationService,) {
  }

  data :BillRefund;
  paymentInfo = [];
  feeList = [];
  backPayment  = new BackPaymentForm();
  ngOnInit() {
    // this.data.payment = new;
    // this.data.payment.paymentInfo = [];
    this.iccardInit();

    this.route.params.subscribe((params:Params)=>{
        if(params['id']){
            this.service.getInfo(params['id']).then(res=>{
                this.data = res;
                this.data.payStatus = this.payStatus;
                this.paymentService.getArcFee(res.businessObjectPayment[0].archiveNo,res.type,
                  res.businessObjectPayment[0].arcNoType).then(result=>{
                       this.feeList = result;
                      for( var i in result){
                        this.paymentInfo.push({
                          name:         result[i].name,
                          feeType:      result[i].priceType,
                          money:        result[i].money.split(','),
                          shouldAmount: result[i].money,
                          invoice:      result[i].invoice,
                          businessType: result[i].businessType,
                        })
                      }
                  this.data.payment={
                    archiveNo:this.data.businessObjectPayment[0].archiveNo,
                    shouldAmount:0,
                    businessObjectId:this.data.id,
                    businessType:this.data.type,
                    accountName:this.data.businessObjectPayment[0].accountName,
                    arcNoType:'1',
                  };
                  this.data.payment.paymentInfo = this.paymentInfo;
                  console.log('提交对象',this.data,this.paymentInfo);
                })
            })
        }
    })
  }


  public iccardData = new IccardModel('云石科技', '0001', 18);
  public icCardInfo= new IccardModel('云石科技', '0001', 18);
  public  payStatus :string ='1';
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
        // this.getCardData = {
        //   icAccount:{
        //     balance:res.icAccount.balance,
        //     ownedAccount:{
        //       accountName:  res.icAccount.ownedAccount.accountName
        //     }
        //   }
        // };
      })
    }
  }

  /**
   * 费用总计算
   */
  feeSum(event){
    // this.data.payment.shouldAmount = 0;
    //
    // for(var i in this.paymentInfo){
    //   this.data.payment.shouldAmount+=  parseFloat(this.paymentInfo[i].shouldAmount);
    // }
    this.paymentInfo[0].shouldAmount = event;
    this.data.payment.shouldAmount = event;
    console.log('表单',this.data,event);
  }

  confirm(){
    this.backPayment.businessObjectBackPayment = this.data;
    console.log('确认退费',this.backPayment);
    this.service.back(this.backPayment).then(res=>{
      this.message.success('退票成功！','')
    }).catch(err=>{
      this.message.error('失败',err.json().message);
    })
  }

  back(){
    this.router.navigate( ['/pages/money/payedCancel/']);
  }

}
