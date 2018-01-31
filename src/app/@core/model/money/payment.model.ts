//  缴费订单---费用明细
export class BusinessObjectPaymentInfo {
  /**
   * 费用类型标识
   */
  public feeType: string;
  /**
   * 应收金额
   */
  public shouldAmount: number;
  /**
   * 是否计入开票
   */
  public invoice: string;
  /**
   * 业务类型
   */
  public businessType: string;

  /**
   * 流水号(方便列表显示)
   */
  public archiveNo?: string;

  /**
   * 账户名称(方便列表显示)
   */
  public accountName?:string;
}
//缴费订单---单条缴费总金额
export class BusinessObjectPayment {
  public id?:string;
  /**
   * 业务对象标识
   */
  public businessObjectId?: string;
  /**
   * 应收金额
   */
  public shouldAmount: number;
  /**
   * 流水号
   */
  public archiveNo: string;
  /**
   * 账户名称
   */
  public accountName:string;
  /**
   * 完成状态
   */
  public finishType?:string;

}
//缴费订单---单条缴费对象
export  class  PayOrderItemForm{
  /**
   * 费用总集合
   */
  public items : any[];
  /**
   * 费用总计算
   */
  public  payment:BusinessObjectPayment;
}


//缴费订单--订单
export class PayOrderForm {
  /**
   * 应收金额
   */
  public shouldAmount: number;

  /**
   * 实收金额
   */
  public actualAmount: number;
  /**
   * 账户id
   */
  public accountId: string;

  public items: any[];
}


