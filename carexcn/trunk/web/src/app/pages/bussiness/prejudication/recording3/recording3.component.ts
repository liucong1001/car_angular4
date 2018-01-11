import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';

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
  public _formGroup: FormGroup = this._formBuilder.group({
    brandModel: ['', [Validators.required]], // 厂牌型号实体Id
    labelCode: ['', [Validators.required]],
    vehicleType: ['', [Validators.required]],
    plateNumber: ['', [Validators.required]],
    frameNumber: ['', [Validators.required]],
    registration: ['', [Validators.required]],
    registrationDate: ['', [Validators.required]],
    useCharacter: ['', [Validators.required]],
    useNature: ['', [Validators.required]],
    displacement: ['', [Validators.required]],
    range: ['', [Validators.required]],
    size: ['', [Validators.required]],
    mileage: ['', [Validators.required]],
    otherConditions: ['', [Validators.required]],
    origin: ['', [Validators.required]],
    fee: ['', [Validators.required]],
    review: ['', [Validators.required]],
    invalid: ['', [Validators.required]],
    eeee: ['', [Validators.maxLength(50)]],
    /**
     * TODO: 注意 eeee 字段，后台可能暂未准备好接收，但是是业务必须的字段
     * TODO: 注意 eeee 字段的错误信息
     */
  });
  errors = {
    brandModel: [
      new ErrorMessage('required', '必须填写厂牌型号！'),
    ],
    labelCode: [
      new ErrorMessage('required', '必须填写厂牌型号！'),
    ],
    vehicleType: [
      new ErrorMessage('required', '必须填写车辆类型！'),
    ],
    plateNumber: [
      new ErrorMessage('required', '必须填写车牌号！'),
    ],
    frameNumber: [
      new ErrorMessage('required', '必须填写车架号！'),
    ],
    registration: [
      new ErrorMessage('required', '必须填写登记证书号！'),
    ],
    useCharacter: [
      new ErrorMessage('required', '必须填写使用性质！'),
    ],
    useNature: [
      new ErrorMessage('required', '必须填写车辆性质！'),
    ],
    displacement: [
      new ErrorMessage('required', '必须填写排量！'),
    ],
    range: [
      new ErrorMessage('required', '必须填写排量区间！'),
    ],
    size: [
      new ErrorMessage('required', '必须填写车辆大小！'),
    ],
    mileage: [
      new ErrorMessage('required', '必须填写行驶里程！'),
    ],
    otherConditions: [
      new ErrorMessage('required', '必须填写其他状况！'),
    ],
    origin: [
      new ErrorMessage('required', '必须填写车辆产地！'),
    ],
    fee: [
      new ErrorMessage('required', '必须填写业务手续费！'),
    ],
    review: [
      new ErrorMessage('required', '必须填写审核状态！'),
    ],
    invalid: [
      new ErrorMessage('required', '必须填写业务状态！'),
    ],
    eeee: [
      new ErrorMessage('required', '必须填写业务状态！'),
      new ErrorMessage('maxLength', '太长了！'),
    ],
  };

  /**
   * 构造函数
   * @param {Router} _router
   * @param {FormBuilder} _formBuilder
   * @param {LocalstorageService} _localstorage
   */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _localstorage: LocalstorageService,
  ) { }

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
