import {Component, OnChanges,isDevMode, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Column} from '../../../@core/ui/table/table.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {CARDS} from '../../../@core/data/ic-card/iccard';
import {Card} from '../../../@core/model/bussiness/card';
import {CustomCell} from '../../../@core/ui/table/cell';

// import {CarModel} from "../../../@core/model/bussiness/car.model";
import 'rxjs/add/observable/of';
import {Http} from '@angular/http';

@Component({
  selector: 'ngx-recharge-record',
  templateUrl: './recharge-record.component.html',
  styleUrls: ['./recharge-record.component.scss'],
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
export class RechargeRecordComponent implements OnInit, OnChanges {

  @ViewChild('statusTemp') private statusTemp: TemplateRef<any>;

  constructor(private http: Http) { }

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
  // 组件初始华
  ngOnInit() {
    this.columns =[
      {title: '卡号', titleClass: '', cell: new TextCell('icCard.icCardNo')} as Column,
      {title: '账户编号', titleClass: '', cell: new TextCell('icCard.icAccount.ownedAccount.accountNo')} as Column,
      {title: '账户名称', titleClass: '', cell: new TextCell('icCard.icAccount.ownedAccount.accountName')} as Column,
      {title: '充值金额', titleClass: '', cell: new TextCell('recharge')} as Column,
      {title: '赠送金额', titleClass: '', cell: new TextCell('give')} as Column,
      {title: '总金额', titleClass: '', cell: new TextCell('amount')} as Column,
      {title: '充值时间', titleClass: '', cell: new TextCell('createTime')} as Column,
      {title: '取消时间', titleClass: '', cell: new TextCell('createTime')} as Column,
      {title: '原因', titleClass: '', cell: new TextCell('name')} as Column,
      {title: '状态', titleClass: '', cell: new CustomCell(this.statusTemp)} as Column,
      {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          new Menu('编辑', '', 'edit'),
          new Menu('禁用', '', this.disable),
        ],
        new Menu('查看', '', this.view), 'text-center',
      )} as Column,
    ];
  }
  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义

  columns: Column[] ;
  // 列表菜单回调
  view(row: any, drop: any) {
  }
  edit(row: any) {
  }
  disable(row: any) {
  }
  row: Card = {
    number: '000000',
    id: 'A0000',
  };
  content = CARDS;
  private api_url_base = '/@core/data/ic-card/iccard';
  getCars(cid: string): Promise<Card> {
    let result: Promise<Card>;
    if (isDevMode()) {
      result = Promise.resolve(this.row).then((res) => res as Card);
    } else {
      result = this.http.get(this.api_url_base + 'cid/' + cid).toPromise().then((res) => res.json() as Card);
    }
    return result;
  }
}
