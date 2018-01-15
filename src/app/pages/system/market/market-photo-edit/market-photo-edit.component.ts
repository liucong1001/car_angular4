import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Http} from '@angular/http';
import { MessageService } from './../../../../@core/utils/message.service';
import { MarketService } from './../../../../@core/data/system/market.service';
import {Marketphotomap} from './../../../../@core/model/system/market-photo-map';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';

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
  marketisApp= '';

  constructor(private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public http: Http,
    private marketService: MarketService,
    private message: MessageService) {
      this.route.params.subscribe((params: Params) => {
        this.marketId = params['marketId'];
        this.marketName = params['marketName'];
        this.marketisApp = params['marketisApp'];
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
              certificateCode:res.certificateCode,
              photoType:res.photoType,
              market: {
                id: this.marketId,
                name: this.marketName,
              },
            });
          }).catch(err => {
            this.message.error('获取失败', err.json().message);
          });
        }else {
          this.form.patchValue({
            business: params['business'],
            formName: params['formName'],
            certificateCode:params['certificateCode'],
          });
        }
      });

      this.form.patchValue({
        isApp :this.marketisApp,
        market: {
          id: this.marketId,
          name: this.marketName,
        },
      });
     }

  ngOnInit() {
  }

  form: FormGroup = this.fb.group({
    isApp:[''],
    id: [''],
    name: ['', [Validators.required]],
    memo: [''],
    certificateCode: ['', [Validators.required,Validators.maxLength(2)]],
    photoType: ['', [Validators.required,Validators.maxLength(2)]],
    formName: ['', [Validators.required]],
    status: ['', [Validators.required]],
    max: ['', [Validators.required]],
    min: ['', [Validators.required]],
    sort: [''],
    business: ['', [Validators.required,Validators.maxLength(4)]],
    market: this.fb.group({
      id: ['', [Validators.required]],
      name: [''],
    }),
  });

  errors = {
    name: [
      new ErrorMessage('required', '证件名称必须填写'),
    ],
    business: [
      new ErrorMessage('required', '业务类型必须填写！'),
      new ErrorMessage('maxlength', '业务类型过长！'),
    ],
    certificateCode: [
      new ErrorMessage('required', '证件类型代码集必须填写！'),
      new ErrorMessage('maxlength', '证件类型代码集过长！'),
    ],
    photoType: [
      new ErrorMessage('required', '照片类型代码集必须填写！'),
      new ErrorMessage('maxlength', '照片类型代码集过长！'),
    ],
    formName: [
      new ErrorMessage('required', '表达名称必须填写！'),
    ],
    status: [
      new ErrorMessage('required', '状态必须选择！'),
    ],
    max: [
      new ErrorMessage('required', '最大张数必须填写！'),
    ],
    min: [
      new ErrorMessage('required', '最小张数必须填写！'),
    ],
  };


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
    this.router.navigate( ['/pages/system/market/market/photo', { id: this.marketId , marketName: this.marketName,isApp:this.marketisApp}]);
   }


}
