import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Column} from '../../../@core/ui/table/table.component';
import {Menu, MenuCell} from "../../../@core/ui/table/cell.menu.component";
import  {PaymentService} from "../../../@core/data/money/payment.service";
import {SelectItem} from 'primeng/primeng';
import {MessageService} from '../../../@core/utils/message.service';
import {BusinessObjectPaymentInfo,BusinessObjectPayment,PayOrderItemForm,PayOrderForm} from '../../../@core/model/money/payment.model';
import {Marketfeemap} from '../../../@core/model/system/market-fee-map';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers:[PaymentService],
})
export class PaymentComponent implements OnInit, OnChanges {
  costList :SelectItem[];
  selectedCost: Marketfeemap[] = [];
  //每一条费用;
  itemList = {};
  //每条记录之和
  list = [];
  archiveNo:'';
  businessType:string;

  /**
   *  下方列表对象
    */
  //过户中的手续费（fee）费用类型暂定为‘00’；
  transFeeType = '00';
  //费用明细
  businessObjectPaymentInfo =new BusinessObjectPaymentInfo();
  //单条缴费总金额
  businessObjectPayment = new BusinessObjectPayment();

  payOrderItem = new  PayOrderItemForm();
  // 订单对象
  payOrder = new PayOrderForm();

  constructor(private paymentService:PaymentService,private message:MessageService,private router: Router) {
  }

  // ngOnChanges 可监控组件变量
  ngOnChanges(changes: SimpleChanges): void {

  }
  type:string;
  typeList =[];
  arcNoType :string;
  archiveNoChange(event:any){
       console.log('事件',event.type);
       if((event.keyCode == 13 ||event.type=='click')&&String(this.archiveNo).length==16) {
         /* 二手车流水处理 */
          this.arcNoType = '1';
          this.typeList = [];
         console.log('二手车流水号：',this.archiveNo);
         this.paymentService.getPay(this.archiveNo).then(res=>{
           console.log('数组长度',res.length);
           for(var i in res){
             this.typeList.push(res[i].business.businessType);
           }
           console.log('业务数组',this.typeList);
           if(res.length==1){
             // 返回只有一种业务类型
             this.type=res[0].business.businessType;
             this.search(this.archiveNo,this.type,res[0].id,this.arcNoType);
           }else  {
             // 返回多种业务类型
           }
         })
       }else if((event.keyCode == 13 ||event.type=='click')&&String(this.archiveNo).length==13){
         /* 市场流水处理*/
         this.arcNoType = '0';
         this.typeList = [];
         console.log('市场流水号：',this.archiveNo);
         this.paymentService.getMarketBusiness().then(res=>{
           this.typeList = res;
           console.log('市场业务',this.typeList);
         })
         // this.search(this.archiveNo,null,null,this.arcNoType);
         // this.getArcFee(this.archiveNo,null,this.arcNoType);
       }else {
         return false
       }
  }

  selectBusiness(type:string){
     console.log('选择的业务',type);
     for(var i=0;i<this.payOrder.items.length;i++){
         if(this.payOrder.items[i].payment.archiveNo ==this.archiveNo&&this.payOrder.items[i].payment.businessType==type){
           this.message.warning('','该项费用已存在！');
           return false;
         }
     }
    this.getArcFee(this.archiveNo,type,this.arcNoType);
    this.itemInit();
  }
  // 组件初始华
  ngOnInit() {
    this.itemInit();
    this.businessType = '0';
    /*初始化订单对象*/
    this.payOrder = {
      shouldAmount:0,
       actualAmount:0,
       accountId:'',
          items:[],
     };
  }

  /**
   * 列表每条数据初始化
   */
  itemInit(){
    this.payOrderItem.payment = new BusinessObjectPayment();
    this.payOrderItem.items = [];
  }

  /**
   * 根据流水号或者车牌号查询
   * @param data
   */
  search(data,type,id,arcNoType){
    this.payOrderItem.items = [];
    this.paymentService.getArcInfo(data).then(res=>{
      this.payOrderItem.payment = {
        archiveNo:data,
        shouldAmount:0,
        businessObjectId:id,
        businessType:type,
        accountName:res.preVehicle.preVehicle.merchant.name,
        arcNoType:'1',
      };
     this.payOrder.accountId = res.preVehicle.preVehicle.merchant.account.id;
     this.getArcFee(data,type,arcNoType);
    });
  }

  getArcFee(data,type,arcNoType){

    this.paymentService.getArcFee(data,type,arcNoType).then(result=>{
      for( var i in result){
        this.payOrderItem.items.push({
          name:         result[i].name,
          feeType:      result[i].priceType,
          money:        result[i].money.split(','),
          shouldAmount: result[i].money,
          invoice:      result[i].invoice,
          businessType: result[i].businessType,
          // archiveNo:   this.businessObjectPayment.archiveNo,
          // accountName: this.businessObjectPayment.accountName,
        })
      }
      if(String(data).length==13){
        this.payOrderItem.payment = {
          archiveNo:data,
          shouldAmount:0,
          businessObjectId:null,
          businessType:type,
          accountName:null,
          arcNoType:'0',
        };
      }
      this.payOrder.items.push({payment:this.payOrderItem.payment,items:this.payOrderItem.items});
      this.feeSum();
      console.log('列表创建数据',this.list);
      console.log('表单对象', this.payOrder);

    }).catch(err=>{
      this.message.error('查询失败',err.message);
    })
  }




  /**
   * 费用总计算
   */
   feeSum(){
    this.payOrder.shouldAmount = 0;
    // step2 计算所有流水号的费用总和
     for( var i in this.payOrder.items){
          this.payOrder.items[i].payment.shouldAmount = 0;
           // step1 计算单个流水号的费用总和
          for(var j in this.payOrder.items[i].items){
              this.payOrder.items[i].payment.shouldAmount += parseFloat(this.payOrder.items[i].items[j].shouldAmount) ;
          }
         this.payOrder.shouldAmount += this.payOrder.items[i].payment.shouldAmount;
     }
     // this.payOrder.actualAmount = this.payOrder.shouldAmount;
     console.log('表单',this.payOrder);
  }

  /**
   * 创建表单
   */
  creatOrder(){
    // this.feeSum();
     console.log("创建订单",this.payOrder);
     this.paymentService.createOrder(this.payOrder).then(res=>{
        this.message.success('','创建订单成功！')
       if(res.complete =='0'){
         this.router.navigate( ['/pages/money/payment/order', { id: res.id }]);
       }else if(res.complete =='3'){
         this.router.navigate( ['/pages/money/order-manage']);
       }
     }).catch(err=>{
        this.message.error('',err.json().message);
     })
  }

  remove(data,index){
        this.payOrder.items.splice(index,1);
        this.feeSum();
  }

}
