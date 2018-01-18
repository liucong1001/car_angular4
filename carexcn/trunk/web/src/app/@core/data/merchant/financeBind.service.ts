import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class FinanceBindService {
  private path = '/rest/pay/iccard';
  constructor(private http: Http) {
  }

  /**
   * 保存城市信息
   * @param model
   * @returns {Promise<Areamap>}
   */
  public save(model): Promise<any> {
    const url = `${this.path}/bind`;
    return this.http.post(url, model).toPromise().then((res) => res.json() as any);
  }

}
