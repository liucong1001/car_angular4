import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IdcardService} from '../../../../@core/device/idcard.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {CodeService} from '../../../../@core/data/system/code.service';
import {CodeitemService} from '../../../../@core/data/system/codeitem.service';
import {Codeitem} from '../../../../@core/model/system/codeitem';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MarketService} from '../../../../@core/data/system/market.service';
import {FilingInfoModel} from '../../../../@core/model/bussiness/filing.info.model';
import {UserService} from '../../../../@core/data/users.service';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {BussinessFormGroup} from '../../bussiness.form-group';

/**
 * 预审录入2--接口与页面的交互逻辑
 * 1、拿到上一页显示的选定的车商并显示出来
 * 2、接收到用户选择是否委托，有委托则显示委托书，否则不显示委托书
 * 3、选择卖方证件类型，则对应的显示出对应的证件类型上传入口
 * 4、读取卖方身份证信息并显示在表单中，不允许修改  [如果选择的是身份证的话]
 * 5、读取委托人的身份证信息并显示在表单中，不允许修改  [如果必要的话]
 */
@Component({
  selector: 'ngx-recording2',
  templateUrl: './recording2.component.html',
  styleUrls: ['./recording2.component.scss'],
})
export class Recording2Component implements OnInit, OnDestroy {
  /**
   * 缓存服务的前缀
   * 缓存前缀名以业务为单位，一个缓存前缀对应一个业务，一个缓存业务完成则删除该前缀的所有缓存
   * @type {string}
   * @private
   */
  private _cache_pre = 'bussiness_prejudication_recording_';
  public certType: Codeitem[];
  public certTypeSelected: Codeitem;
  merchant: MerchantModel = {name: ''};
  certificateFormConfig: Marketphotomap;
  linkmanSelected: FilingInfoModel = {};
  public _formGroup: FormGroup = this._formBuilder.group({
    seller: this._bussinessFormGroup.seller,
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _bussinessFormGroup: BussinessFormGroup,
    private _router: Router,
    private _idcard: IdcardService,
    private _message: MessageService,
    private _localstorage: LocalstorageService,
    private _code: CodeService,
    private _codeitem: CodeitemService,
    private _market: MarketService,
    public _userService: UserService,
  ) {}

  /**
   * 页面初始化事件
   */
  ngOnInit() {
    /**
     * 市场 代办员
     * @type {any | any}
     */
    let maybe_linkman = this._localstorage.get(this._cache_pre + 'linkmanSelected');
    console.info('发现 linkmanSelected ：', maybe_linkman);
    if (maybe_linkman) {
      this.linkmanSelected = maybe_linkman;
    }
    /**
     * 读取缓存的商户
     * @type {any}
     */
    let maybe_merchant = this._localstorage.get(this._cache_pre + 'dealer');
    console.info('发现 dealer ：', maybe_merchant);
    if (maybe_merchant) {
      this.merchant = maybe_merchant;
    }
    let maybe_certificate_type = this._localstorage.get(this._cache_pre + 'certType');
    console.info('发现 certType ：', maybe_certificate_type);
    if (maybe_certificate_type) {
      this.certTypeSelected = maybe_certificate_type;
    }
    this._codeitem.list('certType').then(res => this.certType = res as Codeitem[]);
    let maybe_seller_form = this._localstorage.get(this._cache_pre + 'seller_form');
    console.info('发现 seller_form ：', maybe_seller_form);
    if (maybe_seller_form) {
      this._formGroup.patchValue(maybe_seller_form);
    }
    /**
     * 卖家证件类型表单配置
     * @type {{}}
     */
    this.certificateFormConfig = {
      isApp: '0',
      certificateCode: '00', // 证件类型代码集
      business: '01', //  01 预审  02 过户
      formName: '预审录入卖家', // 表单名称
    } as Marketphotomap;
  }

  /**
   * 页面销毁前
   */
  ngOnDestroy() {
    console.info('222exec on destroy.');
    console.info(this._formGroup.get('seller').value);
    console.info(this._formGroup.get('seller').get('_photos_').value);
    this._localstorage.set(this._cache_pre + 'certType', this.certTypeSelected);
    this._localstorage.set(this._cache_pre + 'seller_form', this._formGroup.value);
    this._localstorage.set(this._cache_pre + 'seller_photos', this._formGroup.get('seller').get('_photos_').value);
    this._localstorage.set('dynamic_photos_seller_info', this._cache_pre + 'seller_photos');
  }

  /**
   * 转到下一页
   */
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording3');
  }
}
