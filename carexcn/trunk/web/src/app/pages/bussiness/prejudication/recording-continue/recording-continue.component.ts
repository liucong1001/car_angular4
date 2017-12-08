import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {CarModel} from '../../../../@core/model/bussiness/car.model';
import {CarService} from '../../../../@core/data/bussiness/car.service';

@Component({
  selector: 'ngx-recording-continue',
  templateUrl: './recording-continue.component.html',
  styleUrls: ['./recording-continue.component.scss'],
  providers: [CarService],
})

export class RecordingContinueComponent implements OnInit {
  public carData: CarModel;
  public carsData: CarModel[];
  constructor(private message: MessageService, private carService: CarService) {
    this.carService.getCar('1').then((res) => this.carData = res as CarModel);
    this.carService.getCars('1').then((res) => this.carsData = res as CarModel[]);
  }
  ngOnInit(): void {
  }
  onChangeSelectingCar(car: CarModel): void {
    this.carData = car;
    this.message.info(this.carData.lsnum, '当前车辆');
  }
}
