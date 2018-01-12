/**
 * 过户车辆对象实例	    [过户时(创建和增加)必须]
 */

export class ReviewForm {
  /**
   * 预审业务
   */
  prejudication?: {
    /**
     * [同 prejudication.bussiness.id]
     */
    clouduser?: string;
    /**
     * [同 prejudication.bussiness.id]
     */
    id?: string;
  };
  /**
   * 卖方表单
   * seller.reviewPhotos
   */
  seller?: object;
  /**
   * 过户业务
   */
  transfer?: {
    /**
     * [同 transfer.bussiness.id]
     */
    clouduser?: string;
    /**
     * [同 transfer.bussiness.id]
     */
    id?: string;
  };
  /**
   * 卖方表单
   * buyer.reviewPhotos
   */
  buyer?: object;
  /**
   * 业务对象标识<list>
   *     ids       <prejudication.id>  预审时
   *     ids   	  <transfer.id>       过户时
   */
  tradeIds?: Array<string>;
}
