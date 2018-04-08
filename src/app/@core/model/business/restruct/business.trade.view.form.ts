/**
 * 过户车辆对象实例	    [过户时(创建和增加)必须]
 */
import {BuyerForm} from '../trade/buyer.form';
import {SellerForm} from '../trade/seller.form';

export class BusinessTradeViewForm {
  /**
   * 市场代码
   */
  cloudUser?: string;
  /**
   * 预审批次号
   */
  preBatchNo?: string;
  /**
   * 卖方表单
   * seller.reviewPhotos
   */
  seller?: SellerForm;
  /**
   * 过户批次号
   */
  transferBatchNo?: string;
  /**
   * 卖方表单
   * buyer.reviewPhotos
   */
  buyer?: BuyerForm;
  /**
   * 业务对象标识<list>
   *     ids      <prejudication.id>  预审时
   *     ids   	  <transfer.id>       过户时
   */
  tradeIds?: Array<string>;
}
