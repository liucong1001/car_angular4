import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TradeForm} from '../../../model/bussiness/trade/trade.form';

@Component({
  selector: 'ngx-ys-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.scss'],
})
export class CarlistComponent implements OnInit {
  @Input() tradeList: Array<TradeForm>;
  @Input() cars; // TODO: 过户完成后删除该参数
  @Input() car_list_title;
  @Input() showAddButton? = false;
  @Output('_selectCar') private _selectCar = new EventEmitter();
  @Output('_selected') private _selected = new EventEmitter();
  constructor(
    // private message: MessageService,
  ) { }

  ngOnInit() {
  }

  selected(trade: TradeForm) {
    // this.message.info(trade.preVehicle.preVehicle.plateNumber, '编辑车辆');
    this._selected.emit(trade);
  }
  addNew() {
    this._selected.emit(null);
  }
}
