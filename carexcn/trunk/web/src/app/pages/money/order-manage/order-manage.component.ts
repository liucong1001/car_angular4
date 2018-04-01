import {Component, OnChanges, OnInit, SimpleChanges,TemplateRef,ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Router} from '@angular/router';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import {OrderCancelService} from '../../../@core/data/money/orderCancel.service';
import {MessageService} from '../../../@core/utils/message.service';
import {Column, TableComponent} from '../../../@core/ui/table/table.component';

@Component({
  selector: 'ngx-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.scss'],
  providers:[OrderCancelService],
  /*styles: [`
    form {
      overflow: hidden;
    }
  `,
  ],*/
  // 定义动画
  animations: [
    trigger('visibilityChanged', [
      // state 控制不同的状态下对应的不同的样式
      state('shown', style({height: 'auto'})),
      state('hidden', style({height: '0px', opacity: '0'})),
      // transition 控制状态到状态以什么样的方式来进行转换
      transition('shown <=> hidden', [animate('100ms ease-in-out'), animate('100ms')]),
    ]),
  ],
})
export class OrderManageComponent implements OnInit, OnChanges {
  @ViewChild('createTimeCell') private createTimeCell: TemplateRef<any>;
  @ViewChild('arcNoTemp') private arcNoTemp: TemplateRef<any>;
  constructor(private router: Router,private orderCancelService:OrderCancelService,private message:MessageService) {
  }

  visibility = 'hidden';
  showFilter = false;

  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  /**
   * 列表组件实例
   */
  @ViewChild(TableComponent) orderManage: TableComponent;

  // ngOnChanges 可监控组件变量
  ngOnChanges(changes: SimpleChanges): void {
  }

  // 组件初始华
  ngOnInit(): void {
    this.columns =  [
      {title: '订单号', titleClass: 'w-25 text-center', cell: new TextCell('id')} as Column,
      {title: '实收金额', titleClass: 'w-10 text-center', cell: new TextCell('actualAmount')} as Column,
      {title: '应收金额', titleClass: 'w-10 text-center', cell: new TextCell('shouldAmount')} as Column,
      {title: '业务类型', titleClass: 'w-15 text-center', cell: new CustomCell(this.arcNoTemp)} as Column,
      {title: '状态', titleClass: 'w-10 text-center', cell: new CodemapCell('complete','orderStatus')} as Column,
      {title: '创建时间', titleClass: 'w-20 text-center', cell: new CustomCell(this.createTimeCell)} as Column,
      {
        title: '', titleClass: 'w-15 text-center', cell: new MenuCell(
        [
          new Menu('缴费', '', this.payOrder.bind(this)),
          new Menu('删除', '', this.delete.bind(this)),
          new Menu('订单撤销', '', this.cancelOrder.bind(this)),
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
  disable(row: any) {

  }
  payOrder(row:any){
    this.router.navigate( ['/pages/money/payment/order', { id: row.id }]);
  }
  cancelOrder(row:any){
    this.router.navigate( ['/pages/money/order/cancel', { id: row.id }]);
  }
  delete(row:any){
    this.orderCancelService.orderDelete(row.id).then(res=>{
       this.message.success('','删除成功！');
      this.orderManage.reload();
    }).catch(err=>{
       this.message.error('',err.json().message);
    });
  }
}
