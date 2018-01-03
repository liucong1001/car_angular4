import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CarModel} from '../../../../@core/model/bussiness/car.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';
import {CarService} from "../../../../@core/data/bussiness/car.service";
import {MessageService} from "../../../../@core/utils/message.service";

/**
 * 预审录入1--接口与页面的交互逻辑
 * 1、接收用户输入车牌号
 * 2、接收用户输入的商户部分信息以搜索商户
 * 3、接收用户输入的联系人部分信息以搜索联系人(需附带商户信息)
 * 4、将调取到联系人信息填入到表单中以使浏览者确认
 * 5、缓存该联系人的所有信息到下一步
 * 接口需求列表
 * 1、输入商户部分字符串以查询包含该字符串的所有商户
 * 2、输入联系人部分字符串以查询包含该字符串的该商户联系人
 * 3、通过联系人姓名或编号以调取该联系人的详细数据
 */
@Component({
  selector: 'ngx-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss'],
})
export class RecordingComponent implements OnInit {
  /**
   *  搜索确认商户联系人时调取对应信息
   */
  cameras: any[] = [{
    title: '联系人身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '联系人身份证反面',
    source: 'assets/images/camera2.jpg',
  }, {
    title: '代办联系人头像',
    source: 'assets/images/camera3.jpg',
  }, {
    title: '商户联系人确认单',
    source: 'assets/images/camera4.jpg',
  }];
  /**
   * 车辆模型
   * @type {CarModel}
   */
  public car = new CarModel();
  carLsnumPrefixDefault = '鄂A';
  carLsnumIsOk = false;
  /**
   * 商户搜索资源
   * @type {string}
   */
  public autoinput_shanghu_source_url = 'http://localhost/rest/merchant/';
  /**
   * 联系人搜索资源
   * @type {string}
   */
  public autoinput_linkman_source_url = 'https://dongshenghuo.com/test.php?r=stringArr&q=';
  /**
   * 构造函数
   * @param {Router} _router
   * @param {FormBuilder} _formbuilder
   */
  constructor(
    private _router: Router,
    private _formbuilder: FormBuilder,
    private _carService: CarService,
    private _message: MessageService,
  ) { }

  getSelectedDealer(value) {
    this._message.info('获取商户', value.toString());
  }

  ngOnInit() {
  }

  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording2');
  }
  /**
   * 车牌号填写完的事件
   */
  carLsnumBlur(lsnum: string) {
    /**
     * 检查车牌号
     * 是否已经重复录入
     * 是否属于黑名单
     * 是否属于公车拍卖，如果是应该要拿到公车拍卖的车辆信息
     */
    this.carLsnumIsOk = true;
    // this._carService.checkCarLsnum(lsnum).then(res => {
    //   this.carLsnumIsOk = true;
    //   return true;
    // }).catch(err => {
    //   this._message.error('错误', err);
    // });
  }

}
