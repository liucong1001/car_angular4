import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {comomnAutionProject,commonAutionSale} from '../../model/common-aution/project.model';
import {promise} from "selenium-webdriver";
import {commonAutionCar} from '../../model/common-aution/car.model';

@Injectable()
export class commonAutionCarService {
  private path = '/rest/business/trade/car';
  constructor(private http: Http) {
  }


  /**
   * 获取车辆详细信息
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */
  public getCarInfo(id:string):Promise<any>{
    const url = `${this.path}/findById/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    })
  }

  /**
   * 修改后保存车辆信息
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public  editCar(model:any):Promise<any>{
    const url =  `${this.path}/updateCar`;
    return  this.http.put(url,model).toPromise().then(function (res) {
      return res.json() as any;
    })
  }



}
