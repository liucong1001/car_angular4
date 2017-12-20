import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {CardModel} from '../../model/bussiness/card.model';

@Injectable()
export class CardService {
  constructor(private http: Http) {}
  private api_url_base = 'rest/car/';
  private cards: CardModel[] = [
    {number: '100000', num: 'B00001'},
    {number: '200000', num: 'B00002'},
    {number: '300000', num: 'B00003'},
    {number: '400000', num: 'B00004'},
    {number: '500000', num: 'B00005'},
    {number: '600000', num: 'B00006'},
    {number: '700000', num: 'B00007'},
  ];
  public card: CardModel = {
    number: '',
    num: '',
  };
  getCards(cid: string): Promise<CardModel[]> {
    let result: Promise<CardModel[]>;
    if (isDevMode()) {
      result = Promise.resolve(this.cards).then((res) => res as CardModel[]);
    } else {
      result = this.http.get(this.api_url_base + 'cid/' + cid).toPromise().then((res) => res.json() as CardModel[]);
    }
    return result;
  }

}
