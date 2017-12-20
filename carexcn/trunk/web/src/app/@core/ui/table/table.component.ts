import {
  Component, Input, OnInit,
} from '@angular/core';
import {Page, PageContent, Sort} from '../../model/page.model';
import {Cell} from './cell';
import {PagerService} from '../../data/pager.service';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  protected pageContent: PageContent = new PageContent();
  protected page: Page;
  protected sort: Sort[];
  protected pageService: PagerService;

  @Input() columns: Column[];
  @Input() pageSize = 10;
  @Input() filter = {};
  @Input() url: string;

  constructor(service: PagerService) {
    this.pageService = service;
  }

  ngOnInit(): void {
    this.pageService.path = this.url;
    this.page = new Page();
    this.page.pageSize = this.pageSize;
    this.page.page = 0;
    // alert
    this.reload();
  }

  public reload() {
    this.goto(0);
  }

  goto(page: number) {
    this.page.page = page;
    this.pageService.getPage(this.page, null, this.filter).then(result => {
      this.pageContent = result;
    }).catch(() => {
        this.pageContent = new PageContent();
      });
  }

  prev() {
    this.goto(this.page.page - 1 );
  }
  next() {
    this.goto(this.page.page + 1 );
  }

  pageButtons(): number[] {
    if (!this.pageContent || !this.pageContent.totalPages) {
      return [];
    }
    const btns: number[] = [];
    const total = this.pageContent.totalPages;
    let start = this.page.page;
    let size = 10;
    if (start < 1) {
      start = 1;
    }
    if (size + start > total + 1) {
      if (total < 10) {
        start = 1;
        size = total;
      }else {
        start = total - 10 + 1;
      }
    }

    for (let i = start; i < start + size; i++) {
      btns.push(i);
    }
    return btns;
  }
}

/**
 * 表格列头定义
 */
export class Column {
  /**
   * 列标题
   */
  title: string;
  /**
   * 列模板
   */
  cell: Cell;
  titleClass?: string;
}
