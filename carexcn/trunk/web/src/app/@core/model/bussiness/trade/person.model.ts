import {FilingInfoModel} from '../filing.info.model';
import {TrusteeModel} from './trustee.model';

export class PersonModel {
  id: string;
  /**
   * 证件类型 代码集.
   */
  certType?: string;
  /**
   * 证件号
   */
  certCode?: string;
  /**
   * 证件名称
   */
  name?: string;
  /**
   * 证件有效期
   */
  endDate?: string;
  /**
   * 电话
   */
  phone?: string;
  /**
   * 备案人对象实例{id}
   */
  filingInfo?: FilingInfoModel;
  /**
   * 受托人类型 0-无 1-有
   */
  trusteeType?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 受托人
   */
  Trustee?: TrusteeModel;
  /**
   * 当有受托人的时候委托书是单拍还是多拍
   * 0-单拍 1-多拍
   */
  flag?: string;
}
