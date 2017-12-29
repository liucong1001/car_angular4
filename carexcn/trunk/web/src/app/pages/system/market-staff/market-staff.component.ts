import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Column} from '../../../@core/ui/table/table.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {CommonDialogService} from '../../../@core/utils/common-dialog.service';
import {MessageService} from '../../../@core/utils/message.service';
import {MarketStaffService} from '../../../@core/data/system/market-staff.service';

/**
 * 市场员工管理组件
 */
@Component({
  selector: 'ngx-market-staff',
  templateUrl: './market-staff.component.html',
  styleUrls: ['./market-staff.component.scss'],
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
export class MarketStaffComponent implements OnInit {

  constructor(private commonDialog: CommonDialogService, private message: MessageService, private staffService: MarketStaffService) { }
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
      {title: '员工姓名', titleClass: '', cell: new TextCell('userName')} as Column,
      {title: '登录ID', titleClass: '', cell: new TextCell('loginName')} as Column,
      {title: '市场', titleClass: '', cell: new TextCell('market.name')} as Column,
      {title: '岗位', titleClass: '', cell: new CodemapCell('position', 'staffPosition')} as Column,
      {title: '状态', titleClass: '', cell: new CustomCell(this.statusCell)} as Column,
      {title: '操作', titleClass: '', cell: new MenuCell([
          new Menu('查看', '', 'edit/:id'),
       ])},
    ];
  }

  changeStatus(row) {
    if (row.status === '1') {
      this.commonDialog.confirm(`确认要停用${row.userName}登录权限吗？`).then(ret => {
        return this.staffService.disable(row.id);
      }).then(ret => {
        row.status = ret.status;
        this.message.success('成功', '禁用成功！');
      }).catch(err => {
        this.message.error('失败', err.message);
      });
    }else if (row.status === '0') {
      this.commonDialog.confirm(`确认要重新启用${row.userName}登录权限吗？`).then(ret => {
        return this.staffService.enable(row.id);
      }).then(ret => {
        row.status = ret.status;
        this.message.success('成功', '禁用成功！');
      }).catch(err => {
        this.message.error('失败', err.message);
      });
    }
  }
}
