import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {FingerService} from '../../../../@core/device/finger.service';

@Component({
  selector: 'ngx-tjudication-photo',
  templateUrl: './tjudication-photo.component.html',
  styleUrls: ['./tjudication-photo.component.scss'],
})
export class TjudicationPhotoComponent implements OnInit {
  public fingerImgUrl = '/assets/images/camera1.jpg';
  public fingerBase64 = '';
  constructor(
    private message: MessageService,
    private location: Location,
    private router: Router,
    private finger: FingerService,
  ) { }
  /**
   * 指纹读取
   */
  fingerRead() {
    this.message.info('指纹读取', '读取指纹');
    this.finger.read().then((data) => {
      const response = JSON.parse(data.File);
      // console.log(response.file[0]);
      this.fingerImgUrl = response.file[0];
      this.fingerBase64 = data.Base64;
    }).catch((error) => {
      // console.log(error);
    });
  }

  /**
   * 指纹验证
   */
  fingerVerify() {
    this.message.info('指纹验证', '验证指纹');
    this.finger.verify(this.fingerBase64).then((verify) => {
      // console.log(verify);
    });
  }
  ngOnInit() {
  }
  photos: any[] = [{
    title: '',
    source: 'assets/images/camera1.jpg',
  }];
  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
  }
  goBack() {
    this.location.back();
  }
  onSubmit() {
    this.router.navigateByUrl('http://localhost/pages/bussiness/transfer/tjudication-finger');
  }
}
