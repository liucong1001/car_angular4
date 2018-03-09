import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'businessTypePipe'})
export class BusinessTypePipe implements PipeTransform {
  transform(value: any, exponent: any) {
    // return value.repeat(times);
    let res = '';
    switch (value){
      case '01':res = '预审'; break;
      case '02':res = '过户'; break;
      case '04':res = '充值'; break;
      case '05':res = '缴费订单'; break;
      case '06':res = '退款'; break;
      case '11':res = '开票'; break;
      case '12':res = '重开'; break;
      case '13':res = '换票'; break;
      case '14':res = '退票'; break;
      case '15':res = '开票补缴'; break;
    }

    return res;
  }
}
