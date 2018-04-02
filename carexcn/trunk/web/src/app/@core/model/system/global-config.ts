/**
 * 市场配置实体
 */
export class GlobalConfig {
  public id: string;
  /**
   * 发票管理模式 1 - 所有用户使用同一发票号段 2 - 每个用户使用不同发票号段
   */
  public invoiceManagerMode: string;
  /**
   * 车牌号前缀
   */
  public plateNumberPrefix: string;
  /**
   * 格式化金额 100,000,000
   */
  public printFormatAmount: boolean;
  /**
   * 数字金额前缀，如: ￥
   */
  public printAmountPrefix: string;
  /**
   * 市场开户账号
   */
  public printMarketAccount: string;
  /**
   * 市场地址
   */
  public printMarketAddress: string;
  /**
   * 市场名称
   */
  public printMarketName: string;
  /**
   * 市场纳税人识别号
   */
  public printMarketTaxNo: string;
  /**
   * 市场联系电话
   */
  public printMarketPhone: string;
  /**
   * 开票人姓名 为空时不打印 为*时打印当前用户姓名 其他直接打印
   */
  public printOpener: string;
  /**
   * 备注脚本
   */
  public printMemoScript: string;
  /**
   * 打印卖买双方电话
   */
  public printPhone: string;
  /**
   * 汉字金额前缀
   */
  public printAmountPrefixCN: string;
  /**
   * 扫码的类型（1：一维码:2：二维码）
   */
  public dimensional: string;
  /**
   * 市场代码
   */
  public cloudUser: string;
}
