import { Component, OnInit } from '@angular/core';
import {IccardModel, IccardOperaModel} from '../../../../@core/model/bussiness/iccard.model';
import {MessageService} from '../../../../@core/utils/message.service';
import {IccardService} from '../../../../@core/device/iccard.service';
import {Location} from '@angular/common';
import {MerchantService} from '../../../../@core/data/merchant/merchant.service';
import {Http} from '@angular/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {Router, ActivatedRoute} from '@angular/router';
import {ErrorMessage} from "../../../../@core/ui/valid-error/valid-error.component";

@Component({
  selector: 'ngx-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.scss'],
})
export class BindingComponent implements OnInit {

  merchant = {};
  icCardInfo={};
  // 组件初始华
  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.merchantService.get(p.id).then( res => {
          this.merchant = res.merchant as MerchantModel;
          console.log('获取的信息',this.merchant);
        });
      }
    });

  }
  constructor(private iccard: IccardService,
              private message: MessageService,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private http: Http,
              private fb: FormBuilder,
              private merchantService: MerchantService,
  ) { }
  public iccardData = new IccardModel('云石科技', '0001', 18);
  public iccardPayData = new IccardOperaModel();
  public iccardRechargeData = new IccardOperaModel();
  /*返回*/
  goBack() {
    this.location.back();
  }
  /**
   * IC卡文本写入
   */
  iccardText() {
    const self = this;
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      if (true === res) {
        self.iccard.showText(this.iccardData.Text);
        this.message.info('IC卡操作', '文本已写入！');
      }
    });
  }
  /**
   * 读取IC卡信息
   */
  readIccard() {
    const self = this;
    this.iccardPayData.amount = this.iccardPayData.amountDisplay * 100; // 单位转换
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      // console.log(res);
      if (true === res) {
        self.iccard.scanCard().then((s) => {
          self.iccardData.Banlance = s.Banlance;
          self.iccardData.BanlanceDisplay = (s.Banlance) / 100 ;
          this.icCardInfo = s;
          // console.log("ic卡",s);
        }).catch((e) => {
          // console.log(e);
          self.message.success('IC卡操作', 'IC卡连接不稳定。未能获取到余额');
        });
      }
    }).catch((e) => {
      // console.log(e);
      this.message.error('IC卡连接失败！', '设备或IC卡不正常或连接有误。');
    });
  }

  public sound(){
    console.log("声音！");
    this.iccard.beep();
  }

  public bindIcCard() {
    console.log("开始输入密码！");
    this.iccard.playSound(4);
    this.iccard.getPassword(500).then(res =>{
       console.log('输入的密码',res);
    })
  }


}
