import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Codemap} from '../../model/system/codemap';

@Injectable()
export class CodeService {
  private path = '/rest/sys/codemap';
  constructor(private http: Http) {
  }

  /**
   * 保存代码集
   * @param model
   * @returns {Promise<Codemap>}
   */
  public save(model): Promise<Codemap> {
    return this.http.post(this.path, model).toPromise().then((res) => res.json() as Codemap);
  }

  /**
   * 根据ID获取代码集
   * @param {String} id
   * @returns {Promise<Codemap>}
   */
  public get(id: String): Promise<Codemap> {
    const url = `${this.path}/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Codemap;
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
