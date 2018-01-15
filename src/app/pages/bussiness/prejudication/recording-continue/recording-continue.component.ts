import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Router} from '@angular/router';
import {TradeService} from '../../../../@core/data/bussiness/trade.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';
import {PrejudicationService} from '../../../../@core/data/bussiness/prejudication.service';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {SellerForm} from "../../../../@core/model/bussiness/trade/seller.form";
import {PreVehicleForm} from "../../../../@core/model/bussiness/trade/preVehicle.form";
import {PreVehicleModel} from "../../../../@core/model/bussiness/trade/preVehicle/preVehicle.model";
import {FilingInfoModel} from "../../../../@core/model/bussiness/filing.info.model";

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
  private notNewCar = false;
  public trade: TradeForm = {};
  public tradeList: [TradeForm];
  public _formGroup: FormGroup = this._formBuilder.group({
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
    private _trade: TradeService,
    private _message: MessageService,
    private _prejudicationService: PrejudicationService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _localstorage: LocalstorageService,
  ) {
    /**
     * 缓存前缀名以业务为单位，一个缓存前缀对应一个业务，一个缓存业务完成则删除该前缀的所有缓存
     * @type {string}
     */
    this._localstorage.prefix = 'bussiness_prejudication_recording';
  }
  ngOnInit(): void {
    this.trade = this._localstorage.get('trade');
    this._prejudicationService.carList(this.trade.prejudication.business.archiveNo).then(res => {
      this.tradeList = res.json() as [TradeForm];
    }).catch(e => {
      console.info(e);
    });
  }
  onChangeSelected(trade: TradeForm): void {
    if (null === trade) {
      this._formGroup.reset();
      this.notNewCar = false;
      this._message.info('添加车辆', '添加新车辆');
    } else {
      this.notNewCar = true;
      console.info(trade.preVehicle.preVehicle);
      this._formGroup.patchValue({vehicle: trade.preVehicle.preVehicle});
      this._message.info('查看车辆', trade.preVehicle.preVehicle.plateNumber);
    }
  }
  onSubmit() {
    console.info(this.trade);
    let preVehicle = this._formGroup.value.vehicle as PreVehicleModel;
    preVehicle.filingInfo = this.trade.preVehicle.preVehicle.filingInfo as FilingInfoModel;
    this._prejudicationService.addCar(this.trade.prejudication.id, {
      photos: {},
      preVehicle: preVehicle,
      // newCarsPrice: '',
    } as PreVehicleForm).then(res => {
      console.info(res);
    }).catch(e => {
      console.info(e);
    });
    // this._router.navigateByUrl('/pages/bussiness/prejudication/recording-last');
  }
  reBack() {
    console.info(this._formGroup.invalid);
    console.info(this.notNewCar);
    this.getFormValidationErrors(this._formGroup);
    console.info(this.trade);
    // this._router.navigateByUrl('/pages/bussiness/prejudication');
  }
  /**
   * 检查并输出表单组包含的错误
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
