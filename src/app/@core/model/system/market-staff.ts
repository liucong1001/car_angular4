import {User} from './user';

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
}
