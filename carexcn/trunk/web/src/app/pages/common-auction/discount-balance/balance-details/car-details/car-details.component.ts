import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {commonAutionBalanceService} from '../../../../../@core/data/common-aution/balance.service';
import {MessageService} from '../../../../../@core/utils/message.service';


@Component({
  selector: 'ngx-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
  providers:[commonAutionBalanceService],
})
export class CarDetailsComponent implements OnInit {

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private commonAutionBalanceService:commonAutionBalanceService,
              private message:MessageService) { }

      info :object ;
      paramsId:string;
      isgetValue:boolean = false;
  ngOnInit() {
    this.route.params.subscribe(p => {
      this.paramsId = p.id;
      if (p.id) {
        this.commonAutionBalanceService.settlementAgain('0',p.id).then(res=>{
               this.info = res;
             this.isgetValue =true;
        })
      }
    });
  }

  confirm(){
    this.commonAutionBalanceService.settlementAgain('1',this.paramsId).then(res=>{
      this.message.success('','结算成功！');
      this.back();
    }).catch(err=>{
      this.message.error('失败',err.json().message);
    })
  }

  back(){
    this.router.navigate(['/pages/common-auction/discount-balance/balance-details', { id:this.paramsId}]);
  }

}
