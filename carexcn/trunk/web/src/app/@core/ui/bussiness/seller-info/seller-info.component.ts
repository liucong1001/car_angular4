import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MerchantModel} from '../../../model/bussiness/merchant.model';
import {Codeitem} from '../../../model/system/codeitem';
import {ControlContainer, FormArray, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {IdcardService} from '../../../device/idcard.service';
import {MessageService} from '../../../utils/message.service';
import {CodeitemService} from '../../../data/system/codeitem.service';
import {ErrorMessage} from '../../valid-error/valid-error.component';
import {Marketphotomap} from '../../../model/system/market-photo-map';
import {MarketService} from '../../../data/system/market.service';
import {FileSystemService} from '../../../data/system/file-system.service';

@Component({
  selector: 'ngx-ys-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
})
export class SellerInfoComponent implements OnInit {
  /**
   * 拍照上传按钮是否显示
   * @type {boolean}
   */
  @Input() btn_show = true;
  /**
   * 当前商户实例
   */
  @Input() merchant: MerchantModel;
  /**
   * 证件类型清单
   */
  @Input() certType?: Codeitem[];
  /**
   * 卖家表单
   */
  @Input() seller: FormGroup;
  /**
   * 错误实例
   * @type {{}}
   */
  @Input() errors?: object = {
    certType: [
      new ErrorMessage('required', '必须填写证件类型！'),
    ],
    certCode: [
      new ErrorMessage('required', '必须填写证件号码！'),
    ],
    name: [
      new ErrorMessage('required', '必须填写姓名！'),
      new ErrorMessage('maxLength', '姓名太长了！'),
    ],
    endDate: [
      new ErrorMessage('required', '必须填写有效期！'),
    ],
    phone: [
      new ErrorMessage('required', '必须填写手机！'),
    ],
    trusteeType: [
      new ErrorMessage('required', '必须填写是否委托！'),
    ],
    address: [
      new ErrorMessage('required', '必须填写地址！'),
    ],
  };
  @Input() showCheshang = true;
  public autoinput_cheshang_source_url = '/rest/merchant/filing/deal/';

  /**
   * 图片清单
   * @type {{title: string; source: string}[]}
   */
  photos: any[] = [{
    title: '身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '身份证反面',
    source: 'assets/images/camera2.jpg',
  }];

  /**
   * 当前选择的车商
   * @type {string}
   */
  cheshang = '';

  /**
   * 构造函数
   * @param {IdcardService} idcard
   * @param {MessageService} message
   */
  constructor(
    private idcard: IdcardService,
    private message: MessageService,
    private fb: FormBuilder,
    private _codeitem: CodeitemService,
    private _market: MarketService,
    private _file: FileSystemService,
  ) {
  }

  /**
   * 是否委托变更事件
   */
  trusteeTypeChange() {
    // 默认不用填写委托人
    // 一旦勾选有委托人，则必须填写委托人
    if ( this.seller.get('trusteeType').value === '1' ) {
      this.seller.controls.Trustee.enable();
    } else {
      this.seller.controls.Trustee.disable();
    }
  }

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    // 默认不用填写委托人
    this.seller.controls.Trustee.disable();
    this.autoinput_cheshang_source_url += this.merchant.id + '/';
    if (! this.certType) {
      this._codeitem.list('certType').then(res => this.certType = res as Codeitem[]);
    }
    this.setCertificateConfig(this.seller.value.certType);
  }
  /**
   * 需要构建出一个支持 赋值和读取的 photos form
   * 能够 this._photosForm.values 拿到值，方便的构建成如下数据结构
   * eg: photos:{'身份证正面':['1.jpg','2.jpg']}
   * 更新时，从后台拿到数据值能直接赋值上去组件能够正常显示图片
   * @type {FormGroup}
   * @private
   */
  photoType = '身份证';
  addPhotoType() {
    // (this.seller.get('_photos_') as FormArray).addControl(this.photoType, this.fb.array([]));
  }
  addPhoto() {
    let photos = this.seller.get('_photos_') as FormArray;
    // photos.push(this.fb.control());
    // photos.push(this.fb.control('aa'));
    // (this.seller.get('photos') as FormArray).push(this.fb.control('aaa'));
    // let photo = this.seller.get(this.photoType) as FormArray;
    // photo.push(this.fb.control('bb'));
    // (this.seller.get(this.photoType) as FormArray).push(this.fb.control('bbb'));
  }
  viewPhotos(): void {
    // console.info('图片表单', this.seller.controls._photos_);
    // console.info('图片表单值', this.seller.value._photos_);
  }
  setCertificateConfig(certType) {
    this._market.getCertificateConfig({
      isApp: '0',
      certificateCode: certType, // 证件类型代码集
      business: '01', //  01 预审  02 过户
      formName: '预审录入卖家', // 表单名称
    } as Marketphotomap).then(res => this.initPhotoMap(res.json() as [Marketphotomap]));
  }
  /**
   * 初始化动态图片表单
   * @param {[Marketphotomap]} marketphotomap_arr
   */
  public photos_name = {};
  initPhotoMap(marketphotomap_arr: [Marketphotomap]) {
    let sellerPhotos = this.seller.get('_photos_') as FormGroup;
    if (sellerPhotos) {
      this.seller.removeControl('_photos_');
    }
    this.seller.addControl('_photos_', this.fb.group({}));
    sellerPhotos = this.seller.get('_photos_') as FormGroup;
    /**
     * 需要处理的事情：
     * 拿到 sort，name，min，max，photoType
     * 需要处理的最终数据为：
     * photos:{photoType:['1.jpg','2.jpg','3.jpg']}
     */
    let photo_name_tmp = {};
    marketphotomap_arr.forEach(r => {
      // console.info(
      //   'name:' + r.name + ' photoType:' + r.photoType + ' max:' + r.max + ' min:' + r.min +
      //   ' sort:' + r.sort);
      photo_name_tmp[r.photoType] = r.name;
      let i = 0;
      while ( i < r.min) {
        sellerPhotos.addControl(r.photoType, this.fb.array([
          {
            // label: r.name + (i > 1 ? ' ' + i : ''),
            value: 'id:' + (r.fileDescription ? r.fileDescription.id : ''),
            disabled: false,
          }, // [Validators.required, Validators.maxLength(64)],
        ]));
        i++;
      }
      // /**
      //  * 多张情况
      //  */
      // if ( r.max > r.min) {
      //   let i = r.min;
      //   while ( i < r.max) {
      //     console.info('i--------', i);
      //     // sellerPhotos.addControl(r.photoType + ' ' + i, this.fb.array(['id:' + (r.fileDescription ? r.fileDescription.id : '')]));
      //     sellerPhotos.addControl(r.photoType, this.fb.array([
      //       {
      //         label: r.name + ' ' + i,
      //         value: 'id:' + (r.fileDescription ? r.fileDescription.id : ''),
      //         disabled: false,
      //       }, // [Validators.required, Validators.maxLength(64)],
      //     ]));
      //     i++;
      //   }
      //   /**
      //    * 单张情况
      //    */
      // } else if ( r.max === r.min) {
      //   // sellerPhotos.addControl(r.photoType, this.fb.array(['id:' + (r.fileDescription ? r.fileDescription.id : '')]));
      //   sellerPhotos.addControl(r.photoType, this.fb.array([
      //     {
      //       label: r.name,
      //       value: 'id:' + (r.fileDescription ? r.fileDescription.id : ''),
      //       disabled: false,
      //     }, // [Validators.required, Validators.maxLength(64)],
      //   ]));
      //   /**
      //    * 异常情况
      //    */
      // } else {
      //   console.error('error: max < min.');
      // }
      // sellerPhotos.push(photoType);
      // sellerPhotos.push(this.fb.control(r.photoType, this.fb.array([])));
      // sellerPhotos.at(0).
    });
    this.photos_name = photo_name_tmp;
  }

  /**
   * 证件类型选择事件以切换要操作的图片清单
   * @param event
   */
  certTypeSelecteFunc(certSelectValue) {
    this.setCertificateConfig(certSelectValue);
  }

  /**
   * 证件类型匹配函数
   * @param {Codeitem} code1
   * @param {Codeitem} code2
   * @returns {boolean | boolean}
   */
  certificateTypeCompareWithFunc(code1: Codeitem, code2: Codeitem) {
    return (code1 && code2) ? code1.code === code2.code : false;
  }

  /**
   * 选择车商事件
   * 将选中的车商数据复制到卖家表单中
   * @param value
   */
  getSelectedCheshang(value) {
    value.certCode = value.filingPerson.certCode;
    console.info(value);
    this.seller.patchValue(value);
  }

  /**
   * 显示照片详情
   */
  showPhotoDetail() {
    console.info('a');
  }
  /**
   * 读取IC卡并将读取的信息赋值到卖家表单中
   */
  readIdCard() {
    // this.message.info('身份证', '读取卖方身份证');
    this.idcard.prepare().then((res) => {
      // this.message.info('身份证', '初始化完毕');
      if (res) { // 初始化读卡器正常
        this.idcard.read().then((idcardData) => {
          this.message.success('身份证', '读取成功');
          console.info(idcardData);
          this.seller.patchValue({
            address: idcardData.Address,
            // birthday: idcardData.Birthday,
            certCode: idcardData.IdCardNo,
            name: idcardData.Name,
            // sex: idcardData.Sex,
            endDate: idcardData.UseEnd,
          });
        });
      }
    }).catch(e => {
      this.message.error('身份证', '读取身份证失败');
    });
  }
}
