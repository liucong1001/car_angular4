import {Component, OnInit} from '@angular/core';
import {TradeService} from "../../../@core/data/business/trade.service";
import {TradeForm} from "../../../@core/model/business/trade/trade.form";
import {PrintService} from "../../../@core/data/money/print.service";
import {TradeBill} from "../../../@core/model/money/print.model";
import {MessageService} from '../../../@core/utils/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BillService} from "../../../@core/data/bill/bill.service";

@Component({
  selector: 'app-pay-again',
  templateUrl: './pay-again.component.html',
  styleUrls: ['./pay-again.component.scss'],
  providers: [TradeService, PrintService, BillService],
})
export class PayAgainComponent implements OnInit {


  businessType:string;
  needModify:boolean;
  archivesNo: string;

  trade = new TradeForm();
  tradeBill = new TradeBill();
  isGetDate: Boolean = false;
  printId: string;
  printTime: '';
  msg: string;
  billList = [];
  selectBillNo: string;

  constructor(private tradeService: TradeService, private printService: PrintService, private message: MessageService,
              public router: Router, private bill: BillService) {
  }

  ngOnInit() {
    this.businessType='15';
    // 换票现在选择“否”,选择“是”的话
    this.needModify = false;
  }

  argNoSearch(event: any) {
    this.msg = '';
    if (event.keyCode == 13 && String(this.archivesNo).length == 16) {
      /**
       * step1-
       */
      this.tradeService.get(this.archivesNo).then(res => {
        this.trade = res;
        this.isGetDate = true;
      }).catch(err=>{
        this.message.error('',err.message)
      });

      // this.printService.createBill(this.archivesNo).then(res => {
      // });
      // /**
      //  *step2-
      //  */
      // this.bill.findValidBill(this.archivesNo).then(res => {
      //   this.billList = res;
      //   console.log('列表', this.billList);
      // })
    }
  }

  confirm(){
    this.bill.createBill(this.businessType, this.archivesNo, this.selectBillNo,this.needModify).then(res => {
       this.message.success('补缴成功!','')
    })
  }

}
