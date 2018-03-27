import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Location} from '@angular/common';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MerchantService} from '../../../../@core/data/merchant/merchant.service';
import {MerchantForm} from '../../../../@core/model/business/merchant.form';
import {MerchantModel} from '../../../../@core/model/business/merchant.model';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../@core/data/users.service';
import {MerchantFormGroup} from '../merchant.form-group';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {FileSystemService} from '../../../../@core/data/system/file-system.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';

/**
 * 添加商户
 */
@Component({
  selector: 'ngx-add-dealer',
  templateUrl: './edit-dealer.component.html',
  styleUrls: ['./edit-dealer.component.scss'],
})
export class EditDealerComponent implements OnInit {
  photos_cache_name = 'merchant_dealers_edit_dealer';
  /**
   * 构造函数
   * @param {MessageService} message
   * @param {Location} location
   */
  constructor(
    private _route: ActivatedRoute,
    private _message: MessageService,
    private _location: Location,
    private _localstorage: LocalstorageService,
    private _formBuilder: FormBuilder,
    private _merchantFormGroup: MerchantFormGroup,
    private _merchantService: MerchantService,
    private _file: FileSystemService,
    private _userService: UserService,
  ) { }
  ngOnInit() {
    this._route.params.subscribe(p => {
      if (p.id) {
        this._merchantService.get(p.id).then( res => {
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
          this._localstorage.set(this.photos_cache_name, res.photos);
        });
      }
    });
  }
  pid = '';
  DisableSignLabel = '';
  DisableSignValue: boolean;
  _formGroup: FormGroup = this._merchantFormGroup.merchant;
  errors = this._merchantFormGroup.merchant_error;
  goBack() {
    this._location.back();
  }
  changeDisableSign(btn) {
    if (this.DisableSignValue) {
      this._merchantService.stop(this.pid).then(() => {
        this.DisableSignValue = false;
        this.DisableSignLabel = '启用';
        this._message.success('操作成功', '禁用商户成功');
      }).catch((err) => {
        console.info(err);
        this._message.error('操作失败', '禁用商户失败');
      });
    } else {
      this._merchantService.start(this.pid).then(() => {
        this.DisableSignValue = true;
        this.DisableSignLabel = '禁用';
        this._message.success('操作成功', '启用商户成功');
      }).catch(err => {
        console.info(err);
        this._message.error('操作失败', '启用商户失败');
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
  _formPhotos: FormGroup = this._merchantFormGroup.photos;
  merchantCertificateFormConfig = {
    // certificateCode: '00', // 证件类型代码集 // 只要符合表单就行
    business: '19', //  01 预审  02 过户
    formName: '商户管理照片集', // 表单名称
  } as Marketphotomap;
  save() {
    if (this._formGroup.invalid) {
      this._message.error('填写错误', JSON.stringify(this._formGroup.errors));
      return false;
    } else {
      let merchant = this._formGroup.value as MerchantModel;
      merchant.cloudUser = this._userService.getCurrentLoginUser().cloudUser;
      this._merchantService.update({
        merchant: merchant,
        photos: this._file.filterPhotosValue(this._formPhotos.value),
      } as MerchantForm).then(res => {
        this._message.success('修改成功', '修改商户成功');
        // this.saved = true;
      }).catch(err => {
        this._message.error('操作失败', err.message);
      });
    }
  }
}
