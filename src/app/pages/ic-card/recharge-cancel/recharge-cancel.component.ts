import { Component, OnInit } from '@angular/core';
import {IcCardOperationService}from '../../../@core/data/ic-card/card.service'
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {rechargeCancelModel} from '../../../@core/model/icCard/rechargeCancel';
import {MessageService} from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-recharge-cancel',
  templateUrl: './recharge-cancel.component.html',
  styleUrls: ['./recharge-cancel.component.scss'],
  providers:[IcCardOperationService],
})
export class RechargeCancelComponent implements OnInit {

  public  rechargeCancelInfo = new rechargeCancelModel();
  constructor(private IcCardOperationService: IcCardOperationService,  public router: Router,
              private route: ActivatedRoute, private message: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.IcCardOperationService.rechargeInfo(p.id).then(res =>{
                this.rechargeCancelInfo = res;
                this.rechargeCancelInfo.cloudUser = '0001';
        });
      }
    });
  }

  public cancel(){
     console.log('撤销',this.rechargeCancelInfo);
     this.IcCardOperationService.rechargeCancel(this.rechargeCancelInfo).then(res=>{
       this.message.success('', '撤销成功！');
       this.router.navigate( ['/pages/ic-card/recharge-record']);
     })
  }

}
