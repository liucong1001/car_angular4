import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from '../../utils/message.service';

@Component({
  selector: 'ngx-ys-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.scss'],
})
export class CarlistComponent implements OnInit {
  @Input() cars;
  @Input() car_list_title;
  @Output('_selectCar') private _selectCar = new EventEmitter();
  constructor(private message: MessageService) { }

  ngOnInit() {
  }

  selecteingCar(car: any) {
    // this.message.info(car.lsnum, '编辑车辆');
    this._selectCar.emit(car);
  }
}
