import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from '../../../../../@core/utils/message.service';

@Component({
  selector: 'ngx-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  @Input() cars;
  @Output('_selectCar') private _selectCar = new EventEmitter();
  constructor(private message: MessageService) { }

  ngOnInit() {
  }

  selecteingCar(car: any) {
    // this.message.info(car.lsnum, '编辑车辆');
    this._selectCar.emit(car);
  }
}
