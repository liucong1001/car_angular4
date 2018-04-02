import { Component, OnInit } from '@angular/core';
import { Column} from '../../../../@core/ui/table/table.component';
import { MessageService } from '../../../../@core/utils/message.service';
import { MarketService } from '../../../../@core/data/system/market.service';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { FormBuilder} from '@angular/forms';
import { TextCell } from '../../../../@core/ui/table/cell.text.component';
import { Menu, MenuCell } from '../../../../@core/ui/table/cell.menu.component';

@Component({
  selector: 'ngx-market-basic',
  templateUrl: './market-basic.component.html',
  styleUrls: ['./market-basic.component.scss']
})
export class MarketBasicComponent implements OnInit {

  cloudUser = '';

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private marketService: MarketService,
    private message: MessageService,
  ) {
    this.route.params.subscribe((params: Params) => {
      this.cloudUser = params['cloudUser'];
    });
  }

  ngOnInit() {
    this. columns =  [
      { title: '市场名称', titleClass: '', cell: new TextCell('printMarketName') } as Column,
      { title: '市场地址', titleClass: '', cell: new TextCell('printMarketAddress') } as Column,
      { title: '市场开户账号', titleClass: '', cell: new TextCell('printMarketAccount') } as Column,
      { title: '市场联系电话', titleClass: '', cell: new TextCell('printMarketPhone') } as Column,
      { title: '打印卖买双方电话', titleClass: '', cell: new TextCell('printPhone') } as Column,
      { title: '市场纳税人识别号', titleClass: '', cell: new TextCell('printMarketTaxNo') } as Column,
      {
        title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          new Menu('编辑', '', this.edit.bind(this)),
        ],
        new Menu('查看', '', this.view), 'text-center',
      ),
      } as Column,
    ];
    this.filter['cloudUser'] = this.cloudUser;
  }

  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] ;
  // 列表菜单回调
  view(row: any, drop: any) {
  }

  edit(row: any) {
    this.router.navigate(['/pages/system/market/market/basic/edit', { id: row.id, cloudUser: this.cloudUser}]);
  }

  add() {
    this.router.navigate(['/pages/system/market/market/basic/add', { cloudUser: this.cloudUser}]);
  }

  back() {
    this.router.navigate(['/pages/system/market/market']);
  }
}
