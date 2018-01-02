import {Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {Column, TableComponent} from '../../../../@core/ui/table/table.component';
import {TextCell} from '../../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../../@core/ui/table/cell.menu.component';
import {Router} from '@angular/router';
import {MerchantService} from '../../../../@core/data/merchant/merchant.service';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {MessageService} from '../../../../@core/utils/message.service';
import {CustomCell} from '../../../../@core/ui/table/cell';
import {SonMerchantForm} from '../../../../@core/model/bussiness/son.merchant.form';

/**
 * TODO: 功能列表
 * 商户增删改查 wjf
 * 子商户增删改查 wjf
 * 备案人增删改查 wjf
 * 商户财务维护 xxy
 * 个人商户只有查询操作，不可以做任何其它操作
 *
 */
@Component({
  selector: 'ngx-bussinessman',
  templateUrl: './bussinessman.component.html',
  styleUrls: ['./bussinessman.component.scss'],
})
export class BussinessmanComponent implements OnInit, OnChanges {
  @ViewChild(TableComponent) itemList: TableComponent;
  constructor(
    private router: Router,
    private message: MessageService,
    private merchantService: MerchantService,
  ) {}
  /*跳转*/
  jump() {
    this.router.navigateByUrl('/pages/merchant/bussinessman/add');
  }
  @ViewChild('isPersonalTemp') private isPersonalTemp: TemplateRef<any>;
  @ViewChild('disableSignTemp') private disableSignTemp: TemplateRef<any>;
  columns: Column[];
  ngOnInit() {
    this.columns = [
      // {title: '商户ID', titleClass: '', cell: new TextCell('id')} as Column,// 不要显示
      // TODO: 商户资料是否齐全的字段
      {title: '商户名', titleClass: '', cell: new TextCell('name')} as Column,
      {title: '编码', titleClass: '', cell: new TextCell('code')} as Column,
      {title: '证件号', titleClass: '', cell: new TextCell('certCode')} as Column,
      {title: '证件有效期', titleClass: '', cell: new TextCell('endDate')} as Column,
      {title: '联系方式', titleClass: '', cell: new TextCell('phone')} as Column,
      {title: '地址', titleClass: '', cell: new TextCell('address')} as Column,
      {title: '类型', titleClass: '', cell: new CustomCell(this.isPersonalTemp)} as Column,
      {title: '状态', titleClass: '', cell: new CustomCell(this.disableSignTemp)} as Column,
      {title: '操作', titleClass: 'w-5 text-center', cell: new MenuCell(
          [
            // new Menu('修改', '',
            //   (row) => this.edit(row as MerchantModel),
            //   (row) => this.isNotFlag(row as MerchantModel),
            // ),
            new Menu('删除', '',
              (row) => this.delete(row as MerchantModel),
              (row) => this.isNotFlag(row as MerchantModel),
            ),
            new Menu('备案人', '',
              (row) => this.linkman(row as MerchantModel),
              (row) => this.isNotFlag(row as MerchantModel),
            ),
            new Menu('子商户', '',
              (row) => this.createSon(row as MerchantModel),
              (row) => this.isNotPersonal(row as MerchantModel),
            ),
          ],
          new Menu('修改', '',
            (row) => this.edit(row as MerchantModel),
            (row) => this.isNotFlag(row as MerchantModel),
          ),
          // new Menu('查看', '', (row) => this.view(row)),
          'text-center',
        )} as Column,
    ];
  }
  visibility = 'hidden';
  showFilter = false;
  showSonForm = false;
  son: SonMerchantForm = {};
  filter: any = {
    // name: '',
    // code: '',
    // phone: '',
  };
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  // ngOnChanges 可监控组件变量
  ngOnChanges(changes: SimpleChanges): void {
  }

  /**
   * 是否是个人类型的商户
   * @param row
   */
  isNotPersonal(row) {
    return '1' === row.isPersonal ? false : ('1' === row.flag ? false : (row.master ? false : true));
  }
  /**
   * 是否是个人商户【特殊商户，非正常商户】
   * @param row
   */
  isNotFlag(row) {
    return '1' === row.flag ? false : true;
  }

  /**
   * 建立子商户
   * @param row
   */
  createSon(row) {
    console.info(row);
    this.showSonForm = true;
    this.son.merchantId = row.id;
  }
  saveSon(name) {
    this.son.name = name;
    console.info(this.son);
    this.merchantService.createSon(this.son).then(res => {
      console.info(res);
      this.message.success('操作成功', '创建子商户成功');
      this.showSonForm = false;
    }).catch(err => {
      this.message.error('操作失败', err.json().message);
    });
  }
  linkman(merchant) {
    this.router.navigate( ['/pages/merchant/bussinessman/linkman', { id: merchant.id}]);
    // console.info(merchant.id);
    // console.info(merchant);
  }
  view(row) {
    console.info(row);
  }
  edit(merchant) {
    this.router.navigate( ['/pages/merchant/bussinessman/edit', { id: merchant.id}]);
    // console.info(merchant);
  }

  /**
   * 删除商户
   * @param {MerchantModel} merchant
   */
  delete(merchant: MerchantModel) {
    console.info(merchant);
    this.merchantService.del(merchant.id).then(res => {
      this.message.success('操作成功', JSON.stringify(res));
      this.itemList.reload();
    }).catch(err => {
      this.message.error('操作失败', err.json().message);
    });
  }
}
