import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export   class BillService{

  constructor(private http: Http) {}
  private path = '/rest/business/trade/business';

  /**
   * 票据业务类型代码
   * 11:开票，12：重开，13：换票，14：退票，15：开票补缴，16提档退回
   *
   * 发票状态
   * 01：待缴费，02：待开票(已缴费)，03：已开票 ，04：待作废，05：已作废，06：已退费，07：待补缴
   */

  /**
   * 根据流水查询有效的票据列表
   * @param archiveNo
   * @returns {Promise<Response>}
   */
  public findValidBill(archiveNo: string):Promise<any>{
    const url = `${this.path}/bills`;
    return this.http.get(url + '?archiveNo=' + archiveNo).toPromise().then((res) => res.json() as any);
  }

  /**
   * 创建票据业务
   * @param type
   * @param archiveNo
   * @param billId
   * @returns {Promise<TResult2|TResult1>}
   */
  public createBill(type:string,archiveNo:string,srcBillId:string):Promise<any>{
    return this.http.post(this.path, {type:type,archiveNo:archiveNo,srcBillId:srcBillId}).toPromise().then((res) => res.json() as any);
  }

}
