import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CarService} from '../../../../@core/data/bussiness/car.service';
import {CarModel} from '../../../../@core/model/bussiness/car.model';
import {MessageService} from '../../../../@core/utils/message.service';
import {WebcamService} from '../../../../@core/device/webcam.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  public test= '';
  /**
   * 车辆单辆数据
   */
  public carData: CarModel = new CarModel();
  /**
   * 车辆多辆数据集
   */
  public carsData: CarModel[];
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
    private _formbuilder: FormBuilder,
  ) {
    this.carService.getCar('1').then((res) => this.carData = res as CarModel);
    this.carService.getCars('1').then((res) => this.carsData = res as CarModel[]);
  }
  ngOnInit(): void {
  }
  onChangeSelectingCar(car: CarModel): void {
    this.carData = car;
    this.message.info(this.carData.lsnum, '当前车辆');
  }
  onSubmit() {
    this._router.navigateByUrl('/pages/bussiness/prejudication/judication-photo');
  }
  reBack() {
    this._router.navigateByUrl('/pages/bussiness/prejudication');
  }
}
