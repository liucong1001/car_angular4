import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

/**
 * 预审录入4--接口与页面的交互逻辑
 * 1、显示所有录入的数据让用户确认是否有误
 * 2、本页数据不允许修改，要修改请返回上一页
 * 3、用户点击“确认提交”时则立即提交给后台接口并提示正在提交
 * 4、当收到后台接口返回的数据时则跳转到下一页，并附带后台返回的数据
 * 后台返回的数据应包含：预审流水号，批次号，二维码
 *  .
 * 表单传递显示，表单禁用，表单字段全体禁用或者只读
 */
@Component({
  selector: 'ngx-recording4',
  templateUrl: './recording4.component.html',
  styleUrls: ['./recording4.component.scss'],
})
export class Recording4Component implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording-last');
  }
}
