import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import {FileSystemService} from '../../../@core/data/system/file-system.service';
// FileSystemService

@Component({
  selector: 'ngx-ys-mobile-recording',
  templateUrl: './mobile-recording.component.html',
  styleUrls: ['./mobile-recording.component.scss'],
})
export class MobileRecordingComponent implements OnInit {

  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
  }

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private file: FileSystemService,
  ) { }

  ngOnInit() {
    // this.filter.preStatusList='12';
    this.columns = [
      {title: '流水号', titleClass: '', cell: new TextCell('archiveNo')} as Column,
      {title: '车牌号', titleClass: '', cell: new TextCell('preVehicle.preVehicle.plateNumber')} as Column,
      {title: '里程(公里)', titleClass: '', cell: new TextCell('preVehicle.preVehicle.mileage')} as Column,
      {title: '状态', titleClass: '', cell: new CodemapCell('prejudicationStatus', 'prejudicationStatus')} as Column,
      {title: '类型(卖方|买方)', titleClass: 'w-15 text-center', cell: new CustomCell(this.TypeCell)} as Column,
      {title: '商户', titleClass: '', cell: new TextCell('preVehicle.preVehicle.merchant.name')} as Column,
      {title: '录入', titleClass: 'w-15 text-center', cell: new MenuCell(
        [
          new Menu('预审', '', this.yushen.bind(this)),
          new Menu('过户', '', this.guohu.bind(this)),
        ],
        new Menu('录入', '', this.review.bind(this)), 'text-center',
      )} as Column,
      {title: '解锁', titleClass: 'w-15 text-center', cell: new MenuCell(
          [
            new Menu('买家', '', this.yushen.bind(this)),
            new Menu('卖家', '', this.guohu.bind(this)),
          ],
          new Menu('解锁', '', this.view), 'text-center',
        )} as Column,
    ];
  }

  /**
   * 这里是伪代码
   * @param row
   * @param drop
   */
  view(row: any, drop: any) {
  }

  /**
   * 这里是伪代码
   * @param row
   */
  yushen(row: any) {
    console.info(row);
  }

  /**
   * 这里是伪代码
   * @param row
   */
  guohu(row: any) {
    console.info(row);
  }
  @ViewChild('TypeCell')  TypeCell: TemplateRef<any>;
  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] ;
  review(row: any) {
    this.router.navigate( ['/pages/business/mobile-recording/review', { archiveNo: row.archiveNo }]);
  }
  object(data) {
      if (Object.keys(data).length === 0) {
        return true;
      }
  }
}
