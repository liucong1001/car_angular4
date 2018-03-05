import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Router} from '@angular/router';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {TradeService} from '../../../../@core/data/bussiness/trade.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';

@Component({
  selector: 'ngx-ys-trecording',
  templateUrl: './trecording.component.html',
  styleUrls: ['./trecording.component.scss'],
})
export class TrecordingComponent implements OnInit {
  private _cache_pre = 'bussiness_transfer_recording_';
  vehicleCertificateFormConfig: Marketphotomap;
  sellerCertificateFormConfig: Marketphotomap;
  public archiveNo = '';
  public trade: TradeForm;
  public tradeList: [TradeForm];
  public _formGroup: FormGroup = this._formBuilder.group({
    seller: this._formBuilder.group({
      certType: [{ value: '', disabled: true }, [Validators.required]],
      certCode: [{ value: '', disabled: true }, [Validators.required]],
      name: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(64)]],
      endDate: [{ value: '', disabled: true }, [Validators.required]],
      phone: [{ value: '', disabled: true }, [Validators.required]],
      trusteeType: [{ value: '0', disabled: true }, [Validators.required]],
      address: [{ value: '', disabled: true }, [Validators.required]],
      Trustee: this._formBuilder.group({
        certCode: [{ value: '', disabled: true }, [Validators.required]],
        name: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(64)]],
        endDate: [{ value: '', disabled: true }, [Validators.required]],
        phone: [{ value: '', disabled: true }, [Validators.required]],
        trusteeType: [{ value: '0', disabled: true }, [Validators.required]],
        address: [{ value: '', disabled: true }, [Validators.required]],
      }),
      // flag: ['', [Validators.required]],
    }),
    vehicle: this._formBuilder.group({
      // brandModel: [{ value: '', disabled: false }, [Validators.maxLength(50)]], // 厂牌型号实体Id
      labelCode: [{ value: '', disabled: false }, [Validators.required]],
      vehicleType: [{ value: '', disabled: false }, [Validators.required]],
      plateNumber: [{ value: '', disabled: false }, [Validators.required]],
      frameNumber: [{ value: '', disabled: false }, [Validators.required]],
      // engineNumber: [{ value: '', disabled: false }, [Validators.required]],
      registration: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(12)]],
      registrationDate: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
      useCharacter: [{ value: '', disabled: false }, [Validators.required]],
      useNature: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
      displacement: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
      range: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
      size: [{ value: '', disabled: false }, [Validators.required]],
      mileage: [{ value: '', disabled: false }, [Validators.required]],
      otherConditions: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
      origin: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
      fee: [{ value: '', disabled: false }, [Validators.required]],
      // eeee: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
      /**
       * TODO: 注意 eeee 字段，后台可能暂未准备好接收，但是是业务必须的字段
       * TODO: 注意 eeee 字段的错误信息
       */
    }),
  });
  constructor(
    private _router: Router,
    private _trade: TradeService,
    private _message: MessageService,
    private _formBuilder: FormBuilder,
    private _localstorage: LocalstorageService,
  ) {
  }
  getTradeByArchiveNoComponent(trade) {
    this.trade = trade;
    this._formGroup.controls.seller.patchValue(this.trade.seller.seller);
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
    this.onChangeSelectedCar(tradeList[0]);
  }
  ngOnInit() {
    let maybe_continue_archiveNo = this._localstorage.get(this._cache_pre + 'archiveNo');
    if (maybe_continue_archiveNo) {
      this.archiveNo = maybe_continue_archiveNo;
    }
    /**
     * 卖家证件类型表单配置
     * @type {{}}
     */
    this.sellerCertificateFormConfig = {
      isApp: '0',
      certificateCode: '00', // 证件类型代码集
      business: '01', //  01 预审  02 过户
      formName: '预审录入卖家', // 表单名称
    } as Marketphotomap;
    /**
     * 车辆证件类型表单配置
     * @type {Marketphotomap}
     */
    this.vehicleCertificateFormConfig = {
      isApp: '0',
      // certificateCode: '00', // 证件类型代码集 // 只要符合表单就行
      business: '01', //  01 预审  02 过户
      formName: '预审录入车辆', // 表单名称
    } as Marketphotomap;
  }
  onChangeSelectedCar(trade: TradeForm): void {
    if (null === trade) {
      this._formGroup.reset();
      // this.notNewCar = false;
      this._message.info('添加车辆', '添加新车辆');
    } else {
      // this.notNewCar = true;
      console.info(trade.preVehicle.preVehicle);
      this._formGroup.patchValue({vehicle: trade.preVehicle.preVehicle});
      this._message.info('查看车辆', trade.preVehicle.preVehicle.plateNumber);
    }
  }
  onSubmit() {
    console.info(this.tradeList.length);
    console.info(this.tradeList);
    this._localstorage.set(this._cache_pre + 'archiveNo', this.trade.archiveNo);
    if (1 > this.tradeList.length) {
      this._message.warning('错误提示', '请选择至少一个车辆。');
    } else {
      this._localstorage.set(this._cache_pre + 'trade', this.tradeList);
      this._router.navigateByUrl('/pages/bussiness/transfer/trecording2');
    }
  }
}
