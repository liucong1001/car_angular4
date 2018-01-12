import {PrejudicationForm} from './prejudication.form';
import {SellerForm} from './seller.form';
import {PreVehicleForm} from './preVehicle.form';
import {TransferForm} from './transfer.form';
import {BuyerForm} from './buyer.form';

/**
 * 交易表单
 */
export class TradeForm {
  /**
   * 当前用户
   * [所有情况必须]
   */
  clouduser?: string;
  /**
   * 车辆流水号
   * [预审后的过户操作必须][修改必须]
   */
  archiveNo?: string;
  /**
   * 预审业务对象  [仅读取用，不需要操作]
   */
  prejudication?: PrejudicationForm;
  /**
   * 预审业务对象状态
   * 0已录入;1已审核;2已完成;3已删除;4待录入;5正在录入;6已退回;
   * [修改操作时必须]
   */
  prejudicationStatus?: string;
  /**
   * 卖方表单模型
   */
  seller?: SellerForm;
  preVehicle?: PreVehicleForm;
  /**
   * 过户业务对象实例（结构同prejudication） [仅读取用，不需要操作]
   */
  transfer?: TransferForm;
  /**
   * 过户业务对象状态
   * 0已录入;1已审核;2已完成;3已删除;4待录入;5正在录入;6已退回;
   * [修改时必须]
   */
  transferStatus?: string;
  buyer?: BuyerForm;
  TransferVehicle?: object;
}
