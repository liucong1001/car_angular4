/**
 * 代码维护组件
 */
import {Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {visibilityToggle} from '../../../@core/ui/animations/toggle.animation';

@Component({
  selector: 'ngx-code',
  templateUrl: './code.component.html',
  styleUrls: [],
  styles: [`
        form{
          overflow: hidden;
        }
    `,
  ],
  // 定义动画
  animations: [
    visibilityToggle,
  ],
})
export class CodeComponent implements OnInit, OnChanges {
  visibility = 'hidden';
  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  // ngOnChanges 可监控组件变量
  ngOnChanges(changes: SimpleChanges): void {
  }
  // 组件初始华
  ngOnInit(): void {
  }
  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] = [
    {title: '代码集', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '描述', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        // new Menu('编辑', '', 'edit'),
      ],
      new Menu('编辑', '', 'edit'), 'text-center',
    )} as Column,
  ];

}
