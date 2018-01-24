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

  constructor(private paymentService:PaymentService,private message:MessageService) {
  }

  // ngOnChanges 可监控组件变量
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('监听流水号',changes);
  }
  archiveNoChange(arcNo:string){
     console.log('监听',arcNo,'长度',arcNo.length);
       if(arcNo.length==16){
        this.search(arcNo);
      }
  }
  // 组件初始华
  ngOnInit() {
    this.paymentService.getCost('0001').then(res=>{
         this.costList = res;
    })
    // this.payOrderItem.payment = this.businessObjectPayment;
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
  costChange(data){
    console.log('选择',data);
  }

  /**
   * 根据流水号或者车牌号查询
   * @param data
   */
  search(data){

    this.paymentService.getArcInfo(data).then(res=>{
           // this.payOrderItem.items = [];
          this.payOrderItem = {items:[],payment:{shouldAmount:null,archiveNo:'',accountName:'',businessObjectId:''}};
      // this.payOrderItem.payment = new BusinessObjectPayment();
      // this.payOrderItem.items = [];
          //流水号，账户，实收信息 prejudication

          this.businessObjectPayment={
             archiveNo :data,
            shouldAmount:res.preVehicle.preVehicle.fee,
            accountName:res.preVehicle.preVehicle.merchant.name,
            businessObjectId:res.prejudication.business.id
          };
         this.payOrderItem.payment = this.businessObjectPayment;
         //详细费用
          this.businessObjectPaymentInfo ={
            feeType:this.transFeeType,
            shouldAmount:res.preVehicle.preVehicle.fee,
            invoice:'1',
            businessType:res.prejudication.business.businessType,
            archiveNo: this.businessObjectPayment.archiveNo,
            accountName:this.businessObjectPayment.accountName,
          };

          this.payOrderItem.items.push(this.businessObjectPaymentInfo);
          /*生成订单账户id*/
          this.payOrder.accountId = res.preVehicle.preVehicle.merchant.account.id;

         this.list.push(this.payOrderItem);


        console.log("生成数据", this.payOrderItem);
        console.log('列表创建数据',this.list);
    }).catch(err=>{
      this.message.error('查询失败',err.message);
    })

  }

  /**
   * 生成表格
   */
  createTable(){
    console.log("选择的费用",this.selectedCost);
    console.log('列表前',this.list);
    for(var i in this.selectedCost){
        this.payOrderItem.items.push({
          feeType:      this.selectedCost[i].priceType,
          shouldAmount: +this.selectedCost[i].money,  //+ 字符串转数字类型
          invoice:      this.selectedCost[i].invoice,
          businessType: this.selectedCost[i].businessType,
          archiveNo:   this.businessObjectPayment.archiveNo,
          accountName: this.businessObjectPayment.accountName,
        });
      // this.payOrderItem.payment.shouldAmount =  this.payOrderItem.payment.shouldAmount + (+this.selectedCost[i].money);
      }
     // this.list.push(this.payOrderItem);

    console.log("生成单个流水",this.payOrderItem);
    // "生成list",this.list,
    console.log('列表后',this.list);
    this.payOrder.items.push(this.payOrderItem);
    //   console.log('订单',this.payOrder);
  }

  /**
   * 创建订单
   */
  creatOrder(){
     for( var i in this.payOrder.items){
       this.payOrder.shouldAmount += this.payOrder.items[i].payment.shouldAmount;
     }
     this.payOrder.actualAmount = this.payOrder.shouldAmount;
      console.log("创建订单",this.payOrder);
      this.paymentService.createOrder(this.payOrder).then(res=>{
         this.message.success('','创建订单成功！')
      }).catch(err=>{
         this.message.error('',err.json().message);
      })
  }

}
