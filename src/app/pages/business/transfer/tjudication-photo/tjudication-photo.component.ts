import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {FingerService} from '../../../../@core/device/finger.service';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {FileSystemService} from '../../../../@core/data/system/file-system.service';
import {PrejudicationService} from '../../../../@core/data/business/prejudication.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {TransferService} from "../../../../@core/data/business/transfer.service";

@Component({
  selector: 'ngx-tjudication-photo',
  templateUrl: './tjudication-photo.component.html',
  styleUrls: ['./tjudication-photo.component.scss'],
})
export class TjudicationPhotoComponent implements OnInit {
  private _cache_pre = 'business_transfer_judication_';
  buyerCertificateFormConfig: Marketphotomap;
  avatar = {
    title: '买家头像拍照',
    source: 'assets/images/camera1.jpg',
  };
  constructor(
    private _message: MessageService,
    private _finger: FingerService,
    private _file: FileSystemService,
    private _transferService: TransferService,
    private _localstorage: LocalstorageService,
  ) { }
  ngOnInit() {
    /**
     * 买家证件类型表单配置
     * @type {{}}
     */
    this.buyerCertificateFormConfig = {
      isApp: '0',
      // certificateCode: '00', // 证件类型代码集 // 只要符合表单就行
      business: '02', //  01 预审  02 过户
      formName: '过户审核买家', // 表单名称
    } as Marketphotomap;
  }
  public fingerImgUrl = '/assets/images/camera1.jpg';
  public fingerImgPhotosToSubmit = '';
  public fingerBase64 = '';
  /**
   * 指纹读取
   */
  fingerRead() {
    this._message.info('指纹读取', '读取指纹');
    this._finger.read().then((data) => {
      // console.info('data', data);
      const response = JSON.parse(data.File);
      this.fingerImgPhotosToSubmit = 'tmp:' + response.file[0];
      this.fingerImgUrl = this._file.getRealFileUrl(this.fingerImgPhotosToSubmit);
      this.fingerBase64 = data.Base64;
    }).catch((error) => {
      // console.log(error);
    });
  }

  /**
   * 头像提交值
   * @type {string}
   */
  public avatarPhotosToSubmit = '';

  /**
   * 拍照事件
   * @param event
   */
  changeAvatar(event) {
    this.avatarPhotosToSubmit = event;
  }

  /**
   * 审核通过的提交
   * 需要设置对应的附件类型才好传递照片
   * 后台必须配置好对应的照片编号，前台又不可以动态处理指纹照片
   */
  onSubmit() {
    let judication_trades = this._localstorage.get(this._cache_pre + 'judication_trade');
    console.info('fingerImgUrl', this.fingerImgUrl);
    console.info('fingerBase64', this.fingerBase64);
    console.info('judication_trades', judication_trades);
    let review_id = (judication_trades[0] as TradeForm).transfer.business.id;
    let sellerinfo = (judication_trades[0] as TradeForm).seller.seller;
    // console.info('review_id', review_id);
    let review_ids = [];
    for (let tmp in judication_trades) {
      if (judication_trades[tmp]) {
        let trade = judication_trades[tmp] as TradeForm;
        review_ids.push(trade.transfer.id);
      }
    }
    // console.info('review_ids', review_ids);
    this._transferService.review(
      review_id,
      review_ids,
      this._file.filterPhotosValue({
        '33': [this.avatarPhotosToSubmit], // 买家头像
        '34': [this.fingerImgPhotosToSubmit], // 买家指纹
      }),
      sellerinfo,
    ).then(res => {
      // console.info(res);
      this._message.success('操作成功！', '有' + review_ids.length + '个车辆审核通过。');
    }).catch(err => {
      console.info(err);
      console.info(err);
      console.info(err.message);
      this._message.error('操作失败!', err.message);
    });
  }
}
