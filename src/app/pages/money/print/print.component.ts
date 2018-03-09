import { Component, OnInit } from '@angular/core';
import {TradeService} from "../../../@core/data/business/trade.service";
import {TradeForm} from "../../../@core/model/business/trade/trade.form";
import {PrintService} from "../../../@core/data/money/print.service";
import {TradeBill} from "../../../@core/model/money/print.model";
import {MessageService} from '../../../@core/utils/message.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'ngx-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
  providers:[TradeService,PrintService],
})
export class PrintComponent implements OnInit {
  // 2018021100010001  2018030100010001
   a:string;
   archivesNo:string;
   trade = new TradeForm();
   tradeBill= new TradeBill();
   isGetDate:Boolean = false;
   printId:string;
   printTime:'';
   msg:string;
  constructor(private tradeService:TradeService,private printService:PrintService,private message: MessageService,
              public router: Router,) { }

  ngOnInit() {
  }

  /**
   * 根据流水号查询交易信息
   * @param event
   */
  argNoSearch(event:any){
    if(event.keyCode == 13&&String(this.archivesNo).length==16){
         this.tradeService.get(this.archivesNo).then(res=>{
            this.trade = res;
            this.isGetDate = true;
         });
         this.printService.createBill(this.archivesNo).then(res=>{
                for(var i=0;i<res.length;i++){
                     if(res[i].business.businessType =='11'){
                       this.printId=res[i].id;
                     }
                }
         });
    }
  }

  getPrintTime(val){
      console.log('开票日期',val);
  }

  print(){
     console.log('点击了开票',this.tradeBill);
     this.printService.print(this.printId,this.tradeBill).then(res=>{
       this.router.navigate( ['/pages/money/print/success', { id: '2' ,}]);

     }).catch(err=>{
       this.message.error('开票失败',err.json().message);
     });
  }
// extern /pager
}
