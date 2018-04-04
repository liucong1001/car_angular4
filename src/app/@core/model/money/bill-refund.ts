/**
 * 退票模型对象
 */
import {BusinessObjectPayment} from "./payment.model";

export class BillRefund {

  public id:string;

  public cloudUser:string;

  public businessObjectId:string;

  public businessObjectPayment:BusinessObjectPayment;
  /*退款方式*/
  public payStatus:string;

  public payment:BusinessObjectPayment;
  /*业务类型*/
  public type:string;

}
/**
 * 退费对象
 */
export class BackPaymentForm{

  public icCardNo:string;

  public businessObjectBackPayment:BillRefund;

}
