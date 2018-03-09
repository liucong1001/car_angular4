import {AccountModel} from './../business/account.model';
/**
 * ic卡——充值对象
 */
export  class IcCardRechargemap{
  /**
   * 支付方式
    */
  public payStatus?:string;

  /**
   * ic卡号
   */
   public  icCardNo :string;
  /**
   * 总金额
   */
  public amount?:number;

  /**
   * 赠送部分金额
   */
  public give:number;

  /**
   * 充值部分金额
   */
  public  recharge:number;

  /**
   * ic卡号
   */
  // public iccardno:string;

  /**
   * cloudUser市场
   */
  public  cloudUser:string;

}
/**
 * ic卡-获取信息对象
 */
export  class icCardData{

  public icCardNo?:string;

  public cloudUser?:string;

  public  icAccount:{
    id?:string;
    /**
     * 账户余额
     */
     balance:number;

    /**
     * 充值金额
     */
     give?:number;

    /**
     * 赠送金额
     */
     recharge?:number;

     ownedAccount:AccountModel
  }

}
