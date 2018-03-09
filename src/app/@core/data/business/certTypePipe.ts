/**
 * 根据证件类型判断是个人还是单位
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'certTypePipe'})
export class CertTypePipe implements PipeTransform {
  transform(value: any, exponent: any) {
    // return value.repeat(times);
    let res = '';
    switch (value){
      case '01':res = '单位'; break;
      case '02':res = '单位'; break;
      case '03':res = '个人'; break;
      case '04':res = '个人'; break;
      case '05':res = '个人'; break;
      case '06':res = '个人'; break;
      case '07':res = '个人'; break;
      case '08':res = '个人'; break;
      case '09':res = '个人'; break;
      case '10':res = '单位'; break;
      case '11':res = '单位'; break;
      case '12':res = '单位'; break;
      case '13':res = '单位'; break;
      case '14':res = '单位'; break;
      case '15':res = '单位'; break;
      case '27':res = '单位'; break;
    }

    return res;
  }
}
