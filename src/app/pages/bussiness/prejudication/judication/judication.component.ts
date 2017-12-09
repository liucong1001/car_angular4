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
  /*
  TODO: 用命令行创建两个子组件，暂时不考虑重用的问题(方法与变量的传递，不同场景的适配，需要更多时间)，先让业务尽快开展
  * */
  public carData: CarModel;
  public carsData: CarModel[];
  public webcam_has_show = false;

  constructor(private message: MessageService, private carService: CarService, private webcam: WebcamService) {
    this.carService.getCar('1').then((res) => this.carData = res as CarModel);
    this.carService.getCars('1').then((res) => this.carsData = res as CarModel[]);
  }

  onChangeSelectingCar(car: CarModel): void {
    this.carData = car;
    this.message.info(this.carData.lsnum, '当前车辆');
  }

  ngOnInit() {
  }

  showCamera() {
    if (this.webcam_has_show) {
      this.webcam.hideWebcam();
      console.log('hideWebcam');
      this.webcam_has_show = false;
    } else {
      this.webcam.showWebcam();
      console.log('showWebcam');
      this.webcam_has_show = true;
    }
  }
  paizhao() {
    this.webcam.snapshot(false, 'a', 'b');
    console.log('paizhao');
  }
  upload() {
    console.log('upload');
  }
  clear() {
    console.log('clear');
  }
}
