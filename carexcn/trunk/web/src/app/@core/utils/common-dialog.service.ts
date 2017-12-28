import { Injectable } from '@angular/core';

/**
 * 确认对话框服务
 */
@Injectable()
export class CommonDialogService {

  constructor() {
  }

  public confirm(content: string): Promise<any> {
    return new Promise<boolean>((res, rej) => {
      if (confirm(content)) {
        res();
      }else {
        rej();
      }
    });
  }
}
