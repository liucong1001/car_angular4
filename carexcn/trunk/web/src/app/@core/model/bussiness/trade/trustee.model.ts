import {FilingInfoModel} from '../filing.info.model';

/**
 * 受托人
 */
export class TrusteeModel {
  /**
   * 受托人姓名
   */
  name: string;
  /**
   * 受托人证件有效期
   */
  endDate: string;
  /**
   * 受托人电话
   */
  phone: string;
  /**
   * 备案人对象实例{id}
   */
  filingInfo?: FilingInfoModel;
}
