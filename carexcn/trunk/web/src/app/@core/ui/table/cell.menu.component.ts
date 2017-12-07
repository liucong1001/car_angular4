/**
 * 菜单单元格
 */
import {Cell, CellComponent} from './cell';
import {Component, Input, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'ngx-menu-cell',
  providers: [NgbDropdownConfig],
  templateUrl: './cell.menu.component.html',
  styleUrls: ['cell.menu.component.scss'],
})
export class MenuCellComponent extends CellComponent implements OnInit {
  ngOnInit(): void {
    if (isNullOrUndefined(this.default)) {
      this.default =  new Menu('菜单', '', this.defaultClick);
    }
  }

  @Input() data: any;
  @Input() menus: Menu[];
  @Input() default: Menu;
  constructor(config: NgbDropdownConfig) {
    super();
    config.placement = 'bottom-right';
  }

  defaultClick(data, drop) {
    drop.open();
  }
}

export class MenuCell extends Cell{
  /**
   * 菜单定义
   * @param {Menu[]} menus 子菜单
   * @param {Menu} def 默认菜单
   */
  constructor(public menus: Menu[], public def?: Menu, public cellClass?: string){
    super('MenuCell', cellClass);
  }
}

export class Menu {
  constructor(
    public text: string,
    public icon: string,
    public callback: MenuOnClick | string) {
  }
  public isCallback(): boolean {
    return typeof(this.callback) === 'function';
  }
  public isUrl(): boolean {
    return typeof(this.callback) === 'string';
  }
}

export interface MenuOnClick {
  (row: any, drop?: any);
}
