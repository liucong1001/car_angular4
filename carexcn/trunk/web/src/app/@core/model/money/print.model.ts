export class TradeBill {

  public archiveNo?: string;

  public plateNumber?: string;
  /**
   * 发票代码
   */
  public billCode?: string;
  /**
   * 发票号
   */
  public billNo?: string;
  /**
   * 发票日期
   */
  public billDate: Date;
  /**
   * 操作日期
   */
  public opDate: Date;
  /**
   * 发票状态:01-待缴费,02-待开票(已缴费),03-已开票,04-已作废,05-已退费
   */
  public status: string;
  /**
   * 有效状态:0-有效,1-无效
   */
  public invalid: string;

}
