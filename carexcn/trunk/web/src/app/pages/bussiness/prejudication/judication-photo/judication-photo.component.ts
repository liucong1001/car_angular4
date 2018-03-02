import { Component, OnInit } from '@angular/core';
import {PrejudicationService} from '../../../../@core/data/bussiness/prejudication.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {FingerService} from '../../../../@core/device/finger.service';
import {FileSystemService} from '../../../../@core/data/system/file-system.service';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';

/**
 * 预审业务 - 预审审核 - 卖方拍照 --—接口与页面的交互逻辑
 * 1、拍照卖家头像，录入卖家指纹
 * 2、
 */
@Component({
  selector: 'ngx-judication-photo',
  templateUrl: './judication-photo.component.html',
  styleUrls: ['./judication-photo.component.scss'],
})
export class JudicationPhotoComponent implements OnInit {
  private _cache_pre = 'bussiness_prejudication_recording_';
  cameras: any[] = [{
    title: '卖家头像拍照',
    source: 'assets/images/camera1.jpg',
  }];
  constructor(
    private _message: MessageService,
    private _finger: FingerService,
    private _file: FileSystemService,
    private _prejudicationService: PrejudicationService,
    private _localstorage: LocalstorageService,
  ) { }
  ngOnInit() {}
  public fingerImgUrl = '/assets/images/camera1.jpg';
  public fingerBase64 = '';
  /**
   * 指纹读取
   */
  fingerRead() {
    this._message.info('指纹读取', '读取指纹');
    this._finger.read().then((data) => {
      // console.info('data', data);
      const response = JSON.parse(data.File);
      this.fingerImgUrl = this._file.getRealFileUrl('tmp:' + response.file[0]);
      this.fingerBase64 = data.Base64;
    }).catch((error) => {
      // console.log(error);
    });
  }

  /**
   * 审核通过的提交
   * {"17":["tmp:bc9ba2a5-8ae9-4c80-b003-6500256ec062.png"],"20":["tmp:be1523bd-0c69-4824-8468-0d7b034783aa.png"]}
   * 需要设置对应的附件类型才好传递照片
   */
  private reviewSeller = {'17': ['tmp:bc9ba2a5-8ae9-4c80-b003-6500256ec062.png'], '20': ['tmp:be1523bd-0c69-4824-8468-0d7b034783aa.png']};
  onSubmit() {
    let judication_trades = this._localstorage.get(this._cache_pre + 'judication_trade');
    console.info('fingerImgUrl', this.fingerImgUrl);
    console.info('fingerBase64', this.fingerBase64);
    console.info('judication_trades', judication_trades);
    let review_id = (judication_trades[0] as TradeForm).prejudication.business.id;
    let sellerinfo = (judication_trades[0] as TradeForm).seller.seller;
    console.info('review_id', review_id);
    let review_ids = [];
    for (let tmp in judication_trades) {
      if (judication_trades[tmp]) {
        let trade = judication_trades[tmp] as TradeForm;
        review_ids.push(trade.prejudication.id);
      }
    }
    console.info('review_ids', review_ids);
    this._prejudicationService.review(
      review_id,
      review_ids,
      this._file.filterPhotosValue(this.reviewSeller),
      sellerinfo,
    ).then(res => {
      console.info(res);
    }).catch(err => {
      console.info(err);
    });
  }
}
