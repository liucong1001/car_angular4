import { Component, OnInit } from '@angular/core';
import {MarketDifferService} from "../../../../@core/data/system/market-differ-server";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Http} from "@angular/http";
import {MarketService} from "../../../../@core/data/system/market.service";
import {MessageService} from "../../../../@core/utils/message.service";
import {Marketfeemap} from "../../../../@core/model/system/market-fee-map";
import {marketDiffer} from "../../../../@core/model/system/market-differ";
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';

@Component({
  selector: 'market-differ',
  templateUrl: './market-differ.component.html',
  styleUrls: ['./market-differ.component.scss'],
  providers: [MarketDifferService],
})
export class MarketDifferComponent implements OnInit {
  isEdit="false";
  id="";
  marketId="";
  marketName="";
  constructor(private fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private marketService: MarketDifferService,
              private message: MessageService) {

  }

  ngOnInit() {
    // 获取参数
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
      this.form.patchValue({marketId:this.id});
        // 发送请求
        this.marketService.findByMarketId(params['id']).then(res =>{
          this.form.patchValue({
            entrust:res.entrust,
            sellerPrice :res.sellerPrice,
            sellerMileage :res.sellerMileage,
            buyerPrice :res.buyerPrice,
            picture :res.picture,
          })
      });
    });
  }


  /**
   *   html  表单
   * @type {FormGroup}
   */
  form: FormGroup = this.fb.group({
    marketId: ['', [Validators.required]],
    entrust: ['', [Validators.required]],
    sellerPrice: ['', [Validators.required]],
    sellerMileage: ['', [Validators.required]],
    buyerPrice: ['', [Validators.required]],
    picture: ['', [Validators.required]],
  });


  //校验
  errors = {
    entrust: [
      new ErrorMessage('required', '是否需要委托人必须选择！'),
    ],
    sellerPrice: [
      new ErrorMessage('required', '卖方是否需要价格必须选择！'),
    ],
    sellerMileage: [
      new ErrorMessage('required', '卖方是否需要价格必须选择！'),
    ],
    buyerPrice: [
      new ErrorMessage('required', '买方是否需要价格必须选择！'),
    ],
    picture: [
      new ErrorMessage('required', '是否显示图片必须选择！'),
    ],
  };


  save() {
    //console.log('差异',  this.form.value );
    // 判断表单是否合法
    if (this.form.invalid) {
      return false;
    }
    const marketdiffer = this.form.value as marketDiffer;
    // 发送请求
    this.marketService.saveMarketDiff(this.form.value).then(res =>{
      this.message.success('保存成功', '市场配置保存成功');
      this.back();
    }).catch(err=>{
      this.message.error('保存失败', err.json().message);
    });
  }
  back() {
    this.router.navigate( ['/pages/system/market/market', { id: this.marketId }]);
  }

}
