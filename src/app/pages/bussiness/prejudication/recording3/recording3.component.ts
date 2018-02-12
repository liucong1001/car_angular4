import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {Codeitem} from '../../../../@core/model/system/codeitem';
import {CodeitemService} from '../../../../@core/data/system/codeitem.service';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';

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
  /**
   * 缓存服务的前缀
   * 缓存前缀名以业务为单位，一个缓存前缀对应一个业务，一个缓存业务完成则删除该前缀的所有缓存
   * @type {string}
   * @private
   */
  private _cache_pre = 'bussiness_prejudication_recording_';
  certificateFormConfig: Marketphotomap;
  useCharacter: Codeitem[];
  vehicleType: Codeitem[];
  vehicleSize: Codeitem[];
  public _formGroup: FormGroup = this._formBuilder.group({
    // brandModel: ['1', [Validators.maxLength(50)]], // 厂牌型号实体Id
    labelCode: ['宝马WBA1A110', [Validators.required]], // 厂牌型号名称
    vehicleType: ['01', [Validators.required]], // 车辆类型代码
    plateNumber: ['', [Validators.required]], // 车牌号
    frameNumber: ['LVGBE40K28G244297', [Validators.required]], // 车架号
    // engineNumber: ['C466626', [Validators.required]],
    registration: ['1', [Validators.required, Validators.maxLength(12)]], // 登记证书号 行驶证号
    registrationDate: ['20080924', [Validators.required]], // 行驶证注册日期
    useCharacter: ['01', [Validators.required]], // 使用性质代码
    useNature: ['01', [Validators.required]], // 车辆性质
    displacement: ['1', [Validators.required]], // 设置排量
    range: ['01', [Validators.required]], // 排量区间代码
    size: ['01', [Validators.required]], // 车辆大小代码
    mileage: ['1000', [Validators.required]], // 行驶里程
    otherConditions: ['1', [Validators.required]], // 其它状况说明
    origin: ['武汉', [Validators.required]], // 车辆产地
    fee: ['284', [Validators.required]], // 手续费

    // eeee: ['', [Validators.maxLength(50)]],
    /**
     * TODO: 注意 eeee 字段，后台可能暂未准备好接收，但是是业务必须的字段
     * TODO: 注意 eeee 字段的错误信息
     */
  });

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
    private _codeitem: CodeitemService,
  ) {}

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    let maybe_vehicle = this._localstorage.get(this._cache_pre + 'vehicle');
    if (maybe_vehicle) {
      this._formGroup.patchValue(maybe_vehicle);
      let maybe_seller_form = this._localstorage.get(this._cache_pre + 'seller_form');
      if (maybe_seller_form) {
        this._formGroup.patchValue({});
      }
    }
    this._codeitem.list('useCharacter').then(res => this.useCharacter = res as Codeitem[]);
    this._codeitem.list('vehicleType').then(res => this.vehicleType = res as Codeitem[]);
    this._codeitem.list('vehicleSize').then(res => this.vehicleSize = res as Codeitem[]);

    // let maybe_seller_form = this._localstorage.get('seller_form');
    // if (maybe_seller_form) {
    //   this._formGroup.patchValue(maybe_seller_form);
    // }
    /**
     * 卖家证件类型表单配置
     * @type {{}}
     */
    this.certificateFormConfig = {
      isApp: '0',
      // certificateCode: '00', // 证件类型代码集 // 只要符合表单就行
      business: '01', //  01 预审  02 过户
      formName: '预审录入车辆', // 表单名称
    } as Marketphotomap;
  }
  /**
   * 页面销毁前
   */
  ngOnDestroy() {
    console.info('exec on destroy.');
    this._localstorage.set(this._cache_pre + 'vehicle', this._formGroup.value);
    this._localstorage.set(this._cache_pre + 'vehicle_photos', this._formGroup.get('_photos_').value);
    this._localstorage.set('cardetail__dynamic_photos', this._cache_pre + 'vehicle_photos');
  }

  onSubmit() {
    // this.getFormValidationErrors(this._formGroup);
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording4');
  }
}
