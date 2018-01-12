import {FilingInfoModel} from '../../filing.info.model';
import {MerchantModel} from '../../merchant.model';

export class TransferVehicleModel {
  id?: string;
  /**
   * 备案人对象实例{id}
   */
  filingInfo?: FilingInfoModel;
  /**
   * 商户
   */
  merchant?: MerchantModel;
  /**
   * 车管所
   */
  vehicleManagement?: string;
  /**
   * 发表备注
   */
  billMemo?: string;
  /**
   * 评估价格 number
   */
  evaluatePrice?: string;
  /**
   * 成交价格 number
   */
  bargainPrice?: string;
  /**
   * 手续费 number
   */
  fee?: string;
  /**
   * 审核状态
   * 0 - 未审核 1 - 已审核
   */
  review?: string;
  /**
   * 业务状态
   * 是否有效 0 有效 1 无效
   */
  invalid?: string;
}
