import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {CodemapCell, DictCell} from '../../../@core/ui/table/cell';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {MarketService} from "../../../@core/data/system/market.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'ngx-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss'],
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
export class ValidatorComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private marketService: MarketService) { }

  visibility = 'hidden';
  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }

  markets = []
  marketMap = {}
  ngOnInit() {
    this.marketService.getAllMarketList().then(markets => {
      this.markets = markets;
      for (let m of this.markets) {
        this.marketMap[m.code] = m.name;
      }
    });
  }

  filter: any = {};
  // 列表列定义
  columns: Column[] = [
    {title: '编号', titleClass: '', cell: new TextCell('code')} as Column,
    {title: '名称', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '市场', titleClass: '', cell: new DictCell('cloudUser', this.marketMap)} as Column,
    {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          // new Menu('编辑', '', 'edit'),
        ],
        new Menu('编辑', '', this.edit.bind(this)), 'text-center',
      )} as Column,
  ];

  edit(data) {
    this.router.navigate(['edit', data.id], {relativeTo: this.route});
  }

}
