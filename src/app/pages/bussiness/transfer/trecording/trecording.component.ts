import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Router} from '@angular/router';
import {WebcamService} from '../../../../@core/device/webcam.service';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-ys-trecording',
  templateUrl: './trecording.component.html',
  styleUrls: ['./trecording.component.scss'],
})
export class TrecordingComponent implements OnInit {
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
  public archiveNo = '';
  // public trade: TradeForm = {preVehicle: {preVehicle: {filingInfo: {merchant: {}}}}}; // trade.preVehicle.preVehicle.filingInfo.merchant
  public trade: TradeForm;
  public tradeList: [TradeForm];
  public _formGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _message: MessageService,
    private _webcam: WebcamService,
    private _router: Router,
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
    const ifDisabled = true;
    this._formGroup = this._formBuilder.group({
      seller: this._formBuilder.group({
        certType: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        certCode: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        name: [{ value: '', disabled: ifDisabled }, [Validators.required, Validators.maxLength(64)]],
        endDate: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        phone: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        trusteeType: [{ value: '0', disabled: ifDisabled }, [Validators.required]],
        address: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        Trustee: this._formBuilder.group({
          certCode: [{ value: '', disabled: ifDisabled }, [Validators.required]],
          name: [{ value: '', disabled: ifDisabled }, [Validators.required, Validators.maxLength(64)]],
          endDate: [{ value: '', disabled: ifDisabled }, [Validators.required]],
          phone: [{ value: '', disabled: ifDisabled }, [Validators.required]],
          trusteeType: [{ value: '0', disabled: ifDisabled }, [Validators.required]],
          address: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        }),
        // flag: ['', [Validators.required]],
      }),
      vehicle: this._formBuilder.group({
        brandModel: [{ value: '', disabled: ifDisabled }, [Validators.required]], // 厂牌型号实体Id
        labelCode: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        vehicleType: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        plateNumber: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        frameNumber: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        engineNumber: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        registration: [{ value: '', disabled: ifDisabled }, [Validators.required, Validators.maxLength(12)]],
        registrationDate: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        useCharacter: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        useNature: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        displacement: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        range: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        size: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        mileage: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        otherConditions: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        origin: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        fee: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        review: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        invalid: [{ value: '', disabled: ifDisabled }, [Validators.required]],
        eeee: [{ value: '', disabled: ifDisabled }, [Validators.maxLength(50)]],
        /**
         * TODO: 注意 eeee 字段，后台可能暂未准备好接收，但是是业务必须的字段
         * TODO: 注意 eeee 字段的错误信息
         */
      }),
    });
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
  gotoNext() {
    console.info('gotoNext');
    // this._router.navigateByUrl('/pages/bussiness/transfer/trecording2');
  }
}
