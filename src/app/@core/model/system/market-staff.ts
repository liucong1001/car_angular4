import {User} from './user';
import {Marketmap} from './marketmap';

/**
 * 市场人员
 */
export class MarketStaff extends User {
  /**
   * 岗位
   */
  public position: string;
  /**
   * 员工编号
   */
  public staffNumber: string;
  public market?: Marketmap;
}
