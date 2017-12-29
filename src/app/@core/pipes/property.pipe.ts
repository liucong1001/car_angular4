import { Pipe, PipeTransform } from '@angular/core';

/**
 * 获取属性
 */
@Pipe({
  name: 'getProperty',
})
export class PropertyPipe implements PipeTransform {
  transform(property: any, object?: any): any {
    return this.getData(object, property);
  }

  getData(d: any, key: string) {
    const dotIdx = key.indexOf('.');
    let props = key;
    if (dotIdx > 1) {
      props = key.substring(0, dotIdx);
    }
    const ret = d[props];
    if (ret === undefined || ret === null || dotIdx < 1) {
      return ret;
    }
    return this.getData(ret, key.substring(dotIdx + 1));
  }
}
