import {TrusteeModel} from './trustee.model';
// TODO: 清理此model 并根据业务使用对应的 review 和 trade 下的model，开发完成后，顺便检查并清理 trade 和 review 下已存在，同目录下类似的 model
/**
 * 卖方
 */
export class SellerModel {
  /**
   * 卖方证件类型 代码集.
   */
  certType: string;
  /**
   * 卖方证件号
   */
  certCode: string;
  /**
   * 卖方证件名称
   */
  name: string;
  /**
   * 卖方证件有效期
   */
  endDate: string;
  /**
   * 卖方电话
   */
  phone: string;
  /**
   * 受托人类型 0-无 1-有
   */
  trusteeType: string;
  /**
   * 卖方地址
   */
  address: string;
  /**
   * 卖方受托人
   */
  Trustee: TrusteeModel;
  /**
   * 当有受托人的时候委托书是单拍还是多拍
   * 0-单拍 1-多拍
   */
  flag: string;
}
