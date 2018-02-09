import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {comomnAutionProject,commonAutionSale} from '../../model/common-aution/project.model';
import {promise} from "selenium-webdriver";
import {commonAutionCar} from '../../model/common-aution/car.model';

@Injectable()
export class commonAutionService {
  private path = '/rest/business/trade/sales';
  constructor(private http: Http) {
  }



  /**
   * 创建拍卖项目
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public saveProject(model: commonAutionSale): Promise<any> {
    const url =  `${this.path}/create`;
    return this.http.post(url, model).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 创建车辆
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public saveCar(model:commonAutionCar):Promise<any>{
    const url =  `${this.path}/savecar`;
    return  this.http.post(url,model).toPromise().then(function (res) {
       return res.json() as any;
    })
  }

  /**
   * 获取公车项目信息
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */
  public getProjectInfo(id:string):Promise<any>{
    const url = `${this.path}/findById/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
       return res.json() as commonAutionSale;
    })
  }

  /**
   * 修改拍卖项目
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public editCar(model:commonAutionCar):Promise<any>{
    const url =  `${this.path}/updateProject`;
    return  this.http.put(url,model).toPromise().then(function (res) {
      return res.json() as any;
    })
  }



}
