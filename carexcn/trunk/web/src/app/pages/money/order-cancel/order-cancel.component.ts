import {Component, OnInit,OnChanges,DoCheck,} from '@angular/core';
import { ActivatedRoute, Router,Params, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {MessageService} from '../../../@core/utils/message.service';
import {paymentOrderModel,paymentOrderPayModel} from "../../../@core/model/money/paymentOrder.model";
import {BusinessObjectPayment} from "../../../@core/model/money/payment.model";
import {PaymentOrderService} from "../../../@core/data/money/paymentOrder.service"
import { FormsModule } from '@angular/forms';
import {OrderCancelService} from '../../../@core/data/money/orderCancel.service';

@Component({
  selector: 'ngx-order-cancel',
  templateUrl: './order-cancel.component.html',
  styleUrls: ['./order-cancel.component.scss'],
  providers:[PaymentOrderService,OrderCancelService],
})
export class OrderCancelComponent implements OnInit {

 public BusinessObjectPayment: BusinessObjectPayment[];
 public choseId:string;
 public OrderInfo = new paymentOrderModel() ;

  constructor(public router: Router,
              private route: ActivatedRoute, private message: MessageService,
              private paymentOrderService:PaymentOrderService,private orderCancelService:OrderCancelService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.paymentOrderService.getOrderInfo(params['id']).then(res => {
          this.OrderInfo = res;
          this.BusinessObjectPayment = res.businessObjectPayments ;
          console.log('获取到的',this.BusinessObjectPayment);
        }).catch(err => {
          this.message.error('获取失败', err.json().message);
        });
      }
    });
  }

 delete(id){
    console.log('删除',id);
     this.orderCancelService.orderArcDelete(id).then(res=>{
       this.message.success('','删除成功！');
       this.ngOnInit();
     }).catch(err=>{
        this.message.error('',err.json().message);
     });
 }
  refund(id){
    // this.router.navigate( ['/pages/system/market/market/edit', { id: row.id ,area:row.area}]);
    this.router.navigate( ['/pages/money/order/cancel/refund',{id:id}]);
  }
}
