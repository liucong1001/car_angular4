import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TradeService} from '../../../../@core/data/bussiness/trade.service';
import { ActivatedRoute, Router,Params, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { MessageService } from '../../../../@core/utils/message.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';
import {MobileService} from '../../../../@core/data/bussiness/mobile.service';

@Component({
  selector: 'ngx-mobile-input',
  templateUrl: './mobile-input.component.html',
  styleUrls: ['./mobile-input.component.scss'],
  providers:[TradeService,MobileService],
})
export class MobileInputComponent implements OnInit {

  constructor(private  tradeService:TradeService,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private message: MessageService,private mobileService:MobileService) {}

  public  tradeInfo = new TradeForm() ;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['archiveNo']) {
        this.tradeService.get(params['archiveNo']).then(res => {
          this.tradeInfo = res;
          console.log('input获取到',res);
        }).catch(err => {
          this.message.error('获取失败', err.json().message);
        });
      }
    });
  }
  save(){
    console.log('开始录入');
  }

}
