import { Marketfeemap } from './../../../../@core/model/system/market-fee-map';
import { MessageService } from './../../../../@core/utils/message.service';
import { MarketService } from './../../../../@core/data/system/market.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: `ngx-market-fee-edit`,
  templateUrl: './market-fee-edit.component.html',
  styleUrls: ['./market-fee-edit.component.scss'],
  providers: [MarketService, MessageService],
})
export class MarketFeeEditComponent implements OnInit {

  isEdit = false;
  marketId = '';
  marketName = '';
  constructor(private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public http: Http,
    private marketService: MarketService,
    private message: MessageService) {
    this.route.params.subscribe((params: Params) => {
      this.marketId = params['marketId'];
      this.marketName = params['marketName'];
      if (params['id']) {
        this.marketService.getFee(params['id']).then(res => {
          this.isEdit = true;
          this.form.patchValue({
            id: res.id,
            name: res.name,
            businessType: res.businessType,
            priceType: res.priceType,
            money: res.money,
            invoice: res.invoice,
            discount: res.discount,
            required: res.required,
            memo: res.memo,
            market: {
              id: this.marketId,
              name: this.marketName,
            },
          });
        }).catch(err => {
          this.message.error('获取失败', err.json().message);
        });
      }
    });

    this.form.patchValue({
      market: {
        id: this.marketId,
        name: this.marketName,
      },
    });

  }

  ngOnInit() {
  }

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    businessType: ['', [Validators.required]],
    money: ['', [Validators.required]],
    invoice: ['', [Validators.required]],
    discount: ['', [Validators.required]],
    required: ['', [Validators.required]],
    priceType: ['', [Validators.required]],
    memo: [''],
    market: this.fb.group({
      id: ['', [Validators.required]],
      name: [''],
    }),
    id: [null],
  });

  save() {
    if (this.form.invalid) {
      return false;
    }
    const marketfeemap = this.form.value as Marketfeemap;
    window.console.log('费用', marketfeemap);
    if (this.isEdit) {
      this.marketService.saveFeeEdit(marketfeemap).then(res => {
        this.message.success('保存成功', '费用修改成功');
        this.back();
      }).catch(err => {
        this.message.error('保存失败', err.json().message);
      });
    } else {
      this.marketService.saveFee(marketfeemap).then(res => {
        this.message.success('保存成功', '费用保存成功');
        this.back();
      }).catch(err => {
        this.message.error('保存失败', err.json().message);
      });
    }
  }
 back() {
  this.router.navigate( ['/pages/system/market/fee', { id: this.marketId , marketName: this.marketName}]);
 }


}
