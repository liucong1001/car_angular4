import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {car, cars} from './car.data';
import {of} from 'rxjs/observable/of';

@Injectable()
export class CarService {
  getCars(): Observable<car[]> {
    return of(cars).delay(500);
  }
}
