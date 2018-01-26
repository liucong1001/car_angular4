import {BusinessObjectPayment} from './payment.model'
/**
 * 订单对象
 */
export class paymentOrderModel{

     public  id:string;

     public actualAmount?:number;

     public  shouldAmount?:number;

     public business:{
       id:string;
       archiveNo?:string;
       businessType?:string;
     }
     public businessObjectPayments:BusinessObjectPayment[];

}

/**
 * 订单缴费对象
 */
export class paymentOrderPayModel{
  /**
   * 0-不是代付 1-是代付
   */
  public paymentStatus?:number;

  /**
   * 支付方式 0-IC卡 1-现金
   */
  public payStatus:string;

  /**
   * 实际支付金额
   */
  public payAmount:number;
  /**
   * 支付的IC卡卡号
   */
  public  payIcCard :string;

  /**
   * 缴费的业务ID号
   */
  public  businessID:string;
  /**
   * 缴费的订单的订单ID
   */
  public  payOrderId:string;
  /**
   * 支付密码
   */
  public passWord?:string;

  /**
   * 市场编号
   */
  public  cloudUser?:string;

}
