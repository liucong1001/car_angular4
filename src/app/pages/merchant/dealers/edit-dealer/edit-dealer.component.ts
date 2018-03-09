import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Location} from '@angular/common';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MerchantService} from '../../../../@core/data/merchant/merchant.service';
import {MerchantForm} from '../../../../@core/model/business/merchant.form';
import {Http} from '@angular/http';
import {MerchantModel} from '../../../../@core/model/business/merchant.model';
import {Router, ActivatedRoute} from '@angular/router';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';
import {UserService} from '../../../../@core/data/users.service';


/**
 * 添加商户
 */
@Component({
  selector: 'ngx-add-dealer',
  templateUrl: './edit-dealer.component.html',
  styleUrls: ['./edit-dealer.component.scss'],
})
export class EditDealerComponent implements OnInit {
  /**
   * 构造函数
   * @param {MessageService} message
   * @param {Location} location
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private message: MessageService,
    private location: Location,
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.merchantService.get(p.id).then( res => {
          const _merchant = res.merchant as MerchantModel;
          this.pid = _merchant.id;
          this._formGroup.patchValue(_merchant);
          // console.info(_merchant.disableSign);
          if ('1' === _merchant.disableSign) {
            this.DisableSignLabel = '禁用';
            this.DisableSignValue = true;
          } else {
            this.DisableSignLabel = '启用';
            this.DisableSignValue = false;
          }
        });
      }
    });
  }
  pid = '';
  DisableSignLabel = '';
  DisableSignValue: boolean;
  photos: any[] = [{
    title: '机构证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '机构证反面',
    source: 'assets/images/camera2.jpg',
  }];
  // _photosForm: FormGroup = this.fb.group({
  //   title: '机构证正面',
  //   source: 'assets/images/camera1.jpg',
  // }, {
  //   title: '机构证反面',
  //   source: 'assets/images/camera2.jpg',
  // });
  // saved = false;
  _formGroup: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(64)]],
    code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,8}$/)]],
    certCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$|^[A-Z0-9]{18}$/)]],
    address: ['', [Validators.maxLength(50)]],
    phone: ['', [Validators.required, Validators.pattern(/^1(3|4|7|5|8)([0-9]{9})|0[0-9]{2,3}-[0-9]{8}$/)]],
    endDate: ['', [Validators.required]],
    discount: ['', [Validators.maxLength(50)]],
    isCarRental: ['', [Validators.required]],
    isDeal: ['', [Validators.required]],
    isPersonal: ['', [Validators.required]],
  });
  errors = {
    name: [
      new ErrorMessage('required', '必须填写商户名！'),
      new ErrorMessage('maxLength', '商户名太长了！'),
    ],
    code: [
      new ErrorMessage('required', '必须填写商户编号！'),
      new ErrorMessage('pattern', '商户编号格式不正确！'),
    ],
    certCode: [
      new ErrorMessage('required', '必须填写证件号！'),
      new ErrorMessage('pattern', '证件号格式错误！'),
    ],
    address: [
      new ErrorMessage('maxLength', '地址过长！'),
    ],
    phone: [
      new ErrorMessage('required', '必须填写联系方式！'),
      new ErrorMessage('pattern', '联系方式填写错误！'),
    ],
    endDate: [
      new ErrorMessage('required', '必须有证件有效期！'),
      new ErrorMessage('pattern', '证件有效期格式错误！'),
    ],
    discount: [
      new ErrorMessage('maxLength', '交易折扣长度不对！'),
    ],
    isCarRental: [
      new ErrorMessage('required', '必须知道是否租车位'),
    ],
    isDeal: [
      new ErrorMessage('required', '必须知道是否能交易！'),
    ],
    isPersonal: [
      new ErrorMessage('required', '必须知道是否是个人！'),
    ],
  };
  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    // this.message.info(photo.title + ' 的新图片地址', $event);
  }
  goBack() {
    this.location.back();
  }
  changeDisableSign(btn) {
    if (this.DisableSignValue) {
      this.merchantService.stop(this.pid).then(() => {
        this.DisableSignValue = false;
        this.DisableSignLabel = '启用';
        this.message.success('操作成功', '禁用商户成功');
      }).catch((err) => {
        console.info(err);
        this.message.error('操作失败', '禁用商户失败');
      });
    } else {
      this.merchantService.start(this.pid).then(() => {
        this.DisableSignValue = true;
        this.DisableSignLabel = '禁用';
        this.message.success('操作成功', '启用商户成功');
      }).catch(err => {
        console.info(err);
        this.message.error('操作失败', '启用商户失败');
      });
    }
  }

  /**
   * 需要构建出一个支持 赋值和读取的 photos form
   * 能够 this._photosForm.values 拿到值，方便的构建成如下数据结构
   * eg: photos:{'身份证正面':['1.jpg','2.jpg']}
   * 更新时，从后台拿到数据值能直接赋值上去组件能够正常显示图片
   * @type {FormGroup}
   * @private
   */
  _photosForm: FormGroup = this.fb.group({
    photos: this.fb.array([]),
  });
  photoType = '身份证';
  photosValue: FormArray;
  addPhotos(): void {
    this._photosForm.addControl(this.photoType, this.fb.array([]));
    // .addControl(this.photoType, this.fb.array([]));
    // let photosValue = this._photosForm.get('photos') as FormArray;
    // photosValue.push(this.createPhotos('机构证正面', 'assets/images/camera1.jpg'));
    // photosValue.push(this.createPhotos());
    // console.info(this._photosForm.value.photos);
  }
  addPhoto(): void {
    // this._photosForm.addControl(this.photoType, this.fb.array([]));
    // let photos = this._photosForm.get('photos') as FormArray;

    // console.info(this._photosForm.get('photos'));
    // let photosValue = this._photosForm.get('photos') as FormArray;
    // let a = '身份证';
    // let photos = photosValue.at(0).get(a) as FormArray;
    // photos.push(this.fb.control('ccc'));
    // let photoValue = this._photosForm.get('photos')[0].get('身份证').push(this.fb.control('cc'));
    let photos = this._photosForm.get('photos') as FormArray;
    photos.push(this.fb.control('aa'));
    let photo = photos.at(0).get(this.photoType) as FormArray;
    photo.push(this.fb.control('aa'));
    // this._photosForm.get(this.photoType)[0].push(this.fb.control('bb'));
    // photoValue.push(this.fb.control('cc'));
    // photosValue.push(this.createPhotos());
    // console.info(this._photosForm.value.photos);
  }
  viewPhotos(): void {
    console.info(this._photosForm.value);
    // console.info(this._photosForm.value.photos);
  }
  save() {
    if (this._formGroup.invalid) {
      this.message.error('填写错误', JSON.stringify(this._formGroup.errors));
      return false;
    } else {
      let merchant = this._formGroup.value as MerchantModel;
      merchant.cloudUser = this.userService.getCurrentLoginUser().cloudUser;
      this.merchantService.update({ merchant: merchant, photos: this.photos} as MerchantForm).then(res => {
        this.message.success('修改成功', '修改商户成功');
        // this.saved = true;
      }).catch(err => {
        this.message.error('操作失败', err.json().message);
      });
    }
  }
}
