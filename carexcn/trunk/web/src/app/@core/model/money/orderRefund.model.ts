/**
 * 订单退费模型对象
 */
export  class OrderRefund{
  /**
   * ic卡密码
   */
  public  password?:string;

  /**
   * ic卡号
   */
  public icCardNo?:string;
  /**
   * 对应的流水号id
    */
  public paymentId:string;

  /**
   * 对款方式（0：ic卡，1：现金）
   */
  public payStatus:string;
}
