import {BusinessObjectPayment} from "./payment.model";

// BusinessObjectPayment
/**
 * 退票模型对象
 */
export class BillRefund {

  public id:string;

  public cloudUser:string;

  public businessObjectId:string;

  public businessObjectPayment:BusinessObjectPayment;
  /*退款方式*/
  public payStatus:string;

  public payment:BusinessObjectPayment;

}
