import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {IdcardService} from '../../../../@core/device/idcard.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {DeviceService} from '../../../../@core/device/device.service';

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
  constructor(private _router: Router, private idcard: IdcardService, private message: MessageService) { }

  ngOnInit() {
  }
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording3');
  }

  /**
   * 读取身份证信息
   * @param {string} who 谁的身份证
   */
  readIdCard(who: string) {
    this.message.info('身份证', '读取' + who + '身份证');
    // this.idcard
    switch (who) {
      case 'seller':
        break;
      case 'truster':
        break;
    }
  }
}
