import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TradeForm} from '../../../model/business/trade/trade.form';

/**
 * 需求描述与记录
 * 1、车辆列表，能根据车辆列表实例列表显示各个按钮选项
 * 2、可以点击，以查看指定车辆的详细信息
 * 3、可以勾选指定车辆，通过参数设置
 * 4、可以获取勾选车辆的列表
 */
@Component({
  selector: 'ngx-ys-carlist-transfer',
  templateUrl: './carlist-transfer.component.html',
  styleUrls: ['./carlist-transfer.component.scss'],
})
export class CarlistTransferComponent implements OnInit {
  @Input() tradeList: Array<TradeForm>;
  @Input() cars; // TODO: 过户完成后删除该参数
  @Input() car_list_title;
  @Input() listType?;
  /**
   * 勾选了哪些车辆的车辆列表
   * @type {EventEmitter<any>}
   * @private
   */
  @Output('_checkCars') private _checkCars = new EventEmitter();
  /**
   * 1、选中的哪个车辆的触发事件
   * 2、添加新车辆的触发事件(选中一辆空车)
   * @type {EventEmitter<any>}
   * @private
   */
  @Output('_selected') private _selected = new EventEmitter();
  private statusArr = {
    '01': '已录入', // 可以进行审核，其它状态不可以做审核操作
    '02': '已审核',
    '03': '已完成',
    '04': '已删除',
    '05': '待录入',
    '06': '录入中',
    '07': '已退回',
  };
  /**
   * 应标识为已通过审核的状态
   * @type {string[]}
   */
  private checkedStatus = [
    '02',
    '03',
  ];
  private canCheckingStatus = [
    '01',
  ];
  constructor() {}

  ngOnInit() {
  }

  selected(trade: TradeForm) {
    this._selected.emit(trade);
  }
  addNew() {
    this._selected.emit(null);
  }
  public checkCars: TradeForm[] = [];
  checkboxChanged(event, trade?: TradeForm) {
    // console.info('event', event);
    // console.info('checked', event.checked);
    // console.info('target.checked', event.target.checked);
    // console.info('returnValue', event.returnValue);
    if (event.target.checked) {
      this.checkCars.push(trade);
    } else {
      this.checkCars = this.checkCars.filter(t => t !== trade);
    }
    console.info(this.checkCars);
    this._checkCars.emit(this.checkCars);
  }
}
