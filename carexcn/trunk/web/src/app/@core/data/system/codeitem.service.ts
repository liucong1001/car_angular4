import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Codeitem} from '../../model/system/codeitem';
import {RestService} from '../../utils/rest.service';

@Injectable()
export class CodeitemService {
  path = '/rest/sys/codeitem';
  private codemapTemplateObj: any = {};
  private codemapTemplateData: any = {};
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

  /**
   * 获取代码类目子集，需要实体数据的情况
   * @param {string} codemap
   * @returns {Promise<any>}
   */
  public list(codemap: string): Promise<any> {
    const url = `${this.path}/convert/${codemap}`;
    let _return: Promise<any>;
    if (this.codemapTemplateObj[codemap]) {
      _return = this.codemapTemplateObj[codemap];
    } else {
      _return = this.codemapTemplateObj[codemap] = this.rest.get(url).map(res => {
        // 将map数据转换为包含实体数据的数组
        let _result = [];
        for (let key in res) {
          if (res[key]) {
            _result.push(res[key]);
          }
        }
        return _result;
      }).toPromise();
    }
    return _return;
  }

  /**
   * 代码转换
   * @param {string} codemap
   * @returns {Promise<any>}
   */
  public convert(codemap: string): Promise<any> {
    const url = `${this.path}/convert/${codemap}`;
    let _return: Promise<any>;
    if (this.codemapTemplateData[codemap]) {
      _return = this.codemapTemplateData[codemap];
    } else {
      _return = this.codemapTemplateData[codemap] = this.rest.get(url).map(res => {
        let _map = {};
        for (let key in res) {
          if (res[key]) {
            let _v_code = res[key]['code'];
            let _v_value = res[key]['name'];
            _map[_v_code] = _v_value;
          }
        }
        return _map;
      }).toPromise();
    }
    return _return;
  }
}
