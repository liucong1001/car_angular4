import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Permissionmap} from '../../model/system/permissionmap';

@Injectable()
export class PermissionService {
  private path = '/rest/sys/perm';
  constructor(private http: Http) {
  }

  /**
   * 保存菜单信息
   * @param model
   * @returns {Promise<Permissionmap>}
   */
  public save(model): Promise<Permissionmap> {
    return this.http.post(this.path, model).toPromise().then((res) => res.json() as Permissionmap);
  }

  /**
   * 获取菜单信息
   * @param {String} id
   * @returns {Promise<Permissionmap>}
   */
  public get(id: String): Promise<Permissionmap[]> {
    const url = `${this.path}?parent.id=NULL`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Permissionmap[];
    });
  }

  /**
   * 删除菜单
   * @param {String} id
   * @returns {Promise<any>}
   */
  public remove(id: String): Promise<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url).toPromise();
  }
}
