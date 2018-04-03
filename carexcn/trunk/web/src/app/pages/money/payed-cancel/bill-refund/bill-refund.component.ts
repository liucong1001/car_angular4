import { Component, OnInit } from '@angular/core';
import {BillRefundService} from "../../../../@core/data/money/bill-refund.service";
import {ActivatedRoute, Router, Params} from '@angular/router';
import {PaymentService} from "../../../../@core/data/money/payment.service";


@Component({
  selector: 'ngx-bill-refund',
  templateUrl: './bill-refund.component.html',
  styleUrls: ['./bill-refund.component.scss'],
  providers:[BillRefundService,PaymentService],
})
export class BillRefundComponent implements OnInit {

  constructor(public service:BillRefundService,
              public router: Router,
              public route: ActivatedRoute,
              public paymentService: PaymentService) { }

  data :object;
 feeList = [];
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
        if(params['id']){
            this.service.getInfo(params['id']).then(res=>{
                this.data = res;
                this.paymentService.getArcFee(res.businessObjectPayment[0].archiveNo,res.type,
                  res.businessObjectPayment[0].arcNoType).then(result=>{
                       this.feeList = result;
                  // for( var i in result){
                  //   this.data.paymentInfo.push({
                  //     name:         result[i].name,
                  //     feeType:      result[i].priceType,
                  //     money:        result[i].money.split(','),
                  //     shouldAmount: result[i].money,
                  //     invoice:      result[i].invoice,
                  //     businessType: result[i].businessType,
                  //   })
                  // }

                  // this.data.payment={
                  //   archiveNo:this.data?.businessObjectPayment[0].archiveNo,
                  //   shouldAmount:0,
                  //   businessObjectId:this.data.id,
                  //   businessType:this.data.type,
                  //   accountName:this.data.preVehicle.preVehicle.merchant.name,
                  //   arcNoType:'1',
                  //   paymentinfo:null,
                  // }
                  console.log('提交对象',this.data);
                })
            })
        }
    })
  }



  back(){
    this.router.navigate( ['/pages/money/payedCancel/']);
  }

}
