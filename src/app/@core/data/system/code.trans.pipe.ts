import { Pipe, PipeTransform } from '@angular/core';
import {CodeitemService} from './codeitem.service';

@Pipe({name: 'code_trans'})
export class CodeTransPipe implements PipeTransform {
  constructor(private codeitem: CodeitemService) {
  }
  /**
   * 管道服务 code_trans
   * @param {string} code
   * @param {string} codeMap
   * @returns {Promise<string>}
   */
  transform(code: string, codeMap: string): Promise<string> {
    return this.codeitem.convert(codeMap).then((res) => {
      return res[code];
    });
  }
}
