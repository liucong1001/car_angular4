import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {IdcardService} from '../../../../@core/device/idcard.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {DeviceService} from '../../../../@core/device/device.service';
import {IdcardModel} from '../../../../@core/model/bussiness/idcard.model';

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
  providers: [DeviceService, IdcardService],
})
export class Recording2Component implements OnInit {
  cheshang = '上页选定的车商';
  photos: any[] = [{
    title: '身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '身份证反面',
    source: 'assets/images/camera2.jpg',
  }];
  public sellerIdcardData = new IdcardModel;
  public trusterIdcardData = new IdcardModel;
  constructor(private _router: Router, private idcard: IdcardService, private message: MessageService) { }

  ngOnInit() {
  }
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording3');
  }

  /**
   * 读取卖方身份证信息
   * @param {string} who 谁的身份证
   */
  readSellerIdCard() {
    this.message.info('身份证', '读取卖方身份证');
    const self = this;
    this.idcard.prepare().then((res)=>{
      console.log(res);
      if(res){ // 初始化读卡器正常
        self.idcard.read().then((idcardData) => this.sellerIdcardData = idcardData as IdcardModel);
      }
    });
  }
  /**
   * 读取卖方身份证信息
   * @param {string} who 谁的身份证
   */
  readTrusterIdCard() {
    this.message.info('身份证', '读取委托人身份证');
    const self = this;
    this.idcard.prepare().then((res)=>{
      console.log(res);
      if(res){ // 初始化读卡器正常
        self.idcard.read().then((idcardData) => this.trusterIdcardData = idcardData as IdcardModel);
      }
    });
  }
}
