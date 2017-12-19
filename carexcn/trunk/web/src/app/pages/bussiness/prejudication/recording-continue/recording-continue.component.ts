import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {CarModel} from '../../../../@core/model/bussiness/car.model';
import {CarService} from '../../../../@core/data/bussiness/car.service';
import {Router} from '@angular/router';

/**
 * 预审录入 继续录入/批量录入 --接口与页面的交互逻辑
 * 1、请求接口(通过批次号)，或者要求接收的参数包含：商户编号，联系人姓名，手机号
 * 2、用户点击不同的车辆则调用后台接口获取不同车辆的信息
 * 3、读取行驶证时通过云接口调取行驶证的内容填充进表单
 * 4、允许用户修改部分表单内容
 * 5、获取表单最终内容并提交到后台接口并跳转到提交成功按钮。
 */
@Component({
  selector: 'ngx-recording-continue',
  templateUrl: './recording-continue.component.html',
  styleUrls: ['./recording-continue.component.scss'],
  providers: [CarService],
})
export class RecordingContinueComponent implements OnInit {
  public test= '';
  public carData: CarModel = new CarModel();
  public carsData: CarModel[];
  constructor(private message: MessageService, private carService: CarService, private _router: Router) {
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
    this._router.navigateByUrl('/pages/bussiness/prejudication/recording-last');
  }
  reBack() {
    this._router.navigateByUrl('/pages/bussiness/prejudication');
  }
}
