import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Marketphotomap} from '../../../model/system/market-photo-map';
import {MarketService} from '../../../data/system/market.service';
import {LocalstorageService} from '../../../cache/localstorage.service';

@Component({
  selector: 'ngx-ys-dynamic-photo-form',
  templateUrl: './dynamic-photo-form.component.html',
  styleUrls: ['./dynamic-photo-form.component.scss'],
})
export class DynamicPhotoFormComponent implements OnInit, OnChanges {
  // 把选择证件类型之后，的动态组件相关操作都移动到动态组件当中去，由动态组件完成该操作
  // 不用传递这么多参数
  /**
   * 图片FormGroup
   * 需要构建出一个支持 赋值和读取的 photos form
   * 能够 this._photosForm.values 拿到值，方便的构建成如下数据结构
   * eg: photos:{'身份证正面':['1.jpg','2.jpg']}
   * 更新时，从后台拿到数据值能直接赋值上去组件能够正常显示图片
   * @type {FormGroup}
   * @private
   */
  @Input() photos: FormGroup;
  /**
   * 证件类型表单获取的配置
   */
  @Input() certificateFormConfig: Marketphotomap;
  @Input() data_localStrong_name = '';
  @Input() btn_show = true;
  @Input() btn_show_check = false;
  /**
   * 勾选照片的集合(一般用于审核打回操作)
   * @type {EventEmitter<any>}
   * @private
   */
  @Output() _wrong_checked = new EventEmitter();
  private wrong_checked: Array<ChangeCheckedValueModel> = [];
  public photos_name: Object;
  public objectKeys = Object.keys;
  constructor(
    private _market: MarketService,
    private fb: FormBuilder,
    private _localstorage: LocalstorageService,
  ) {}
  ngOnInit() {
    this.setCertificateConfig();
  }

  /**
   * 动态图片中是否选中状态的切换
   */
  changeChecked(v: ChangeCheckedValueModel) {
    if (v.status) {
      /**
       * 要添加到屏蔽项
       */
      this.wrong_checked.push(v);
    } else {
      /**
       * 如果在屏蔽项中，要移除出去
       */
      this.wrong_checked = this.wrong_checked.filter(r => r.title !== v.title);
    }
    // console.info(v);
  }

  /**
   * 获取打叉的要打回的图片集合
   */
  getPhotoChecked() {
    console.info(this.wrong_checked);
  }

  ngOnChanges() {
    // this.setCertificateConfig();
  }

  /**
   * 得到图片表单控件列表
   * @param {string} photoType
   * @returns {Array<AbstractControl>}
   */
  getPhotoFormControls(photoType: string): Array<AbstractControl> {
    let controls = (this.photos.get(photoType) as FormArray).controls;
    // TODO: 只有两个图片的页面中，执行了很多次，要想办法查出原因，优化性能
    // console.info('controls:', controls.length, controls);
    return controls;
  }

  /**
   * 配置证件类型
   */
  setCertificateConfig() {
    console.info('this.certificateFormConfig', this.certificateFormConfig);
    this._market.getCertificateConfig(this.certificateFormConfig)
      .then(res => this.initPhotoMap(res as [Marketphotomap]));
  }

  /**
   * 处理动态图片表单初始化
   * @param {[Marketphotomap]} marketphotomap_arr
   */
  initPhotoMap(marketphotomap_arr: [Marketphotomap]) {
    /**
     * 需要处理的事情：
     * 拿到 sort，name，min，max，photoType
     * 需要处理的最终数据为：
     * photos:{photoType:['1.jpg','2.jpg','3.jpg']}
     */
    let photo_name_tmp = {};
    let photo_url_tmp = {};
    /**
     * 根据缓存的名字拿到缓存的数据，在初始化的过程中，完成对表单的默认赋值
     * 注意判断名字是否为空和名字拿到的缓存名是否为空
     * 缓存名的缓存本来也该判断是否为空，但是循环中就可以判断了
     */
    let marketphotomap_cache = null;
    /**
     * 如果有设定缓存名
     * 就从缓存名对应的缓存取数据
     */
    if (this.data_localStrong_name) {
      let cache_name = this._localstorage.get(this.data_localStrong_name);
      if (null !== cache_name) {
        marketphotomap_cache = this._localstorage.get(cache_name);
        // console.info('读取动态表单的对应缓存数据' + cache_name, marketphotomap_cache);
      } else {
        // console.info('读取动态表单的对应缓存数据cache_name  空');
      }
    }
    // console.info('marketphotomap_arr', marketphotomap_arr);
    // 在循环开始之前的该处，要拿到缓存的数据，循环时使用
    marketphotomap_arr.forEach(r => {
      photo_name_tmp[r.photoType] = r.name;
      if ( r.photoExample ) {
        /**
         * 示例图片的值，暂存在此处，不能作为直接的值存储和使用，只能作为拍照上传控件的备用图片使用
         * @type {string}
         */
        photo_url_tmp[r.photoType] = 'id:' + (r.photoExample ? r.photoExample.fileId : '');
        let i = 0;
        while (i < r.min) {
          /**
           * 在初始化的过程中，根据循环的photoType判断是否有缓存好的值，来完成对表单的默认赋值
           */
          // console.info('marketphotomap_cache[' + r.photoType + ']', marketphotomap_cache);
          let photo_value = '';
          if (null !== marketphotomap_cache && marketphotomap_cache[r.photoType]) {
            photo_value = marketphotomap_cache[r.photoType][i] ? marketphotomap_cache[r.photoType][i] : '';
            // console.info('照片的最终值', photo_value);
          } else {
            // console.info('读取动态表单的对应缓存数据marketphotomap_cache  空');
          }
          this.photos.addControl(r.photoType, new FormArray([
            new FormControl({
              value: photo_value,
              disabled: false,
            }, Validators.required),
          ]));
          i++;
        }
      } else {
        // console.info('r.photoExample', r);
        throw new Error('表单为“' + r.formName + '”的“' + r.name + '”缺少关联的示例图片，请添加');
      }
    });
    this.photos_name = photo_name_tmp;
    console.info('dynamic photos_name', this.photos_name);
    this.photos_url = photo_url_tmp;
    console.info('dynamic photos_url', this.photos_url);
  }

  /**
   * 初始化动态图片表单
   * @param {[Marketphotomap]} marketphotomap_arr
   */
  // public photos_name = {}; // 动态图片表单要用的照片名称
  public photos_url = {}; // 图片局部放大指令要用的示例图片地址
  getPhotoValue(photoType: string, photo: string): any {
    return this.photos.get(photoType).get(photo).value;
  }
  getPhotoControl(photoType: string, photo: string): FormControl {
    return this.photos.get(photoType).get(photo) as FormControl;
  }
  getPhotoType(photoType: string): FormArray {
    return this.photos.get(photoType) as FormArray;
  }
}

export class ChangeCheckedValueModel {
  status: boolean;
  title: string;
  source: string;
}
