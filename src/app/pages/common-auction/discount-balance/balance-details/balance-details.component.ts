import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {commonAutionBalanceService} from '../../../../@core/data/common-aution/balance.service';
import {MessageService} from '../../../../@core/utils/message.service';

@Component({
  selector: 'ngx-balance-details',
  templateUrl: './balance-details.component.html',
  styleUrls: ['./balance-details.component.scss'],
  providers:[commonAutionBalanceService],
})
export class BalanceDetailsComponent implements OnInit {

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private commonAutionBalanceService:commonAutionBalanceService,
              private message:MessageService) { }

  paramsId :string;
  balanceData :object;
  againBanlance:boolean=false;
  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.paramsId = p .id;
        this.commonAutionBalanceService.getRecord(p.id).then(res=>{
               this.balanceData = res;
          if (Object.keys(res).length) {
            this.againBanlance = true;
            this.discounted = res[Object.keys(res).length-1].discount;
            this.paying = res[Object.keys(res).length-1].discountedAccounts;
            this.pay=  this.discounted - this.paying;
          }
        })
      }
    });
  }
  settleDate =[] ;
  //待支付
  setDate = true;
  discounted=0;
  paying=0;
  pay=0;
  Settlement(){
       console.log('第一次开始结算',this.paramsId);
       this.commonAutionBalanceService.settlement(this.paramsId).then(res=>{
         this.settleDate[0]=res;
         this.discounted=res.saleProject.discounted;
         this.paying=res.saleProject.paying;
         this.pay=res.saleProject.discounted-res.saleProject.paying;
         this.message.success('','结算成功!');
       }).catch(err=>{
         this.message.error('失败',err.json().message);
       })
  }

  /*返回*/
  goBack(): void {
    this.location.back();
  }

  SettlementCarLink(){
    this.router.navigate(['/pages/common-auction/discount-balance/balance-details/car-details', { id:this.paramsId}]);
  }

  /**
   * 支付
   */
  payAccount(){
    this.commonAutionBalanceService.pay(this.paramsId).then(res=>{
      this.message.success('','支付成功!');

    }).catch(err=>{
      this.message.error('失败',err.json().message);
    })
  }
}
