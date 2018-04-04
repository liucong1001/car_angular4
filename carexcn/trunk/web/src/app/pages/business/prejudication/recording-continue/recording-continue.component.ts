import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TradeService} from '../../../../@core/data/business/trade.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {PrejudicationService} from '../../../../@core/data/business/prejudication.service';
import {FormBuilder, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {PreVehicleModel} from '../../../../@core/model/business/trade/preVehicle/preVehicle.model';
import {FilingInfoModel} from '../../../../@core/model/business/filing.info.model';
import {Marketphotomap} from '../../../../@core/model/system/market-photo-map';
import {FileSystemService} from '../../../../@core/data/system/file-system.service';
import {BusinessFormGroup} from '../../business.form-group';
import {BusinessTradeForm} from '../../../../@core/model/business/restruct/business.trade.form';

/**
 * 预审录入 继续录入/批量录入 --接口与页面的交互逻辑
 * 1、请求接口(通过批次号)，或者要求接收的参数包含：商户编号，联系人姓名，手机号
 * 2、用户点击不同的车辆则调用后台接口获取不同车辆的信息
 * 3、读取行驶证时通过云接口调取行驶证的内容填充进表单
 * 4、允许用户修改部分表单内容
 * 5、获取表单最终内容并提交到后台接口并跳转到提交成功按钮。
 * !!!!! 注意：
 * 审核完成的预审业务不允许动
 * 没有审核完成的可以添加和修改
 */
@Component({
  selector: 'ngx-recording-continue',
  templateUrl: './recording-continue.component.html',
  styleUrls: ['./recording-continue.component.scss'],
})
export class RecordingContinueComponent implements OnInit {
  certificateFormConfig: Marketphotomap;
  public prejudicationBatchNo = '';
  public archiveNo = '';
  public notNewCar = false;
  public trade: BusinessTradeForm;
  public tradeList: [BusinessTradeForm];
  public _formGroup: FormGroup = this._formBuilder.group({
    vehicle: this._businessFormGroup.vehicle,
  });
  constructor(
    private _trade: TradeService,
    private _message: MessageService,
    private _prejudicationService: PrejudicationService,
    private _formBuilder: FormBuilder,
    private _businessFormGroup: BusinessFormGroup,
    private _router: Router,
    private _route: ActivatedRoute,
    private _file: FileSystemService,
    private _localstorage: LocalstorageService,
  ) {}
  ngOnInit(): void {
    this._route.params.subscribe(param => {
      if (param.batchNo) {
        this.prejudicationBatchNo = param.batchNo;
      }
    });
    /**
     * 可能的缓存
     * @type {any | any}
     */
    // if (!this.archiveNo) {
    //   let maybe_vehicle = this._localstorage.get(this._cache_pre + 'continue_vehicle');
    //   if (maybe_vehicle) {
    //     this._formGroup.patchValue(maybe_vehicle);
    //     let maybe_continue_archiveNo = this._localstorage.get(this._cache_pre + 'continue_archiveNo');
    //     if (maybe_continue_archiveNo) {
    //       this.archiveNo = maybe_continue_archiveNo;
    //     }
    //   } else {
    //     console.info(maybe_vehicle);
    //   }
    // }
  }
  onChangeSelectedCar(trade: TradeForm): void {
    // if (null === trade) {
    //   this._formGroup.reset();
    //   this.notNewCar = false;
    //   this._message.info('添加车辆', '添加新车辆');
    // } else {
    //   this.notNewCar = true;
    //   console.info(trade.preVehicle.preVehicle);
    //   this._formGroup.patchValue({vehicle: trade.preVehicle.preVehicle});
    //   this._message.info('查看车辆', trade.preVehicle.preVehicle.plateNumber);
    // }
  }

  onSubmit() {
    console.info(this.trade);
    // console.info(this.trade.prejudication.business.archiveNo);
    // this._localstorage.set(this._cache_pre + 'continue_archiveNo', this.trade.prejudication.business.archiveNo);
    // this._localstorage.set(this._cache_pre + 'continue_vehicle', this._formGroup.value);
    // let preVehicle = this._formGroup.value.vehicle as PreVehicleModel;
    // preVehicle.filingInfo = this.trade.preVehicle.preVehicle.filingInfo as FilingInfoModel;
    // console.info(this._formGroup.get('vehicle').value);
    // console.info(this._formGroup.get('vehicle').get('_photos_').value);
    // this._prejudicationService.addCar(
    //   this.trade.prejudication.id,
    //   this. as PreVehicle).then(res => {
    //   console.info(res);
    //   this._message.info('操作提示', '车辆添加成功！');
    //   this._prejudicationService.carList(this.trade.prejudication.business.archiveNo).then(r => {
    //     console.info('添加车辆成功后，的返回 r', r);
    //     this.tradeList = r as [TradeForm];
    //     console.info('添加车辆成功后，的交易详情 this.tradeList', this.tradeList);
    //   }).catch(e => {
    //     console.info(e);
    //   });
    // }).catch(e => {
    //   console.info(e);
    //   this._message.error('操作失败', e.message);
    // });
    // this._router.navigateByUrl('/pages/business/prejudication/recording-last');
  }
  reBack() {
    // console.info(this._formGroup.invalid);
    // console.info(this.notNewCar);
    // this.getFormValidationErrors(this._formGroup);
    // console.info(this.trade);
    this._router.navigateByUrl('/pages/business/prejudication');
  }
  getTradeByArchiveNoComponent(trade) {
    this.trade = trade;
  }
  getTradeListByArchiveNoComponent(tradeList) {
    this.tradeList = tradeList;
  }
  test() {
    console.info('test');
  }
  /**
   * 检查并输出表单组包含的错误
   * eg: getFormValidationErrors(_formGroup)
   * @param {FormGroup} _formGroup
   */
  getFormValidationErrors(_formGroup: FormGroup) {
    Object.keys(_formGroup.controls).forEach(key => {
      const control = _formGroup.get(key);
      if (control instanceof FormControl) {
        const controlErrors: ValidationErrors = control.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.info('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      } else if (control instanceof FormGroup) {
        console.info('___FormControl___: ' + key);
        this.getFormValidationErrors(control);
      } else {
        console.error(key + ' is not instanceof FormControl and FormGroup, is not support.');
      }
    });
  }
}
