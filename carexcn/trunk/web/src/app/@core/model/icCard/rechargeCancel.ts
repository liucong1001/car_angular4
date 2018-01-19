/**
 * ic卡充值撤销模型
 */
export  class rechargeCancelModel{
  /**
   * 账户名称
   */
    public  accountName:string;
  /**
   * 金额
    */
    public  amount:number;

    public  business :{
      id:string;
    };
  /**
   * 充值时间
   */
    public  date:Date;

    public cloudUser?:string;

    public give :number;

    public icCardNo:string;

    public payStatus?:string;

    public reason?:string;

    public recharge:number;
}
