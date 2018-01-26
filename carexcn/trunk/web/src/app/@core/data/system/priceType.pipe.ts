import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'priceTypePipe'})
export class PriceTypePipe implements PipeTransform {
  transform(value: any, exponent: any) {
    // return value.repeat(times);
    let res = '';
     switch (value){
       case '01':res = '固定'; break;
       case '02':res = '可选'; break;
       case '03':res = '计算'; break;
       case '04':res = '手填'; break;
     }

    return res;
  }
}
