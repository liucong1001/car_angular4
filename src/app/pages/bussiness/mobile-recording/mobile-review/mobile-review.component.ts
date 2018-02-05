import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TradeService} from '../../../../@core/data/bussiness/trade.service';
import { ActivatedRoute, Router,Params, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { MessageService } from '../../../../@core/utils/message.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';
import {SellerForm} from '../../../../@core/model/bussiness/trade/seller.form';
import {MobileService} from '../../../../@core/data/bussiness/mobile.service';

@Component({
  selector: 'ngx-mobile-review',
  templateUrl: './mobile-review.component.html',
  styleUrls: ['./mobile-review.component.scss'],
  providers:[TradeService,MobileService],
})
export class MobileReviewComponent implements OnInit {

  constructor(private  tradeService:TradeService,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private message: MessageService,private mobileService:MobileService) {

    this.route.params.subscribe((params: Params) => {
      this.archiveNo = params['archiveNo'];
      if (params['archiveNo']) {
        this.tradeService.get(params['archiveNo']).then(res => {
          this.tradeInfo = res;
          console.log('获取到',res);
        }).catch(err => {
          this.message.error('获取失败', err.json().message);
        });
      }
    });
  }

  tradeInfo : TradeForm ;

  @Input() btn_show = true;
  public photos_name = {};

  public  archiveNo = '';
  ngOnInit() {
    console.log('获取对象',this.tradeInfo);

  }

  back(){

    // this.mobileService.back().then(res=>{
    //   this.message.success('','回退成功!');
    // }).catch(err=>{
    //   this.message.error('回退失败',err.json().message);
    // })

  }
  startInput(){
    this.router.navigate( ['/pages/bussiness/mobile-recording/input', { archiveNo:this.archiveNo }]);
  }


}
