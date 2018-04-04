import {Component, OnInit} from '@angular/core';
import {TradeService} from "../../../@core/data/business/trade.service";
import {TradeForm} from "../../../@core/model/business/trade/trade.form";
import {PrintService} from "../../../@core/data/money/print.service";
import {TradeBill} from "../../../@core/model/money/print.model";
import {MessageService} from '../../../@core/utils/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BillService} from "../../../@core/data/bill/bill.service";


@Component({
  selector: 'ngx-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
  providers: [TradeService, PrintService, BillService],
})
export class ChangeComponent implements OnInit {

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
    this.businessType='0';
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
      });
      this.printService.createBill(this.archivesNo).then(res => {
        // for (var i = 0; i < res.length; i++) {
        //   if (res[i].business.businessType == '11') {
        //     this.printId = res[i].id;
        //   }
        // }
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
   * 交易修改
   */
  transModify(){
    // this.businessType = '16';
    this.bill.createBill('16', this.archivesNo, null,true).then(res => {
      this.message.success('交易修改成功！','');
    })
  }

  /**
   * 换票
   */
  changeBill(){
    this.bill.createBill(this.businessType, this.archivesNo, this.selectBillNo,this.needModify).then(res => {
      alert('换票成功！');
    })
  }

  /**
   * 重开票
   */
  rePrintBill(){
    this.businessType = '12';
    this.bill.createBill(this.businessType, this.archivesNo, null,this.needModify).then(res => {
      this.message.success('重开票成功！','');
    })
  }

}
