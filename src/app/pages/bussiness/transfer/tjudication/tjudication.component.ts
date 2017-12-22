import { Component, OnInit } from '@angular/core';
import {WebcamService} from '../../../../@core/device/webcam.service';
import {CarService} from '../../../../@core/data/bussiness/car.service';
import {CarModel} from '../../../../@core/model/bussiness/car.model';
import {Router} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';

@Component({
  selector: 'ngx-tjudication',
  templateUrl: './tjudication.component.html',
  styleUrls: ['./tjudication.component.scss'],
})
export class TjudicationComponent implements OnInit {

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
  constructor(private message: MessageService, private carService: CarService, private webcam: WebcamService, private _router: Router) {
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
    this._router.navigateByUrl('/pages/bussiness/transfer/tjudication-phone');
  }
  reBack() {
    this._router.navigateByUrl('/pages/bussiness/transfer/trecording-last');
  }

}
