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
  archiveNoChange(arcNo:string){
     console.log('监听',arcNo,'长度',arcNo.length);
       if(arcNo.length==16){

        this.paymentService.getPay(arcNo).then(res=>{
             console.log('数组长度',res.length);
             for(var i in res){
                 this.typeList.push(res[i].business.businessType);
             }
             console.log('业务数组',this.typeList);
             if(res.length==1){
               // 返回只有一种业务类型
               this.type=res[0].business.businessType;
               this.search(arcNo,this.type,res[0].id);
             }else  {
               // 返回多种业务类型
             }

        })
      }
  }
  // 组件初始华
  ngOnInit() {

    this.payOrderItem.payment = new BusinessObjectPayment();
    this.payOrderItem.items = [];
    /**
     * 初始化订单对象
     */
    this.payOrder = {
      shouldAmount:0,
       actualAmount:0,
       accountId:'',
          items:[],
     }
  }

  /**
   * 根据流水号或者车牌号查询
   * @param data
   */
  search(data,type,id){

    this.payOrderItem.items = [];
    this.paymentService.getArcInfo(data).then(res=>{
      this.payOrderItem.payment = {
        archiveNo:data,
        shouldAmount:0,
        businessObjectId:id,
        businessType:type,
        accountName:res.preVehicle.preVehicle.merchant.name,
      };
      this.payOrder.accountId = res.preVehicle.preVehicle.merchant.account.id;

          this.paymentService.getArcFee(data,type).then(result=>{

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
            this.payOrder.items.push({payment:this.payOrderItem.payment,items:this.payOrderItem.items});
            console.log('列表创建数据',this.list);
            console.log('表单对象', this.payOrder);

          }).catch(err=>{
            this.message.error('查询失败',err.message);
          })

    });
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
