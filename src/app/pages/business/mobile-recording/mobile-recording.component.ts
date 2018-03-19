import {Component, OnChanges, OnInit, SimpleChanges ,TemplateRef, ViewChild} from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {visibilityToggle} from "../../../@core/ui/animations/toggle.animation";
import {ActivatedRoute, Router} from '@angular/router';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import {FileSystemService} from "../../../@core/data/system/file-system.service";
// FileSystemService

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

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private file:FileSystemService,
  ) { }

  @ViewChild('disableSignTemp') private disableSignTemp: TemplateRef<any>;

  ngOnInit() {
    // this.filter.preStatusList='12';
    this.columns = [
      {title: '流水号', titleClass: '', cell: new TextCell('archiveNo')} as Column,
      {title: '车牌号', titleClass: '', cell: new TextCell('preVehicle.preVehicle.plateNumber')} as Column,
      {title: '里程(公里)', titleClass: '', cell: new TextCell('preVehicle.preVehicle.mileage')} as Column,
      // {title: '出售价', titleClass: '', cell: new TextCell('name')} as Column,
      // {title: '购买价', titleClass: '', cell: new TextCell('name')} as Column,
      {title: '状态', titleClass: '', cell: new CodemapCell('prejudicationStatus', 'prejudicationStatus')} as Column,
      {title: '类型(卖方|买方)', titleClass: 'w-15 text-center', cell:new CustomCell(this.TypeCell)} as Column,
      {title: '商户', titleClass: '', cell: new TextCell('preVehicle.preVehicle.merchant.name')} as Column,
      // {title: 'seller图片', titleClass: '', cell: new CustomCell(this.disableSignTemp)} as Column,
      {title: '操作', titleClass: 'w-15 text-center', cell: new MenuCell(
        [
        ],
        new Menu('预览', '', this.review.bind(this)), 'text-center',
      )} as Column,
    ];
  }
  private
  @ViewChild('TypeCell')  TypeCell: TemplateRef<any>;
  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] ;

  view(){

  }
  review(row:any){
    this.router.navigate( ['/pages/business/mobile-recording/review', { archiveNo: row.archiveNo }]);
  }

  object(data){
      if(Object.keys(data).length==0){
        return true
      }
  }



}
