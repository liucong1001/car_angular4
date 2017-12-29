import {FilingPersonModel} from './filing.person.model';
import {MerchantModel} from './merchant.model';

/**
 * 备案信息
 */
export class FilingInfoModel {
  /**
   * 姓名
   */
  name?: string;
  /**
   * 名字拼音
   */
  spell?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 电话
   */
  phone?: string;
  /**
   * 证件有效期
   */
  endDate?: string;
  /**
   * 是否可代办（1是，0否）
   */
  isAgency?: string;
  /**
   * 是否可交易（1是，0否）
   */
  isDeal?: string;
  /**
   * 是否可使用APP（1是，0否）
   */
  isApp?: string;
  /**
   * 停用标记（1启用，0停用）
   */
  disableSign?: string;
  /**
   * 删除标记（1无效，0有效）
   */
  invalid?: string;
  /**
   * 商户标识（存id）
   */
  merchant?: MerchantModel;
  /**
   * 备案人实体
   */
  filingPerson?: FilingPersonModel;
  cloudUser?: string;
}
