import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Codeitem} from '../../model/system/codeitem';
import {RestService} from '../../utils/rest.service';

@Injectable()
export class CodeitemService {
  path = '/rest/sys/codeitem';
  private codemapTemplateData: Array<Array<string>> = [];
  constructor(private http: Http, private rest: RestService) {
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
  public remove(codemap: string, code: string): Promise<any> {
    const url = `${this.path}?codemap=${codemap}&code=${code}`;
    return this.http.delete(url).toPromise();
  }

  public convert(codemap: string): Promise<any> {
    const url = `${this.path}/convert/${codemap}`;
    let _return: Promise<any>;
    if (undefined !== this.codemapTemplateData && undefined !== this.codemapTemplateData[codemap]) {
      _return = Promise.resolve(this.codemapTemplateData[codemap]);
    } else {
      _return = this.rest.get(url).toPromise().then(res => {
        for (let key in res) {
          let _v_codemap = res[key]['codemap'];
          let _v_code = res[key]['code'];
          let _v_value = res[key]['value'];
          if (this.codemapTemplateData[_v_codemap]) {
            this.codemapTemplateData[_v_codemap][_v_code] = _v_value;
          } else {
            this.codemapTemplateData[_v_codemap] = [];
            this.codemapTemplateData[_v_codemap][_v_code] = _v_value;
          }
        }
        return this.codemapTemplateData[codemap];
      });
    }
    return _return;
  }
}
