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
      {title: '卖方类型', titleClass: 'w-15 text-center', cell: new CustomCell(this.TypeCell)} as Column,
      {title: '商户', titleClass: '', cell: new TextCell('preVehicle.preVehicle.merchant.name')} as Column,
      {title: '预审', titleClass: 'w-15 text-center', cell: new MenuCell(
          [
            new Menu('录入', '', this.prejudication.bind(this), this.showPrejudication.bind(this)),
          ],
          new Menu('.', '', this.review.bind(this), '', this.showPrejudicationState.bind(this)), 'text-center',
        )
      } as Column,
      {title: '过户', titleClass: 'w-15 text-center', cell: new MenuCell(
          [
            new Menu('录入', '', this.transfer.bind(this), this.showTransfer.bind(this)),
          ],
          new Menu('.', '', this.review.bind(this), '', this.showTransferState.bind(this)), 'text-center',
        )
      } as Column,
      {
        title: '解锁', titleClass: 'w-15 text-center', cell: new MenuCell(
          [
            new Menu('买家', '', this.unlockBuyer.bind(this)),
            new Menu('卖家', '', this.unlockSeller.bind(this)),
          ],
          new Menu('解锁', '', this.view), 'text-center',
        )
      } as Column,
    ];
  }

  /**
   * 交易状态
   * @type {{"01": string; "02": string; "03": string; "04": string; "05": string; "06": string; "07": string}}
   */
  public statusArr = {
    '01': '已录入', // 可以进行审核，其它状态不可以做审核操作
    '02': '已审核',
    '03': '已完成',
    '04': '已删除',
    '05': '待录入',
    '06': '录入中',
    '07': '已退回',
  };

  /**
   * 显示过户录入状态的文字
   * @param row
   * @param {string} text
   * @returns {any}
   */
  private showTransferState(row: any, text?: string) {
    return this.statusArr[row.transferStatus] ? this.statusArr[row.transferStatus] : "[未知状态:" + row.transferStatus + "]";
  }

  /**
   * 显示预审录入状态的文字
   * @param row
   * @param {string} text
   * @returns {any}
   */
  private showPrejudicationState(row: any, text?: string) {
    return this.statusArr[row.prejudicationStatus] ? this.statusArr[row.prejudicationStatus] : "[未知状态:" + row.prejudicationStatus + "]";
  }

  /**
   * 这里是伪代码
   * @param row
   * @param drop
   */
  view(row: any, drop: any) {
  }

  /**
   * 表格中点击预审操作
   * @param row
   */
  private prejudication(row: any) {
    console.info(row);
  }

  /**
   * 是否显示预审录入的操作按钮
   * @param row
   * @returns {boolean}
   */
  private showPrejudication(row: any): boolean {
    return '05' === row.prejudicationStatus;
  }

  /**
   * 表格中点击过户操作
   * @param row
   */
  private transfer(row: any) {
    console.info(row);
  }

  /**
   * 是否显示过户录入的操作按钮
   * @param row
   * @returns {boolean}
   */
  private showTransfer(row: any): boolean {
    return '05' === row.transferStatus;
  }
  /**
   * 解锁买家的操作
   * @param row
   */
  private unlockBuyer(row: any) {
    console.info(row);
  }

  /**
   * 解锁卖家的操作
   * @param row
   */
  private unlockSeller(row: any) {
    console.info(row);
  }
  @ViewChild('TypeCell')  TypeCell: TemplateRef<any>;
  // 列表搜索条件对象
  public filter: any = {};
  // 列表列定义
  public columns: Column[] ;
  public review(row: any) {
    this.router.navigate( ['/pages/business/mobile-recording/review', { archiveNo: row.archiveNo }]);
  }
  public object(data) {
    if (Object.keys(data).length === 0) {
      return true;
    }
  }
}
