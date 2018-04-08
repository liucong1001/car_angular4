import {Component, OnInit} from '@angular/core';
import {Marketphotomap} from '../../../@core/model/system/market-photo-map';
import {MarketService} from '../../../@core/data/system/market.service';
import {MessageService} from '../../../@core/utils/message.service';
import {CurrentMarketService} from '../../../@core/data/current-market.service';
import {RestService} from '../../../@core/utils/rest.service';

@Component({
  selector: 'ngx-ys-api-check',
  templateUrl: './api-check.component.html',
  styleUrls: ['./api-check.component.scss'],
})
export class ApiCheckComponent implements OnInit {

  constructor(
    private _message: MessageService,
    private _market: MarketService,
    private _currentMarket: CurrentMarketService,
    private _rest: RestService,
  ) { }

  ngOnInit() {
  }

  /**
   * 初始化照片动态表单
   */
  certTypeSelecteFunc(event) {
    console.info('certTypeSelecteFunc', event);
    this.getCertificateFormConfig_certificateCode = event;
  }
  getCertificateFormConfig_certificateCode = '00';
  getCertificateFormConfig_business = '01';
  getCertificateFormConfig_formName = '预审录入卖家';
  getCertificateFormConfig() {
    this._market.getCertificateConfig({
      isApp: '0',
      certificateCode: this.getCertificateFormConfig_certificateCode, // 证件类型代码集
      business: this.getCertificateFormConfig_business, //  01 预审  02 过户
      formName: this.getCertificateFormConfig_formName, // 表单名称
    } as Marketphotomap).then(marketphotomap_arr => {
      if (marketphotomap_arr.length) {
        let isAllPhotoOk = true;
        marketphotomap_arr.forEach(r => {
          if (r.photoExample) {
            console.info('r.photoExample', r.photoExample);
          } else {
            isAllPhotoOk = false;
            console.info('r: ', r);
            this._message.error('缺少关联示例图片', '表单为“' + r.formName + '”的“' + r.name + '”缺少关联的示例图片，请添加');
            // throw new Error('表单为“' + r.formName + '”的“' + r.name + '”缺少关联的示例图片，请添加');
            console.info('表单为“' + r.formName + '”的“' + r.name + '”缺少关联的示例图片，请添加');
          }
        });
        if (isAllPhotoOk) {
          this._message.success('检查通过', '配置检查完整无误可用于生产');
        } else {
          // this._message.success('检查通过', '配置检查完整无误可用于生产');
        }
      } else {
        this._message.error('缺少配置', '没有发现对应的表单配置');
      }
    });
  }


  currentMarketData;
  getCurrentMarket() {
    this._currentMarket.getCurrentMarketInfo().then(res => {
      console.info('当前市场相关信息:', res);
      this.currentMarketData = res;
    });
  }
  test1ClickUrl = '';
  test1ClickType = 'GET';
  test1Click() {
    if ( 'GET' === this.test1ClickType ) {
      this._rest.get(this.test1ClickUrl).subscribe(res => {
        console.info(res);
      });
    } else if ( 'POST' === this.test1ClickType ) {
      this._rest.post(this.test1ClickUrl, null).subscribe(res => {
        console.info(res);
      });
    }
  }
}
