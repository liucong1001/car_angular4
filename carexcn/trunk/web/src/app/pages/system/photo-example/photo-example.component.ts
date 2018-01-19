import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Column} from '../../../@core/ui/table/table.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {MessageService} from '../../../@core/utils/message.service';
import {MarketStaffService} from '../../../@core/data/system/market-staff.service';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'ngx-photo-example',
  templateUrl: './photo-example.component.html',
  styleUrls: ['./photo-example.component.scss'],
  // 定义动画
  animations: [
    trigger('visibilityChanged', [
      // state 控制不同的状态下对应的不同的样式
      state('shown' , style({ height: 'auto'})),
      state('hidden', style({ height: '0px',  opacity: '0'})),
      // transition 控制状态到状态以什么样的方式来进行转换
      transition('shown <=> hidden', [animate('100ms ease-in-out'), animate('100ms')] ),
    ]),
  ],
})
export class PhotoExampleComponent implements OnInit {

  constructor(public router: Router, private route: ActivatedRoute,) { }

  visibility = 'hidden';
  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  filter: any = {};

  @ViewChild('statusCell') private statusCell: TemplateRef<any>;

  columns: Column[];
  ngOnInit() {
    this.columns = [
      {title: '照片类型', titleClass: '', cell: new CodemapCell('photoType', 'photoType')} as Column,
      {title: '长宽比', titleClass: '', cell: new TextCell('scale')} as Column,
      // {title: '岗位', titleClass: '', cell: new CodemapCell('position', 'staffPosition')} as Column,
      // {title: '状态', titleClass: '', cell: new CustomCell(this.statusCell)} as Column,
      {title: '操作', titleClass: '', cell: new MenuCell([
          new Menu('编辑', '', this.edit.bind(this)),
        ],
        new Menu('查看', '', 'view/:id')),
      },
    ];
  }
  edit(row:any){
    this.router.navigate( ['/pages/system/photo-example/edit', { id: row.id }]);
  }



}
