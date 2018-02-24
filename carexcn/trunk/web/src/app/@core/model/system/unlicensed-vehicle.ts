import {Marketmap} from './marketmap';

/**
 * 问题车辆模型
 */
export class UnlicensedVehiclemap{

  public id? : string;

  /**
   * 车牌号
   */
  public plateNumber : string;

  /**
   * 锁定原因
   */
  public lockReason : string;

  /**
   * 市场
   */
  public market : Marketmap;


}
