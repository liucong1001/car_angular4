import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Router} from '@angular/router';
import {WebcamService} from '../../../../@core/device/webcam.service';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';

@Component({
  selector: 'ngx-trecording',
  templateUrl: './trecording.component.html',
  styleUrls: ['./trecording.component.scss'],
})
export class TrecordingComponent implements OnInit {

  public trade: TradeForm = {
    prejudication: {business: {archiveNo: ''}},
    // preVehicle: {preVehicle: {filingInfo: {merchant: {account: {}}}}},
    // seller: {seller: {}},
  };
  constructor(
    private _message: MessageService,
    private _webcam: WebcamService,
    private _router: Router,
  ) {
    // this.carService.getCar('1').then((res) => this.carData = res as CarModel);
    // this.carService.getCars('1').then((res) => this.carsData = res as CarModel[]);
  }
 /* constructor(
    private message: MessageService,
    private router: Router,
  ) { }*/
  // photos: any[] = [{
  //   title: '',
  //   source: 'assets/images/camera1.jpg',
  // }];
  // /**
  //  * 新的图片地址事件
  //  * @param $event
  //  * @param photo
  //  */
  // onChangeSource($event, photo) {
  //   this.message.info(photo.title + ' 的新图片地址', $event);
  // }
  ngOnInit() {
    // this.credentials = {type: '1'};
    // this.batch = '';
    // this.read = false;
  }
  // batch: string;
  // /*证件类型*/
  // credentials: {
  //   type: string;
  // };
  // /*input可用*/
  // read: boolean;
  // readWrite() {
  //   if (this.batch !== '') {
  //     this.read = true;
  //   }
  //   // console.log(this.read);
  // }
  // /*跳转*/
  // gotoNext() {
  //   this._router.navigateByUrl('/pages/bussiness/transfer/trecording2');
  // }
  // public test= '';
  // /**
  //  * 车辆单辆数据
  //  */
  // public carData: CarModel = new CarModel();
  // /**
  //  * 车辆多辆数据集
  //  */
  // public carsData: CarModel[];
  // onChangeSelectingCar(car: CarModel): void {
  //   this.carData = car;
  //   this.message.info(this.carData.lsnum, '当前车辆');
  // }
}
