import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  @Input() cars2;
  @Input() car2;
  // cars:car[] = [{
  cars = [{
    lsnum: '鄂A09001',
  }, {
    lsnum: '鄂A09002',
  }, {
    lsnum: '鄂A09003',
  }, {
    lsnum: '鄂A09004',
  }, {
    lsnum: '鄂A09005',
  }, {
    lsnum: '鄂A09006',
  }, {
    lsnum: '鄂A09007',
  }, {
    lsnum: '鄂A09008',
  }];
  car = {
    lsnum:'',
  };
  constructor() { }

  ngOnInit() {
  }

  selectedCar(car:any) {
    // console.log(car);
    this.car.lsnum = car.lsnum;
  }
}
