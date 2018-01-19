import {Component, OnChanges, OnInit, SimpleChanges,ViewChild} from '@angular/core';
import {Column, TableComponent} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IcCardOperationService} from '../../../@core/data/ic-card/card.service';
import {MessageService} from '../../../@core/utils/message.service';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-card-manage',
  templateUrl: './card-manage.component.html',
  styleUrls: ['./card-manage.component.scss'],
  providers:[IcCardOperationService],
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
export class CardManageComponent implements OnInit, OnChanges {
  @ViewChild(TableComponent) itemList: TableComponent;


  constructor( private IcCardOperationService:IcCardOperationService,private message:MessageService,
               private route: ActivatedRoute, public router: Router,) { }
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
    this.columns = [
      {title: '卡号', titleClass: '', cell: new TextCell('icCardNo')} as Column,
      {title: '账户名称', titleClass: '', cell: new TextCell('icAccount.ownedAccount.accountName')} as Column,
      {title: '账户余额', titleClass: '', cell: new TextCell('icAccount.balance')} as Column,
      {title: '充值余额', titleClass: '', cell: new TextCell('icAccount.recharge')} as Column,
      {title: '赠送余额', titleClass: '', cell: new TextCell('icAccount.give')} as Column,
      {title: '状态', titleClass: '', cell: new CodemapCell('status', 'icCardStatus')} as Column,
      {title: '账户详情', titleClass: '', cell: new TextCell('name')} as Column,
      {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          new Menu('注销解绑', '', this.remove.bind(this)),
          new Menu('挂失', '', this.loss.bind(this)),
          new Menu('取消挂失', '', this.cancel.bind(this)),
          new Menu('密码重置', '', this.reset.bind(this)),
          new Menu('密码修改', '', this.change.bind(this)),
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
  remove(row: any){
      if(confirm("是否确定注销解绑？")){
          this.IcCardOperationService.iccardRemove(row.icCardNo).then(res =>{
            this.message.success('','解绑成功！');
            this.itemList.reload();
          })
      }
  }
  loss(row: any){
    if(confirm("是否确定挂失？")){
      this.IcCardOperationService.iccardLoss(row.icCardNo).then(res =>{
        this.message.success('','挂失成功！');
        this.itemList.reload();
      }).catch(err => {
        this.message.error('操作失败',err.json().message);
      })
    }
  }
  cancel(row: any){
    this.IcCardOperationService.iccardLossCancel(row.icCardNo).then(res =>{
      this.message.success('','取消挂失成功！');
      this.itemList.reload();
    }).catch(err => {
        this.message.error('操作失败',err.json().message);
    })
  }
  reset(row: any){
    this.IcCardOperationService.iccardReset(row.icCardNo).then(res =>{
      this.message.success('','密码重置成功！');
      this.itemList.reload();
    }).catch(err=>{
      this.message.error('操作失败',err.json().message);
    })
  }

  change(row:any){
    this.router.navigate( ['/pages/ic-card/password-change', { icCardNo: row.icCardNo }]);

  }


}


