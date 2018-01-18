/**
 * Created by 10973 on 2018/1/16.
 */
import {IcCardmap} from './icCard'
import {Accountmap}from './account'

// ic卡绑卡模型对象
export  class FinanceBindmap{
  /**
   * ic卡
   */
  public  icCard: IcCardmap;

  /**
   * 所属账户
   */
  public  account:Accountmap;

}

