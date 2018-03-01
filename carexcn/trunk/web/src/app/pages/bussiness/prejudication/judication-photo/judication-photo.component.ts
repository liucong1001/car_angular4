import { Component, OnInit } from '@angular/core';
import {PrejudicationService} from '../../../../@core/data/bussiness/prejudication.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';

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
    private _prejudicationService: PrejudicationService,
    private _localstorage: LocalstorageService,
  ) { }
  ngOnInit() {
    this._localstorage.get(this._cache_pre + 'judication_trade');
  }
}
