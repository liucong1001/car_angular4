import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Http} from '@angular/http';
import { MessageService } from './../../../../@core/utils/message.service';
import { MarketService } from './../../../../@core/data/system/market.service';
import {Marketphotomap} from './../../../../@core/model/system/market-photo-map';


@Component({
  selector: 'ngx-market-photo-edit',
  templateUrl: './market-photo-edit.component.html',
  styleUrls: ['./market-photo-edit.component.scss'],
  providers: [MarketService, MessageService],
})
export class MarketPhotoEditComponent implements OnInit {

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
          this.marketService.getPhoto(params['id']).then(res => {
            this.isEdit = true;
            this.form.patchValue({
              id: res.id,
              name: res.name,
              business: res.business,
              formName: res.formName,
              max: res.max ,
              min : res.min,
              sort: res.sort,
              status: res.status,
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
    id: [''],
    name: ['', [Validators.required]],
    memo: [''],
    certificateCode: ['', [Validators.required]],
    formName: ['', [Validators.required]],
    status: ['', [Validators.required]],
    max: ['', [Validators.required]],
    min: ['', [Validators.required]],
    sort: ['', [Validators.required]],
    business: ['', [Validators.required]],
    market: this.fb.group({
      id: ['', [Validators.required]],
      name: [''],
    }),
  });


  /**
   * 保存
   * @returns {boolean}
   */
  save() {
    if (this.form.invalid) {
      return false;
    }
    const marketphotomap = this.form.value as Marketphotomap;
    window.console.log('保存的对象', marketphotomap);
    if (this.isEdit) {
      this.marketService.savePhotoEdit(marketphotomap).then(res => {
        this.message.success('保存成功', '费用保存成功');
        this.back();
      }).catch(err => {
        this.message.error('保存失败', err.json().message);
      });
    }else {
      this.marketService.savePhoto(marketphotomap).then(res => {
        this.message.success('保存成功', '费用保存成功');
        this.back();
      }).catch(err => {
        this.message.error('保存失败', err.json().message);
      });
    }
  }

  back() {
    this.router.navigate( ['/pages/system/market/photo', { id: this.marketId , marketName: this.marketName}]);
   }


}
