import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import {FileSystemService} from '../../../@core/data/system/file-system.service';
import {MessageService} from '../../../@core/utils/message.service';
import {BusinessTradeForm} from '../../../@core/model/business/restruct/business.trade.form';

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
    private _message: MessageService,
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
      // {title: '预审', titleClass: 'w-15 text-center', cell: new MenuCell(
      //     [
      //       new Menu('录入', '', this.prejudication.bind(this), this.showPrejudication.bind(this)),
      //     ],
      //     new Menu('.', '', this.review.bind(this), '', this.showPrejudicationState.bind(this)), 'text-center',
      //   )
      // } as Column,
      {title: '预审', titleClass: '', cell: new CodemapCell('prejudication.status', 'tradeDataStatus')} as Column,
      // {title: '过户', titleClass: 'w-15 text-center', cell: new MenuCell(
      //     [
      //       new Menu('录入', '', this.transfer.bind(this), this.showTransfer.bind(this)),
      //     ],
      //     new Menu('.', '', this.review.bind(this), '', this.showTransferState.bind(this)), 'text-center',
      //   )
      // } as Column,
      {title: '过户', titleClass: '', cell: new CodemapCell('transfer.status', 'tradeDataStatus')} as Column,
      {
        title: '', titleClass: 'w-15 text-center', cell: new MenuCell(
          [],
          new Menu('预览', '', this.view.bind(this)), 'text-center',
        ),
      } as Column,
      {
        title: '', titleClass: 'w-15 text-center', cell: new MenuCell(
          [
            new Menu('解锁买家', '', this.unlockBuyer.bind(this), this.showUnlockBuyer.bind(this)),
            new Menu('解锁卖家', '', this.unlockSeller.bind(this), this.showUnlockSeller.bind(this)),
          ],
          new Menu('录入', '', this.review.bind(this), '', this.getRecordingText.bind(this)), 'text-center',
        ),
      } as Column,
    ];
  }

  /**
   * 待录入状态
   * 只有此状态才可进行录入操作
   * @type {string}
   */
  private continueRecordStatus = '03';
  /**
   * 录入中状态
   * 只有此状态才可进行录入操作
   * @type {string}
   */
  private recordingStatus = '04';

  /**
   * 菜单文字过滤器
   * @param {BusinessTradeForm} row
   * @param {string} text
   * @returns {string}
   */
  private getRecordingText(row: BusinessTradeForm, text?: string) {
    if ( row.transfer && this.continueRecordStatus === row.transfer.status ) {
      return '过户录入';
    } else if (this.continueRecordStatus === row.prejudication.status) {
      return '预审录入';
    } else {
      return '不可录入';
    }
  }

  /**
   * 卖家解锁按钮是否显示
   * @param row
   * @param {string} text
   * @returns {boolean}
   */
  private showUnlockSeller(row: BusinessTradeForm, text?: string) {
    return row.transfer ? this.recordingStatus === row.transfer.status : false;
  }

  /**
   * 买家解锁按钮是否显示
   * @param row
   * @param {string} text
   * @returns {boolean}
   */
  private showUnlockBuyer(row: BusinessTradeForm, text?: string) {
    return row.transfer ? this.recordingStatus === row.transfer.status : false;
  }

  view(row: BusinessTradeForm, drop: any) {
    this.router.navigate(['/pages/business/mobile-recording/review', {archiveNo: row.archiveNo, view: 1}]);
  }

  /**
   * 解锁买家的操作
   * @param row
   */
  private unlockBuyer(row: BusinessTradeForm) {
    console.info(row);
  }

  /**
   * 解锁卖家的操作
   * @param row
   */
  private unlockSeller(row: BusinessTradeForm) {
    console.info(row);
  }
  @ViewChild('TypeCell')  TypeCell: TemplateRef<any>;
  // 列表搜索条件对象
  public filter: any = {};
  // 列表列定义
  public columns: Column[] ;

  /**
   * 进行预览的操作
   * 预览无问题才能进行录入操作
   * @param row
   */
  public review(row: BusinessTradeForm) {
    if (this.continueRecordStatus === row.transfer.status || this.continueRecordStatus === row.prejudication.status) {
      this._message.info('缺省', '发送录入中的状态请求');
      this.router.navigate(['/pages/business/mobile-recording/review', {archiveNo: row.archiveNo}]);
    } else {
      this._message.warning('操作无效', '当前不可进行录入操作');
    }
  }
  public object(data) {
    if (Object.keys(data).length === 0) {
      return true;
    }
  }
}
