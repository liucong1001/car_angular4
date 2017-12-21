import { Component, OnInit } from '@angular/core';
import {CarModel} from '../../../@core/model/bussiness/car.model';
import {MessageService} from '../../../@core/utils/message.service';
import {WebcamService} from '../../../@core/device/webcam.service';
import {CarService} from '../../../@core/data/bussiness/car.service';
import {Router} from '@angular/router';
import {RestService} from '../../../@core/utils/rest.service';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'ngx-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
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
    private rest: RestService,
  ) {
    this.carService.getCar('1').then((res) => this.carData = res as CarModel);
    this.carService.getCars('1').then((res) => this.carsData = res as CarModel[]);
  }

  ngOnInit() {
  }

  onChangeSelectingCar(car: CarModel): void {
    this.carData = car;
    this.message.info(this.carData.lsnum, '当前车辆');
  }
  gotoNext() {
    // this._router.navigateByUrl('/pages/bussiness/prejudication/judication-photo');
    // this._get();
    this._post();
  }
  _post() {
    let json_data = {name: 'lianghong', password: 'password'};
    this.rest.post(
      'https://dongshenghuo.com/test.php',
      {name: 'lianghong'},
      {params: this.rest.json2httpparam(json_data)})
      .subscribe((res) => {
      console.log(res);
    });
  }
  _get() {
    this.rest.get('https://dongshenghuo.com/test.php').subscribe((res) => {
      console.log(res);
    });
  }
}
