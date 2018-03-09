import { Component, OnInit } from '@angular/core';
import {IccardModel, IccardOperaModel} from '../../../../@core/model/business/iccard.model';
import {MessageService} from '../../../../@core/utils/message.service';
import {IccardService} from '../../../../@core/device/iccard.service';
import {Location} from '@angular/common';
import {MerchantService} from '../../../../@core/data/merchant/merchant.service';
import {Http} from '@angular/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MerchantModel} from '../../../../@core/model/business/merchant.model';
import {Router, ActivatedRoute} from '@angular/router';
import {ErrorMessage} from "../../../../@core/ui/valid-error/valid-error.component";
import { FinanceBindService } from './../../../../@core/data/merchant/financeBind.service';
import {FinanceBindmap} from '../../../../@core/model/merchant/financeBind';
@Component({
  selector: 'ngx-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.scss'],
  providers:[FinanceBindService],
})
export class BindingComponent implements OnInit {

  merchant = new  MerchantModel();
  icCardInfo= new IccardModel('云石科技', '0001', 18);
  // 组件初始华
  ngOnInit() {
    this.route.params.subscribe(p => {
      // console.log("ic卡模型",this.card.account.accountID);
      if (p.id) {
        this.merchantService.get(p.id).then( res => {
          this.merchant = res.merchant as MerchantModel;
          this.card.account ={
              cloudUser:'0001',
              id:this.merchant.account.id
          }
          console.log('获取的信息',this.merchant);
          console.log("ic卡",this.card);
          // this.card.account.accountID =
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
              private  financeBindService:FinanceBindService,
  ) { }
  public iccardData = new IccardModel('云石科技', '0001', 18);
  public iccardPayData = new IccardOperaModel();
  public iccardRechargeData = new IccardOperaModel();
  public card = new FinanceBindmap();
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
          // this.card.icCard={
          //
          // }
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
    this.iccard.getPassword().then(pwd =>{
       console.log('输入的密码',pwd);
       if(pwd.length!=6){
         this.iccard.playSound(8);
       }else {
         this.iccard.playSound(11);
         this.iccard.getPassword().then(repwd =>{
             if(repwd !=pwd){
               this.iccard.playSound(5);
             }else {

               this.card.icCard = {
                   icCardNo:this.icCardInfo.CardNumber,
                   passWord:pwd
               }
               // const pwdMd5=md5.createHash();
                  console.log("输出card对象",this.card);
               this.financeBindService.save(this.card).then(res=>{
                 this.message.success('恭喜你', '绑卡成功！');
               }).catch(err => {
                 this.message.error('保存失败', err.json().message);
               });
             }
         })
       }
    })
  }


}
