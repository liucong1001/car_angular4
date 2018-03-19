import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {LoggingService} from './data/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
  ) { }
  handleError(error) {
    const logService = this.injector.get(LoggingService);
    // const message = error.message ? error.message : error.toString();
    // 日志服务，可能的情况下，自动记录到后台，供监测分析捕捉异常情况。
    // logService.log({ message });
    logService.log(error);
    // throw error;
  }
}
