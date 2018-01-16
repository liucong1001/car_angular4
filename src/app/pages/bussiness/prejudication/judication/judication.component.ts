import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CarService} from '../../../../@core/data/bussiness/car.service';
import {CarModel} from '../../../../@core/model/bussiness/car.model';
import {MessageService} from '../../../../@core/utils/message.service';
import {WebcamService} from '../../../../@core/device/webcam.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';
import {TradeService} from '../../../../@core/data/bussiness/trade.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {PrejudicationService} from '../../../../@core/data/bussiness/prejudication.service';

/**
 * 预审业务 - 预审审核 - 核对信息 --—接口与页面的交互逻辑
 * 1、用户输入流水号或批次号
 * 2、通过后台接口获取该号所属所有车辆列表以及车辆详情
 * 3、加载用户选择的任一车辆详情供用户查看（不允许修改任何信息）
 * 4、用户点击审核通过后，跳转入拍照录入页面
 */
@Component({
  selector: 'ngx-judication',
  templateUrl: './judication.component.html',
  styleUrls: ['./judication.component.scss'],
})
export class JudicationComponent implements OnInit {
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
  /**
   * 数据初始化
   * @param {MessageService} message
   * @param {CarService} carService
   * @param {WebcamService} webcam
   * @param {Router} _router
   */
  constructor(
    private message: MessageService,
    private carService: CarService,
    private webcam: WebcamService,
    private _router: Router,
    private _trade: TradeService,
    private _message: MessageService,
    private _prejudicationService: PrejudicationService,
    private _formBuilder: FormBuilder,
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
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/judication-photo');
  }
  reBack() {
    this._router.navigateByUrl('/pages/bussiness/prejudication');
  }
  onChangeSelected(trade: TradeForm): void {
    if (null === trade) {
      this._formGroup.reset();
      this._message.info('添加车辆', '添加新车辆');
    } else {
      console.info(trade.preVehicle.preVehicle);
      this._formGroup.patchValue({vehicle: trade.preVehicle.preVehicle});
      this._message.info('查看车辆', trade.preVehicle.preVehicle.plateNumber);
    }
  }
}
