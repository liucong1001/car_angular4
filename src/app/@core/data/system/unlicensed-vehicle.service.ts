import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UnlicensedVehiclemap} from "../../model/system/unlicensed-vehicle";
import {promise} from "selenium-webdriver";

@Injectable()
export class UnlicensedVehicleService {
  private path = '/rest/vehicle/unlicensed';

  constructor(private http: Http) {

  }

  /**
   * 添加问题车辆
   * @param model
   * @returns {Promise<UnlicensedVehiclemap>}
   */
  public save(model): Promise<UnlicensedVehiclemap> {
    const url = `${this.path}/create`;
    return this.http.post(url, model).toPromise().then((res) => res.json() as UnlicensedVehiclemap);
  }

  /**
   * 根据id查询问题车辆
   * @param {String} id
   * @returns {Promise<UnlicensedVehiclemap>}
   */
  public get(id: String): Promise<UnlicensedVehiclemap> {
    const url = `${this.path}/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as UnlicensedVehiclemap;
    })
  }

  public update(model): Promise<UnlicensedVehiclemap> {
    const url = `${this.path}/update`;
    return this.http.put(url, model).toPromise().then(function (res) {
      return res.json() as UnlicensedVehiclemap;
    });
  }

  public delete(id: String){
    const url = `${this.path}/delete/${id}`;
    return this.http.delete(url).toPromise().then(function (res) {
    });
  }


}
