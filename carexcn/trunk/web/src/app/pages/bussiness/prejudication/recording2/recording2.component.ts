import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IdcardService} from '../../../../@core/device/idcard.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {IdcardModel} from '../../../../@core/model/bussiness/idcard.model';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {SellerModel} from "../../../../@core/model/bussiness/seller.model";

/**
 * 预审录入2--接口与页面的交互逻辑
 * 1、拿到上一页显示的选定的车商并显示出来
 * 2、接收到用户选择是否委托，有委托则显示委托书，否则不显示委托书
 * 3、选择卖方证件类型，则对应的显示出对应的证件类型上传入口
 * 4、读取卖方身份证信息并显示在表单中，不允许修改  [如果选择的是身份证的话]
 * 5、读取委托人的身份证信息并显示在表单中，不允许修改  [如果必要的话]
 */
@Component({
  selector: 'ngx-recording2',
  templateUrl: './recording2.component.html',
  styleUrls: ['./recording2.component.scss'],
})
export class Recording2Component implements OnInit, OnDestroy {
  photos: any[] = [{
    title: '身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '身份证反面',
    source: 'assets/images/camera2.jpg',
  }];
  public sellerIdcardData = new IdcardModel;
  public trusterIdcardData = new IdcardModel;
  public sellerData = new SellerModel;
  merchant: MerchantModel = {name: ''};
  constructor(
    private _router: Router,
    private _idcard: IdcardService,
    private _message: MessageService,
    private _localstorage: LocalstorageService,
  ) {
    this._localstorage.prefix = 'bussiness_prejudication_recording';
  }

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    console.info('exec on init.');
    /**
     * 读取缓存的商户
     * @type {any}
     */
    let maybe_merchant = this._localstorage.get('dealer');
    console.info(maybe_merchant);
    if (maybe_merchant) {
      this.merchant = maybe_merchant;
    }
  }

  /**
   * 页面销毁前
   * @constructor
   */
  ngOnDestroy() {
    console.info('exec on destroy.');
  }

  /**
   * 转到下一页
   */
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording3');
  }

  /**
   * 读取卖方身份证信息
   */
  readSellerIdCard() {
    this._message.info('身份证', '读取卖方身份证');
    this._idcard.prepare().then((res) => {
      if (res) { // 初始化读卡器正常
        this._idcard.read().then((idcardData) => this.sellerIdcardData = idcardData as IdcardModel);
      }
    });
  }

  /**
   * 读取卖方身份证信息
   * @param {string} who 谁的身份证
   */
  readTrusterIdCard() {
    this._message.info('身份证', '读取委托人身份证');
    this._idcard.prepare().then((res) => {
      if (res) { // 初始化读卡器正常
        this._idcard.read().then((idcardData) => this.trusterIdcardData = idcardData as IdcardModel);
      }
    });
  }
}
