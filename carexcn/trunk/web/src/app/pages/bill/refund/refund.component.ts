import {Component, OnInit} from '@angular/core';
import {TradeService} from "../../../@core/data/business/trade.service";
import {TradeForm} from "../../../@core/model/business/trade/trade.form";
import {PrintService} from "../../../@core/data/money/print.service";
import {TradeBill} from "../../../@core/model/money/print.model";
import {MessageService} from '../../../@core/utils/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BillService} from "../../../@core/data/bill/bill.service";

@Component({
  selector: 'ngx-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss'],
  providers: [TradeService, PrintService, BillService],
})

export class RefundComponent implements OnInit {

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
      });
      this.printService.createBill(this.archivesNo).then(res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].business.businessType == '11') {
            this.printId = res[i].id;
          }
        }
      });
      /**
       *step2-
       */
      this.bill.findValidBill(this.archivesNo).then(res => {
        this.billList = res;
        console.log('列表', this.billList);
      })
    }
  }

  /**
   * 执行退票操作
   */
  refund() {
    console.log('开始退票', this.archivesNo, this.selectBillNo);
    this.bill.createBill('14', this.archivesNo, this.selectBillNo).then(res => {
      alert('退票成功！');
    })
  }


}