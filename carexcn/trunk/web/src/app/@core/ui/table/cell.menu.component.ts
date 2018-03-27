/**
 * 菜单单元格
 */
import {Cell, CellComponent} from './cell';
import {Component, Input, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {isNullOrUndefined} from 'util';

export interface MenuOnClick {
  (row: any, drop?: any);
}

export class Menu {
  /**
   * 构建菜单结构
   * @param {string} text  显示菜单文字
   * @param {string} icon  菜单图标
   * @param {MenuOnClick | string} callback  菜单回调函数 或 跳转的URL[routerLink]
   * @param {MenuOnClick | string} show  是否显示该菜单项的可选判断条件
   * @param {MenuOnClick | string} cellFilter  对菜单显示文字进行过滤的回调函数
   */
  constructor(
    public text: string,
    public icon: string,
    public callback: MenuOnClick | string,
    public show?: MenuOnClick | string,
    public cellFilter?: MenuOnClick | null,
  ) {}
  public isCallback(): boolean {
    return typeof(this.callback) === 'function';
  }
  public isUrl(): boolean {
    return typeof(this.callback) === 'string';
  }
  public ifCellFilter(): boolean {
    return typeof(this.cellFilter) === 'function';
  }
}

export class MenuCell extends Cell {
  /**
   * 菜单定义
   * @param {Menu[]} menus 子菜单
   * @param {Menu} def 默认菜单
   */
  constructor(public menus: Menu[], public def?: Menu, public cellClass?: string) {
    super('MenuCell', cellClass);
  }
}

@Component({
  selector: 'ngx-menu-cell',
  providers: [NgbDropdownConfig],
  templateUrl: './cell.menu.component.html',
  styleUrls: ['cell.menu.component.scss'],
})
export class MenuCellComponent extends CellComponent implements OnInit {
  @Input() data: any;
  @Input() menus: Menu[];
  @Input() default: Menu;
  ngOnInit(): void {
    if (isNullOrUndefined(this.default)) {
      this.default =  new Menu('菜单', '', this.defaultClick);
    }
  }
  constructor(config: NgbDropdownConfig) {
    super();
    config.placement = 'bottom-right';
  }

  defaultClick(data, drop) {
    drop.open();
  }
}
