
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

}
