/**
 * 商户
 */
import {AccountModel} from './account.model';
export class MerchantModel {
  /**
   * 账号实体
   */
  account?: AccountModel;
  /**
   * 1-市场(个人)商户
   * 0-正常商户
   * 不管是个人还是机构都是正常商户
   * 个人商户是内建用于进行没有商户关系的交易
   */
  flag?: string;
  /**
   * 编号
   */
  id?: string;
  /**
   * 商户名
   */
  name?: string;
  /**
   * 编码
   */
  code?: string;
  /**
   * 组织机构代码
   */
  certCode?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 证件有效期
   */
  endDate?: string;
  /**
   * 交易折扣
   */
  discount?: number;
  /**
   * 是否租车位（1场内，0场外）
   */
  isCarRental?: string;
  /**
   * 是否交易（1是，0否）
   */
  isDeal?: string;
  /**
   * 是否个人（1是，0否）
   * 个人还是机构
   * 个人就可以作为商户的情况
   * 机构必须要有营业执照
   * 不管是个人还是机构都是正常商户
   */
  isPersonal?: string;
  /**
   * 停用标记（1启用，0停用）
   */
  disableSign?: string;
  invalid?: string;
  cloudUser?: string;
  /**
   * 主商户实体，为空时本身为主商户，只有主商户才可以创建子商户
   */
  master?: MerchantModel;
}
