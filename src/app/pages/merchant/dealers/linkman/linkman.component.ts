import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Column, TableComponent} from '../../../../@core/ui/table/table.component';
import {FormBuilder} from '@angular/forms';
import {TextCell} from '../../../../@core/ui/table/cell.text.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Menu, MenuCell} from '../../../../@core/ui/table/cell.menu.component';
import {MessageService} from '../../../../@core/utils/message.service';
import {Location} from '@angular/common';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {MerchantService} from '../../../../@core/data/merchant/merchant.service';
import {CustomCell} from '../../../../@core/ui/table/cell';
import {CommonDialogService} from '../../../../@core/utils/common-dialog.service';
import {FilingService} from '../../../../@core/data/merchant/filing.service';

@Component({
  selector: 'ngx-linkman',
  templateUrl: './linkman.component.html',
  styleUrls: ['./linkman.component.scss'],
})
export class LinkmanComponent implements OnInit {

  /**
   * 搜索条件
   * @type {{}}
   */
  filter: any = {filingPerson: {}};
  @ViewChild('disableSignTemp') private disableSignTemp: TemplateRef<any>;
  /**
   * 列表组件实例
   */
  @ViewChild(TableComponent) itemList: TableComponent;
  /**
   * 列表列定义
   * @type {[Column , Column , Column]}
   */
  columns: Column[] = [];
  showFilter = false;
  visibility = 'hidden';
  merchantId = '';
  merchantName = '';
  photos: any[] = [{
    title: '',
    source: 'assets/images/camera1.jpg',
  }];
  /**
   * 构造方法，依赖服务注入
   * @param {CodeService} codeService 代码服务
   * @param {MessageService} message 消息服务
   * @param {FormBuilder} fb 表单工厂服务
   * @param {ActivatedRoute} route 当前路由服务
   */
  constructor(
    private commonDialog: CommonDialogService,
    private message: MessageService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private filingService: FilingService,
  ) {}
  /**
   * 初始化
   */
  ngOnInit(): void {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.merchantId = p.id;
        this.merchantService.get(p.id).then( res => {
          const _merchant = res.merchant as MerchantModel;
          this.merchantId = _merchant.id;
          this.merchantName = _merchant.name;
          // console.info('======================================');
          // console.info( _merchant );
          // console.info('======================================');
        });
        this.columns = [
          {title: '姓名', titleClass: '', cell: new TextCell('name')} as Column,
          {title: '电话', titleClass: '', cell: new TextCell('phone')} as Column,
          {title: '证件号', titleClass: '', cell: new TextCell('filingPerson.certCode')} as Column,
          {title: '证件有效期', titleClass: '', cell: new TextCell('endDate')} as Column,
          {title: '在职状态', titleClass: '', cell: new CustomCell(this.disableSignTemp)} as Column,
          {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
              [
                new Menu('修改', '', (row) => this.edit(row)),
                new Menu('删除', '', (row) => this.delete(row)),
              ],
              new Menu('查看', '', (row) => this.view(row)), 'text-center',
            )} as Column,
        ];
      }
    });
  }

  /**
   * 列表搜索表单隐藏显示切换
   */
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
  }
  changeDisableSign(row) {
    console.info(row);
    if (row.disableSign === '1') {
      this.commonDialog.confirm(`确认要设置"${row.name}"为离职吗？`).then(ret => {
        return this.filingService.stop(row.id);
      }).then(ret => {
        row.disableSign = ret.disableSign;
        this.message.success('成功', '设置离职状态成功！');
      }).catch(err => {
        if (undefined !== err) {
          this.message.error('失败', err.message);
        }
      });
    }else if (row.disableSign === '0') {
      this.commonDialog.confirm(`确认要设置"${row.name}"为在职吗？`).then(ret => {
        return this.filingService.start(row.id);
      }).then(ret => {
        row.disableSign = ret.disableSign;
        this.message.success('成功', '设置在职状态成功！');
      }).catch(err => {
        if (undefined !== err) {
          this.message.error('失败', err.message);
        }
      });
    }
  }

  /**
   * 跳转到添加备案人
   */
  addLinkman() {
    this.router.navigate(['/pages/merchant/bussinessman/add-linkman', { id: this.merchantId}]);
  }
  edit(row) {
    this.router.navigate(['/pages/merchant/bussinessman/edit-linkman', { linkman_id: row.id}]);
  }
  delete(row) {
    this.filingService.del(row.id).then(res => {
      this.message.success('操作成功！', '删除备案人成功！');
      this.itemList.reload();
    }).catch(err => {
      console.info(err);
    });
  }
  view(data) {
  }

}
