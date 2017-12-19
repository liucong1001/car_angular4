import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {CardModel} from '../../model/bussiness/card.model';
import 'rxjs/add/observable/of';

@Injectable()  /*装饰器,记下本服务的元数据*/
export class IcCardServise {
  constructor(private http: Http) {}
  private api_url_base = '/detail/';
  private cards: CardModel[] = [{
    number: '11111111111',
    num: 'a001',
  }, {
    number: '22222222222',
    num: 'a002',
  }, {
    number: '33333333333',
    num: 'a003',
  }, {
    number: '44444444444',
    num: 'a004',
  }, {
    number: '55555555555',
    num: 'a005',
  }, {
    number: '66666666666',
    num: 'a006',
  }];
  private card: CardModel = {
    number: '',
    num: '',
  };
  /*获取IC卡信息*/
  getCard(): Promise<CardModel> {
    let result: Promise<CardModel>;
    if (isDevMode()) {
      result = Promise.resolve(this.card).then((res) => res as CardModel);
    }else {
      result = this.http.get(this.api_url_base).toPromise().then((res) => res.json() as CardModel);
    }
    return result;
  }
}
