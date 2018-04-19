
import {Injectable, isDevMode} from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';

@Injectable()
export class ReportManageService {
  private path = '/rest/sys/batch';
  constructor(private http: Http) {
  }


  /**
   * 请求成功之后保存成excel文件（基本导出方法，请求成功之后调用）
   * @param data
   * @param name
   */
  public  saveExcel(data: Response,name:string){
    var a = document.createElement('a');
    var blob = new Blob([data], {'type':"application/vnd.ms-excel"});
    a.href = URL.createObjectURL(blob);
    a.download = name+".xls";
    a.click();
  }
  // vehicle  report

  public  down(startDate:String,endDate:String):Promise<any>{
     const url= `rest/report/export?startDate=`+startDate+'&endDate='+endDate;
      return this.http.get(url,{responseType: ResponseContentType.Blob}).toPromise().then(res=>{
        return res.json() as any;
      })
  }

  public businessExport(startDate:String,endDate:String):Promise<any>{
    const url= `rest/report/business/export?startDate=`+startDate+'&endDate='+endDate;
    return this.http.get(url,{responseType: ResponseContentType.Blob}).toPromise().then(res=>{
      return res.json() as any;
    })
  }
  /**
   * 各单位交易报表查询
   * @param startDate
   * @param endDate
   * @returns {any}
     */
  public queryMerchant(startDate:String,endDate:String):Promise<any>{
    const url = `rest/report/merchant?startDate=`+startDate+'&endDate='+endDate;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 二手车日交易报表查询
   * @param startDate
   * @param endDate
   * @returns {any}
     */
  public queryDay(startDate:String,endDate:String,arcNoType:String):Promise<any>{
    const url = `rest/report/day?startDate=`+startDate+'&endDate='+endDate+'&arcNoType='+arcNoType;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 月交易报表
   * @param year
   * @returns {any}
     */
  public queryMonth(year:String):Promise<any>{
    const url = `rest/report/month?year=`+year;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 年交易报表
   * @param year
   * @returns {any}
     */
  public queryYear(year:String):Promise<any>{
    const url = `rest/report/year?year=`+year;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 销售排行
   * @param startDate
   * @param endDate
   * @param arcNoType
   * @param size
     * @returns {any}
     */
  public salesRanking(startDate:String,endDate:String,size:String):Promise<any>{
    const url = `rest/report/sales/ranking?startDate=`+startDate+'&endDate='+endDate+'&size='+size;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 充值报表
   * @param startDate
   * @param endDate
   * @param code
   * @returns {any}
     */
  public rechargeReport(startDate:String,endDate:String,code:String):Promise<any>{
    const url = `rest/report/recharge?startDate=`+startDate+'&endDate='+endDate+'&code='+code;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 消费报表
   * @param startDate
   * @param endDate
   * @param code
   * @returns {any}
     */
  public receiveReport(startDate:String,endDate:String,code:String):Promise<any>{
    const url = `rest/report/receive?startDate=`+startDate+'&endDate='+endDate+'&code='+code;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }
}
