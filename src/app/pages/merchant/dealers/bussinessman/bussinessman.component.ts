import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Column, TableComponent} from '../../../../@core/ui/table/table.component';
import {TextCell} from '../../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../../@core/ui/table/cell.menu.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {MerchantService} from '../../../../@core/data/merchant/merchant.service';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {MessageService} from '../../../../@core/utils/message.service';

@Component({
  selector: 'ngx-bussinessman',
  templateUrl: './bussinessman.component.html',
  styleUrls: ['./bussinessman.component.scss'],
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
  ngOnInit() {
  }
  visibility = 'hidden';
  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  // ngOnChanges 可监控组件变量
  ngOnChanges(changes: SimpleChanges): void {
  }
  columns: Column[] = [
    // {title: '商户ID', titleClass: '', cell: new TextCell('id')} as Column,// 不要显示
    {title: '商户名', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '编码', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '证件号', titleClass: '', cell: new TextCell('certCode')} as Column,
    {title: '证件有效期', titleClass: '', cell: new TextCell('endDare')} as Column,
    {title: '联系方式', titleClass: '', cell: new TextCell('phone')} as Column,
    {title: '地址', titleClass: '', cell: new TextCell('address')} as Column,
    {title: '类型', titleClass: '', cell: new TextCell('isPersonal')} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          new Menu('修改', '', (row) => this.edit(row as MerchantModel)),
          new Menu('删除', '', (row) => this.delete(row as MerchantModel)),
          new Menu('备案人', '', 'linkman'),
          new Menu('子商户', '', 'son'),
        ],
        new Menu('查看', '', (row) => this.view(row)), 'text-center',
      )} as Column,
  ];
  son(row) {
    console.info(row);
  }
  linkman(row: any) {
    console.info(row);
  }
  view(row) {
    console.info(row);
  }
  edit(merchant) {
    this.router.navigate( ['/pages/merchant/bussinessman/edit', { id: merchant.id}]);
    console.info(merchant);
  }
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
