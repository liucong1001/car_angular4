/**
 * rest服务基础类
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Page, PageContent, Sort} from '../model/page.model';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PagerService {
  get path(): string {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }
  private _path: string;


  constructor(private http: HttpClient) {
  }

  /**
   * 获取分页数据
   * @param {Page} page 分页数据
   * @param {Sort[]} sort 排序数据
   * @returns {Promise<PageContent>} 返回分页数据
   */
  getPage(page: Page, sort: Sort[], filter?: any): Promise<PageContent> {
    const params = {
      ...filter,
      'p:page': page.page,
      'p:size': page.pageSize,
    };
    return this.http.get(this._path, {params: params}).toPromise().then(res => {
      return res as PageContent;
    }).catch(err => {
      return Promise.reject(err);
    });
  }
}
