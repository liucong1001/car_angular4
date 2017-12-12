import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CarService} from '../../../../@core/data/bussiness/car.service';
import {CarModel} from '../../../../@core/model/bussiness/car.model';
import {MessageService} from '../../../../@core/utils/message.service';
import {DeviceService} from '../../../../@core/device/device.service';
import {WebcamService} from '../../../../@core/device/webcam.service';

@Component({
  selector: 'ngx-judication',
  templateUrl: './judication.component.html',
  styleUrls: ['./judication.component.scss'],
  providers: [CarService, WebcamService, DeviceService],
})
export class JudicationComponent implements OnInit {
  /**
   * 定义
   * @type {{title: string; source: string}[]}
   */
  photos: any[] = [{
    title: '身份证正面',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '身份证反面',
    source: 'assets/images/camera2.jpg',
  }, {
    title: '代办联系人头像',
    source: 'assets/images/camera3.jpg',
  }, {
    title: '商户联系人确认单',
    source: 'assets/images/camera4.jpg',
  }];
  /**
   * 车辆单辆数据
   */
  public carData: CarModel;
  /**
   * 车辆多辆数据集
   */
  public carsData: CarModel[];

  /**
   * 数据初始化
   * @param {MessageService} message
   * @param {CarService} carService
   * @param {WebcamService} webcam
   */
  constructor(private message: MessageService, private carService: CarService, private webcam: WebcamService) {
    /**
     * 不能写在 ngOnInit 中，因为必须在渲染子组件之前就要传递数据给子组件
     */
    this.carService.getCar('1').then((res) => this.carData = res as CarModel);
    this.carService.getCars('1').then((res) => this.carsData = res as CarModel[]);
  }
  ngOnInit() {
  }
}
