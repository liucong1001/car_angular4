import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Codeitem} from '../../model/system/codeitem';

@Injectable()
export class CodeitemService {
  path = '/rest/sys/codeitem';
  constructor(private http: Http) {
  }
  /**
   * 保存代码项
   * @param model
   * @returns {Promise<Codeitem>}
   */
  public save(model): Promise<Codeitem> {
    return this.http.post(this.path, model).toPromise().then((res) => res.json() as Codeitem);
  }


  /**
   * 删除代码集
   * @param {String} id
   * @returns {Promise<any>}
   */
  public remove(codemap: String, code: string): Promise<any> {
    const url = `${this.path}?codemap=${codemap}&code=${code}`;
    return this.http.delete(url).toPromise();
  }
}
