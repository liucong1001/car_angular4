import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

/**
 * 预审录入3--接口与页面的交互逻辑
 * 1、读取用户上传的 行驶证正本，行驶证副本，登记证书首页，登记证书末页 等证件照
 * 2、通过云接口识别用户行驶证中的信息并填充进表单
 * 3、允许用户修改表单，并接收并保存表单中的最终数据
 * 4、
 */
@Component({
  selector: 'ngx-recording3',
  templateUrl: './recording3.component.html',
  styleUrls: ['./recording3.component.scss'],
})
export class Recording3Component implements OnInit, OnDestroy {
  photos: any[] = [{
    title: '行驶证正本',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '行驶证副本',
    source: 'assets/images/camera2.jpg',
  }, {
    title: '登记证书首页',
    source: 'assets/images/camera3.jpg',
  }, {
    title: '登记证书末页',
    source: 'assets/images/camera4.jpg',
  }];
  constructor(private _router: Router) { }

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    console.info('exec on init.');
  }
  /**
   * 页面销毁前
   */
  ngOnDestroy() {
    console.info('exec on destroy.');
  }

  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording4');
  }
}
