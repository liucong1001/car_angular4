/**
 *  市场差异配置
 */
export class marketDiffer{

  /**
   *  市场id
   */
  public marketId: string;

  /**
   * 市场配置差异信息 id
   */
  private marketDifferId: string ;

  /**
   *  是否需要委托人
   */
  public entrust: string;

  /**
   * 卖方是否需要价格
   */
  public sellerPrice: string;

  /**
   * 卖方是否需要里程
   */
  public sellerMileage: string;

  /**
   * 买方是否需要价格
   */
  public buyerPrice: string;

  /**
   * 是否需要图片
   */
  public picture: string;

}
