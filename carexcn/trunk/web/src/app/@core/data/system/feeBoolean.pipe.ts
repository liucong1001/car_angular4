import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'feeBooleanPipe'})
export class FeeBooleanPipe implements PipeTransform {
  transform(value: any, exponent: any) {
    // return value.repeat(times);
    let res = '';
    switch (value){
      case '0':res = '否'; break;
      case '1':res = '是'; break;
    }

    return res;
  }
}
