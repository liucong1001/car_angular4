import {Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../../@core/ui/table/cell.menu.component';
import {Router, ActivatedRoute} from '@angular/router';
import {CodemapCell, CustomCell} from '../../../../@core/ui/table/cell';
import {commonAutionCarService} from  '../../../../@core/data/common-aution/car.service';
import {MessageService} from '../../../../@core/utils/message.service';
import {Column, TableComponent} from '../../../../@core/ui/table/table.component';

@Component({
  selector: 'ngx-cars-manage',
  templateUrl: './cars-manage.component.html',
  styleUrls: ['./cars-manage.component.scss'],
  styles: [`
    form {
      overflow: hidden;
    }
  `,
  ],
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
  providers:[commonAutionCarService],
})
export class CarsManageComponent implements OnInit, OnChanges {
  @ViewChild(TableComponent) itemList: TableComponent;
  constructor(private router: Router, private route: ActivatedRoute,
              private commonAutionCarService:commonAutionCarService,
              private message:MessageService) { }

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
 paramsId:string;
 pagerUrl:string = '/rest/business/trade/sales/findbycar/';
  // 组件初始华
  ngOnInit(): void {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.paramsId = p.id;
        this.pagerUrl = '/rest/business/trade/sales/findbycar/'+this.paramsId;
      }
    });
  }

  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] = [
    {title: '项目名称', titleClass: 'w-25 text-center', cell: new TextCell('saleProject.name')} as Column,
    {title: '项目编号', titleClass: 'w-10 text-center', cell: new TextCell('saleProject.id')} as Column,
    {title: '车牌号', titleClass: 'w-15 text-center', cell: new TextCell('plateNumber')} as Column,
    {title: '流水号', titleClass: 'w-10 text-center', cell: new TextCell('archivesNo')} as Column,
    {title: '总费用', titleClass: 'w-20 text-center', cell: new TextCell('fee')} as Column,
    {title: '金额三', titleClass: 'w-20 text-center', cell: new TextCell('discount')} as Column,
    {title: '发票号', titleClass: 'w-20 text-center', cell: new TextCell('bill')} as Column,
    {title: '状态', titleClass: 'w-20 text-center', cell: new CodemapCell('status','saleCarStatus')} as Column,
    {
      title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          new Menu('编辑', '', this.edit.bind(this)),
          new Menu('删除', '', this.delete.bind(this)),
          new Menu('流拍', '', this.misCar.bind(this)),
        ],
        new Menu('修改', '', this.view), 'text-center',
      )} as Column,
  ];

  // 列表菜单回调
  view(row: any, drop: any) {
  }

  edit(row: any) {
    this.router.navigate(['/pages/common-auction/auction-manage/edit-car', { id:row.id}]);
  }
  delete(row:any){
    this.commonAutionCarService.delete(row.id).then(res=>{
      this.message.success('','删除成功！');
      this.itemList.reload();
    }).catch(err=>{
      this.message.error('删除失败',err.json().message);
    })
  }
  misCar(row:any){
    this.commonAutionCarService.misCar(row.id).then(res=>{
      this.message.success('','流拍成功！');
      this.itemList.reload();
    }).catch(err=>{
      this.message.error('流拍失败',err.json().message);
    })
  }
  disable(row: any) {

  }
  /*跳转*/
  add() {
    // this.router.navigateByUrl('/pages/common-auction/auction-manage/add-car');
    this.router.navigate(['/pages/common-auction/auction-manage/add-car', { id:this.paramsId}]);
  }


}
