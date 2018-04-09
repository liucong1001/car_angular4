import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Areamap} from '../../model/system/areamap';

@Injectable()
export class AreaService {
  private path = '/rest/sys/area';
  constructor(private http: Http) {
  }

  /**
   * 保存城市信息
   * @param model
   * @returns {Promise<Areamap>}
   */
  public save(model): Promise<Areamap> {
    return this.http.post(this.path, model).toPromise().then((res) => res.json() as Areamap);
  }

  /**
   * 获取城市信息
   * @param {String} id
   * @returns {Promise<Areamap>}
   */
  public get(id: String): Promise<Areamap[]> {
    const url = `${this.path}?parent.id=NULL`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Areamap[];
    });
  }

  /**
   * 删除代码集
   * @param {String} id
   * @returns {Promise<any>}
   */
  public remove(id: String): Promise<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url).toPromise();
  }
}
