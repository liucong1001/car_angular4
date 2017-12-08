import {Injectable, isDevMode} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CarModel} from '../../model/bussiness/car.model';
import {Http} from '@angular/http';
import 'rxjs/add/observable/of';

@Injectable()
export class CarService {
  constructor(private http: Http) {
  }
  private api_url_base = 'rest/car/';
  private cars: CarModel[] = [{
    lsnum: '鄂A09001',
  }, {
    lsnum: '鄂A09002',
  }, {
    lsnum: '鄂A09003',
  }, {
    lsnum: '鄂A09004',
  }, {
    lsnum: '鄂A09005',
  }, {
    lsnum: '鄂A09006',
  }, {
    lsnum: '鄂A09007',
  }, {
    lsnum: '鄂A09008',
  }, {
    lsnum: '鄂A09009',
  }, {
    lsnum: '鄂A09010',
  }];
  private car: CarModel = {
    lsnum: '',
  };

  /**
   * getCars 的 Observable 写法
   */
  _getCars(cid: string): Observable<CarModel[]> {
    let result: Observable<CarModel[]>;
    if (isDevMode()) {
      result = Observable.of<CarModel[]>(this.cars);
    } else {
      result = this.http
        .get(this.api_url_base + cid)
        .map(response => response.json().data as CarModel[]);
    }
    return result;
  }
  /**
   * getCar 的 Observable 写法
   */
  _getCar(id: string): Observable<CarModel> {
    let result: Observable<CarModel>;
    if (isDevMode()) {
      result = Observable.of<CarModel>(this.car);
    } else {
      result = this.http
        .get(this.api_url_base + id)
        .map(response => response.json().data as CarModel);
    }
    return result;
  }
  /**
   * 批量业务拿到指定批次的所有车辆
   */
  getCars(cid: string): Promise<CarModel[]> {
    let result: Promise<CarModel[]>;
    if (isDevMode()) {
      result = Promise.resolve(this.cars).then((res) => res as CarModel[]);
    } else {
      result = this.http.get(this.api_url_base + 'cid/' + cid).toPromise().then((res) => res.json() as CarModel[]);
    }
    return result;
  }

  /**
   * 获取某辆已添加车的数据
   */
  getCar(id: string): Promise<CarModel> {
    let result: Promise<CarModel>;
    if (isDevMode()) {
      result = Promise.resolve(this.car).then((res) => res as CarModel);
    } else {
      result = this.http.get(this.api_url_base + '' + id).toPromise().then((res) => res.json() as CarModel);
    }
    return result;
  }
}
