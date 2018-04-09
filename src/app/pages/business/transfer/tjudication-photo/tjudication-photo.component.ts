import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {FingerService} from '../../../../@core/device/finger.service';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {FileSystemService} from '../../../../@core/data/system/file-system.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {TransferService} from '../../../../@core/data/business/transfer.service';
import {BusinessTradeViewForm} from "../../../../@core/model/business/restruct/business.trade.view.form";

@Component({
  selector: 'ngx-tjudication-photo',
  templateUrl: './tjudication-photo.component.html',
  styleUrls: ['./tjudication-photo.component.scss'],
})
export class TjudicationPhotoComponent implements OnInit {
  constructor(
    private _message: MessageService,
    private _finger: FingerService,
    private _file: FileSystemService,
    private _transferService: TransferService,
    private _localstorage: LocalstorageService,
  ) { }
  ngOnInit() {
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
    let trades_view = this._localstorage.get('business_tjudication_doing_trade_view_form') as BusinessTradeViewForm;
    trades_view.buyer.reviewPhotos = this._file.filterPhotosValue({
      '33': [this.avatarPhotosToSubmit], // 买家头像
      '34': [this.fingerImgPhotosToSubmit], // 买家指纹
    });
    this._transferService.review(trades_view).then(res => {
      console.info(res);
      this._message.success('操作成功！', '有' + trades_view.tradeIds.length + '个车辆审核通过。');
    }).catch(err => {
      console.info(err.message);
      this._message.error('操作失败!', err.message);
    });
  }
}
