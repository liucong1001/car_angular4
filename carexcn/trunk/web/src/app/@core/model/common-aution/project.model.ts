
import {FilingInfoModel} from '../bussiness/filing.info.model';
import {MerchantModel} from '../bussiness/merchant.model';
import {commonAutionService} from "../../data/common-aution/project.service";


export  class commonAutionSale{

  public  saleProject:comomnAutionProject;

}

export  class comomnAutionProject{

  public id?:string;

  public cloudUser?:string;
  /**
   * 项目名称
   */
  public  name:string;
  /**
   * 商户
   */
  public merchant:MerchantModel;
  /**
   * 受托人
   */
  public filingPerson:FilingInfoModel;
  /**
   * 优惠方式
   */
  public  saleType: string;
  /**
   * 优惠率
   */
  public salePercent:string;


}
