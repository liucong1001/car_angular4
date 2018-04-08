import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BusinessTradeForm} from '../../../model/business/restruct/business.trade.form';

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
  @Input() tradeList: Array<BusinessTradeForm>;
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
  public statusArr = {
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
  public checkedStatus = [
    '02',
    '03',
  ];
  public canCheckingStatus = [
    '01',
  ];
  constructor() {}

  /**
   * 批次下只有一辆车时
   * 1、自动选上这辆车
   * 2、自动聚焦该车辆显示详情
   */
  ngOnInit() {
    if (('checkbox' === this.listType && 1 === this.tradeList.length)) {
      this.checkboxChanged(
        {target: {checked: true}},
        this.tradeList[0],
      );
      this.selected(this.tradeList[0]);
    }
  }

  /**
   * 单击某辆车以查看车辆详情
   * @param {TradeForm} trade
   */
  selected(trade: BusinessTradeForm) {
    this._selected.emit(trade);
  }

  /**
   * 添加新车辆的操作
   */
  addNew() {
    this._selected.emit(null);
  }

  /**
   * 勾选的车辆集合 （一般用于审核勾选）
   * @type {any[]}
   */
  public checkCars: BusinessTradeForm[] = [];

  /**
   * 勾选某辆车的操作
   * @param event
   * @param {TradeForm} trade
   */
  checkboxChanged(event, trade?: BusinessTradeForm) {
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
