import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Rolemap} from '../../model/system/role';

@Injectable()
export class RoleService {
  private path = '/rest/sys/role';
  constructor(private http: Http) {
  }

  /**
   * 保存角色
   * @param model
   * @returns {Promise<TResult2|Rolemap>}
   */

  public save(model): Promise<Rolemap> {
    return this.http.post(this.path, model).toPromise().then((res) => res.json() as Rolemap);
  }

  /**
   * 根据id获取信息
   * @param id
   * @returns {Promise<TResult2|Rolemap>}
   */

  public get(id: String): Promise<Rolemap> {
    const url = `${this.path}/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Rolemap;
    });
  }

  /**
   * 修改保存
   * @param model
   * @returns {Promise<TResult2|Rolemap>}
   */

  public saveEdit(model): Promise<Rolemap> {
    return this.http.put(this.path, model).toPromise().then((res) => res.json() as Rolemap);
  }



}
