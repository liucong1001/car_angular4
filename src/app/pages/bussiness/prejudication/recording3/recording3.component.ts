import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
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
    brandModel: ['1', [Validators.required]], // 厂牌型号实体Id
    labelCode: ['宝马WBA1A110', [Validators.required]],
    vehicleType: ['小型轿车', [Validators.required]],
    plateNumber: ['', [Validators.required]],
    frameNumber: ['LVGBE40K28G244297', [Validators.required]],
    engineNumber: ['C466626', [Validators.required]],
    registration: ['1', [Validators.required]],
    registrationDate: ['20080924', [Validators.required]],
    useCharacter: ['非营运', [Validators.required]],
    useNature: ['私用', [Validators.required]],
    displacement: ['1', [Validators.required]],
    range: ['1', [Validators.required]],
    size: ['小', [Validators.required]],
    mileage: ['1000', [Validators.required]],
    otherConditions: ['1', [Validators.required]],
    origin: ['武汉', [Validators.required]],
    fee: ['284', [Validators.required]],
    review: ['1', [Validators.required]],
    invalid: ['1', [Validators.required]],
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
    engineNumber: [
      new ErrorMessage('required', '必须填写发动机号！'),
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
  ) {
    /**
     * 缓存前缀名以业务为单位，一个缓存前缀对应一个业务，一个缓存业务完成则删除该前缀的所有缓存
     * @type {string}
     */
    this._localstorage.prefix = 'bussiness_prejudication_recording';
  }

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    console.info('exec on init.');
    // const formPatchValue = {
    //
    // };
    let maybe_vehicle = this._localstorage.get('vehicle');
    if (maybe_vehicle) {
      this._formGroup.patchValue(maybe_vehicle);
      let maybe_seller_form = this._localstorage.get('seller_form');
      if (maybe_seller_form) {
        this._formGroup.patchValue({});
      }
    }
  }
  /**
   * 页面销毁前
   */
  ngOnDestroy() {
    console.info('exec on destroy.');
    this._localstorage.set('vehicle', this._formGroup.value);
  }

  onSubmit() {
    // this.getFormValidationErrors(this._formGroup);
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording4');
  }

  /**
   * 检查并输出表单组包含的错误
   * @param {FormGroup} _formGroup
   */
  getFormValidationErrors(_formGroup: FormGroup) {
    Object.keys(_formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = _formGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.info('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}
