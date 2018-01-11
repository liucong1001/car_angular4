import { Injectable } from '@angular/core';

/**
 * 本地缓存服务简单封装，为方便以后统一管理
 */
@Injectable()
export class LocalstorageService {
  public prefix: string;
  constructor() {}
  // constructor(prefix: string) {
  //   this.prefix = prefix;
  // }
  get(key: string) {
    try {
      JSON.parse(localStorage.getItem(this.prefix + '_' + key));
    } catch (e) {
      return null;
    }
    return JSON.parse(localStorage.getItem(this.prefix + '_' + key));
  }
  set(key: string, data: any) {
    if (data) {
      return localStorage.setItem(this.prefix + '_' + key, JSON.stringify(data));
    } else {
      return false;
    }
  }
  has(key: string) {
    return localStorage.getItem(this.prefix + '_' + key) !== null;
  }
  del(key: string) {
    return localStorage.removeItem(this.prefix + '_' + key);
  }
  clear() {
    return localStorage.clear();
  }
}
