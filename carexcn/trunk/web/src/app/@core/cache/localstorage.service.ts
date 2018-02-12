import { Injectable } from '@angular/core';

/**
 * 本地缓存服务简单封装，为方便以后统一管理
 */
@Injectable()
export class LocalstorageService {
  constructor() {}
  get(key: string) {
    try {
      JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
    return JSON.parse(localStorage.getItem(key));
  }
  set(key: string, data: any) {
    if (data) {
      return localStorage.setItem(key, JSON.stringify(data));
    } else {
      return false;
    }
  }
  has(key: string) {
    return localStorage.getItem(key) !== null;
  }
  del(key: string) {
    return localStorage.removeItem(key);
  }
  clear() {
    return localStorage.clear();
  }
}
