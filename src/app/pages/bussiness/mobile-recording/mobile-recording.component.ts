import {Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {visibilityToggle} from "../../../@core/ui/animations/toggle.animation";

@Component({
  selector: 'ngx-ys-mobile-recording',
  templateUrl: './mobile-recording.component.html',
  styleUrls: ['./mobile-recording.component.scss'],
  // 定义动画
  animations: [
    visibilityToggle,
  ],
})
export class MobileRecordingComponent implements OnInit {


  visibility = 'hidden';
  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }

  constructor() { }

  ngOnInit() {
    // this.filter.preStatusList='12';
  }
  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] = [
    {title: '流水号', titleClass: '', cell: new TextCell('archiveNo')} as Column,
    {title: '车牌号', titleClass: '', cell: new TextCell('plateNumber')} as Column,
    {title: '里程(公里)', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '出售价', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '购买价', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '类型', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '商户', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        // new Menu('编辑', '', 'edit'),
      ],
      new Menu('编辑', '', 'edit'), 'text-center',
    )} as Column,
  ];


}
