/**
 * 市场业务费用模型
 */
export class Marketfeemap {

  public id: string;
  /**
   * 费用名
   */
  public name: string;
  /**
   * 代号
   */
  public cloudUser: string;
  /**
   * 备注
   */
  public memo: string;
  /**
   * 业务类型
   */
  public businessType: any;
  /**
   * 费用金额
   */
  public money: number;
  /**
   * 是否计入开票
   */
  public invoice: any;
  /**
   * 是否考虑折扣
   */
  public discount: any;
  /**
   * 是否必选
   */
  public required: any;
  /**
   * 价格类型
   */
  public priceType: any;

}
