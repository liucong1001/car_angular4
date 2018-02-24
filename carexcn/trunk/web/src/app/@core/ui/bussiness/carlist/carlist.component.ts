import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TradeForm} from '../../../model/bussiness/trade/trade.form';

/**
 * 需求描述与记录
 * 1、车辆列表，能根据车辆列表实例列表显示各个按钮选项
 * 2、可以点击，以查看指定车辆的详细信息
 * 3、可以勾选指定车辆，通过参数设置
 * 4、可以获取勾选车辆的列表
 */
@Component({
  selector: 'ngx-ys-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.scss'],
})
export class CarlistComponent implements OnInit {
  @Input() tradeList: Array<TradeForm>;
  @Input() cars; // TODO: 过户完成后删除该参数
  @Input() car_list_title;
  @Input() listType?;
  /**
   * 勾选了哪些车辆的车辆列表
   * @type {EventEmitter<any>}
   * @private
   */
  @Output('_selectCar') private _selectCar = new EventEmitter();
  /**
   * 1、选中的哪个车辆的触发事件
   * 2、添加新车辆的触发事件(选中一辆空车)
   * @type {EventEmitter<any>}
   * @private
   */
  @Output('_selected') private _selected = new EventEmitter();
  constructor() {}

  ngOnInit() {
  }

  selected(trade: TradeForm) {
    this._selected.emit(trade);
  }
  addNew() {
    this._selected.emit(null);
  }
}
