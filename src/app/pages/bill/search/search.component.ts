import {Component, OnChanges, OnInit, SimpleChanges,TemplateRef,ViewChild } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import {ActivatedRoute, Router} from '@angular/router';
import {visibilityToggle} from "../../../@core/ui/animations/toggle.animation";

@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    visibilityToggle,
  ],
})
export class SearchComponent implements OnInit {

  visibility = 'hidden';
  showFilter = false;

  @ViewChild('createTimeCell') private createTimeCell: TemplateRef<any>;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  constructor(public router: Router,) { }

  ngOnInit(): void {
    this.columns =[
      {title: '流水号', titleClass: '', cell: new TextCell('archiveNo')} as Column,
      {title: '车牌号', titleClass: '', cell: new TextCell('preVehicle.preVehicle.plateNumber')} as Column,
      {title: '里程(公里)', titleClass: '', cell: new TextCell('preVehicle.preVehicle.mileage')} as Column,
      {title: '状态', titleClass: '', cell: new CodemapCell('prejudicationStatus', 'prejudicationStatus')} as Column,
      {title: '出售价', titleClass: '', cell: new TextCell('name')} as Column,
      // payCount 代开票 大于0就需要去开票 有票需要开     bills.bill.status 为02 可以去开票 然后bills里面id有值
      {title: '代开票', titleClass: '', cell: new TextCell('payCount')} as Column,
      {title: '开票状态', titleClass: '', cell: new TextCell('validCount')} as Column,
      {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          new Menu('开票', '', this.edit.bind(this)),

        ],
        new Menu('更多', '', this.view), 'text-center',
      )} as Column,

    ];
  }
  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] ;

  view(row: any, drop: any) {
  }
  edit(row: any) {
    this.router.navigate( ['/pages/system/market/market/edit', { id: row.id ,area:row.area}]);
  }

}
