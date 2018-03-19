import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class LoggingService {
  log(error) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    if (error instanceof HttpErrorResponse) {
      console.error(localISOTime, 'Error[HTTP]:', error.message, 'HTTP Status Code:', (<HttpErrorResponse>error).status);
    } else if (error instanceof TypeError) {
      console.error(localISOTime, 'Error[Type]:', error.message);
    } else if (error instanceof Error) {
      console.error(localISOTime, 'Error[General]:', error.message);
    } else {
      console.error(localISOTime, 'Error[Unknown]:', error.message);
    }
  }
}
