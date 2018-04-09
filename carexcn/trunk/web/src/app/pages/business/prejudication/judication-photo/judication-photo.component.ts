import { Component, OnInit } from '@angular/core';
import {PrejudicationService} from '../../../../@core/data/business/prejudication.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {FingerService} from '../../../../@core/device/finger.service';
import {FileSystemService} from '../../../../@core/data/system/file-system.service';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {BusinessTradeViewForm} from '../../../../@core/model/business/restruct/business.trade.view.form';

/**
 * 预审业务 - 预审审核 - 卖方拍照 --—接口与页面的交互逻辑
 * 1、拍照卖家头像，录入卖家指纹
 * 2、合同显示与查看
 */
@Component({
  selector: 'ngx-judication-photo',
  templateUrl: './judication-photo.component.html',
  styleUrls: ['./judication-photo.component.scss'],
})
export class JudicationPhotoComponent implements OnInit {
  private _cache_pre = 'business_prejudication_recording_';
  sellerCertificateFormConfig: Marketphotomap;
  avatar = {
    title: '卖家头像拍照',
    source: 'assets/images/camera1.jpg',
  };
  constructor(
    private _message: MessageService,
    private _finger: FingerService,
    private _file: FileSystemService,
    private _prejudicationService: PrejudicationService,
    private _localstorage: LocalstorageService,
  ) { }
  ngOnInit() {
    /**
     * 卖家证件类型表单配置
     * @type {{}}
     */
    this.sellerCertificateFormConfig = {
      // certificateCode: '00', // 证件类型代码集 // 只要符合表单就行
      formName: '预审审核卖家', // 表单名称
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
    let trades_view = this._localstorage.get('business_recording_trade_view_form') as BusinessTradeViewForm;
    trades_view.seller.reviewPhotos = this._file.filterPhotosValue({
      '31': [this.avatarPhotosToSubmit], // 卖家头像
      '32': [this.fingerImgPhotosToSubmit], // 卖家指纹
    });
    this._prejudicationService.review(trades_view).then(res => {
      console.info(res);
      this._message.success('操作成功！', '有' + trades_view.tradeIds.length + '个车辆审核通过。');
    }).catch(err => {
      console.info(err);
      console.info(err.message);
      this._message.error('操作失败!', err.message);
    });
  }
}
