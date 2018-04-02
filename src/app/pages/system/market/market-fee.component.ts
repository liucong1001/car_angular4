import { IdcardModel } from './../../../@core/model/business/idcard.model';
import { Marketfeemap } from './../../../@core/model/system/market-fee-map';
import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { Menu, MenuCell } from '../../../@core/ui/table/cell.menu.component';
import { TextCell } from '../../../@core/ui/table/cell.text.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Column, TableComponent } from '../../../@core/ui/table/table.component';
import { MarketService } from '../../../@core/data/system/market.service';
import { MessageService } from '../../../@core/utils/message.service';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';
import {PriceTypePipe} from  '../../../@core/data/system/priceType.pipe';

@Component({
  selector: 'ngx-market-fee',
  templateUrl: './market-fee.component.html',
  providers: [MarketService, MessageService],
})

export class MarketFeeComponent implements OnInit {


  marketId = '';
  marketName = '';

  constructor(private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public http: Http,
    private marketService: MarketService,
    private message: MessageService, ) {
    this.route.params.subscribe((params: Params) => {
      this.marketId = params['id'];
      this.marketName = params['marketName'];
      this.filter['market.id'] = this.marketId;
    });
  }
  // 列表列定义
  columns: Column[] ;

  ngOnInit(){
   this. columns =  [
     { title: '费用名', titleClass: '', cell: new TextCell('name') } as Column,
     { title: '业务类型', titleClass: '', cell: new CodemapCell('businessType', 'businessType') } as Column,
     { title: '流水类型', titleClass: '', cell: new CodemapCell('arcNoType', 'arcNoType') } as Column,
     { title: '价格类型', titleClass: '', cell: new CustomCell(this.priceTypeCell) } as Column,
     { title: '费用', titleClass: '', cell: new TextCell('money') } as Column,
     { title: '计入开票', titleClass: '', cell: new CustomCell(this.invoice) } as Column,
     { title: '考虑折扣', titleClass: '', cell: new CustomCell(this.discount) } as Column,
     { title: '必选', titleClass: '', cell: new CustomCell(this.required) } as Column,
     { title: '备注', titleClass: '', cell: new TextCell('memo') } as Column,
     {
       title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
       [
         new Menu('编辑', '', this.edit.bind(this)),
         new Menu('删除', '', this.delete.bind(this)),
       ],
       new Menu('查看', '', this.view), 'text-center',
     ),
     } as Column,
   ];
  }
  @ViewChild('priceTypeCell')  priceTypeCell: TemplateRef<any>;
  @ViewChild('invoice')  invoice: TemplateRef<any>;
  @ViewChild('discount')  discount: TemplateRef<any>;
  @ViewChild('required')  required: TemplateRef<any>;

  // 列表菜单回调
  view(row: any, drop: any) {
  }

  edit(row: any) {
    this.router.navigate(['/pages/system/market/market/fee/edit', { id: row.id, marketId: this.marketId, marketName: this.marketName }]);
  }

  delete(row: any) {
    if ( confirm('确认是否要删除此项费用！！！')) {
       this.marketService.deleteFee(row.id).then( res => {
         alert('删除成功!');
         this.itemList.reload();
       } );
    }
  }

  /**
   * 列表组件实例
   */
  @ViewChild(TableComponent) itemList: TableComponent;

  /**
   * 代码项搜索条件
   * @type {{}}
   */
  filter: any = {};

  add() {
    this.router.navigate(['/pages/system/market/market/fee/edit', { marketId: this.marketId, marketName: this.marketName }]);
  }

  back() {
    this.router.navigate(['/pages/system/market/market']);
  }
}
