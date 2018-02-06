import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Marketphotomap} from '../../../model/system/market-photo-map';
import {MarketService} from '../../../data/system/market.service';

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
  @Input() certType: string;
  @Input() btn_show = true;
  @Input() btn_show_check = false;
  /**
   * 勾选照片的集合(一般用于审核打回操作)
   * @type {EventEmitter<any>}
   * @private
   */
  @Output() _wrong_checked = new EventEmitter();
  private wrong_checked: Array<ChangeCheckedValueModel> = [];
  private photos_name: Object;
  private _certType: string;
  protected objectKeys = Object.keys;
  constructor(
    private _market: MarketService,
    private fb: FormBuilder,
  ) { }
  ngOnInit() {
    this.setCertificateConfig(this._certType);
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
    console.info(v);
  }

  /**
   * 获取打叉的要打回的图片集合
   */
  getPhotoChecked() {
    console.info(this.wrong_checked);
  }

  ngOnChanges() {
    if (this._certType === undefined) {
      this._certType = this.certType;
    }
    if (this._certType !== this.certType ) {
      this._certType = this.certType;
      this.setCertificateConfig(this._certType);
    }
    // if (this.photos) {
    //   Object.keys(this.photos.controls).forEach(key1 => {
    //     let keys = [];
    //     Object.keys((this.photos.get(key1) as FormArray).controls).forEach( key2 => {
    //       console.info(key1 + '--' + key2 + ' value:' + JSON.stringify(this.photos.get(key1).get(key2).value));
    //       console.info(this.photos.get(key1).get(key2));
    //       // let key_child = {key2: this.photos.get(key1).get(key2)};
    //       keys.push(key2);
    //     });
    //     this.photos_keys.push(key1);
    //   });
    //   console.info(this.photos_keys);
    // } else {
    //   this.photos_keys = [];
    // }
  }
  getPhotoFormControls(photoType: string): Array<AbstractControl> {
    return (this.photos.get(photoType) as FormArray).controls;
  }
  setCertificateConfig(certType) {
    this._market.getCertificateConfig({
      isApp: '0',
      certificateCode: certType, // 证件类型代码集
      business: '01', //  01 预审  02 过户
      formName: '预审录入卖家', // 表单名称
    } as Marketphotomap).then(res => this.initPhotoMap(res.json() as [Marketphotomap]));
  }
  initPhotoMap(marketphotomap_arr: [Marketphotomap]) {
    /**
     * 需要处理的事情：
     * 拿到 sort，name，min，max，photoType
     * 需要处理的最终数据为：
     * photos:{photoType:['1.jpg','2.jpg','3.jpg']}
     */
    let photo_name_tmp = {};
    let photo_url_tmp = {};
    marketphotomap_arr.forEach(r => {
      photo_name_tmp[r.photoType] = r.name;
      if ( r.photoExample ) {
        photo_url_tmp[r.photoType] = 'id:' + (r.photoExample ? r.photoExample.fileId : '');
        let i = 0;
        while (i < r.min) {
          this.photos.addControl(r.photoType, new FormArray([
            new FormControl({
              value: '', // 'id:' + (r.photoExample ? r.photoExample.fileId : ''),
              disabled: false,
            }, Validators.required),
          ]));
          i++;
        }
      } else {
        throw new Error('表单为“' + r.formName + '”的“' + r.name + '”缺少关联的示例图片，请添加');
      }
    });
    this.photos_name = photo_name_tmp;
    this.photos_url = photo_url_tmp;
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
