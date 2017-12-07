export class Page {
  public page = 0;
  public pageSize = 10;
}
export class Sort {
  direction = 'asc';
  property;
}
export class PageContent {
  last: boolean;
  first: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  numberOfElements: number;
  content: object[];
}
