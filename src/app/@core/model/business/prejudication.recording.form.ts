import {SellerModel} from './seller.model';

/**
 * 定义提交预审录入表单模型
 */

export class PrejudicationRecordingForm {
  /**
   * 业务所属市场代码
   */
  cloudUser: string;
  /**
   * 卖家
   */
  seller: SellerModel;
}
