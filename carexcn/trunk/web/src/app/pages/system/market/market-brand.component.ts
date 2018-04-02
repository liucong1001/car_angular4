import { CodeComponent } from './../code/code.component';
import { MarketBrandmap } from './../../../@core/model/system/marketbrand';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Column, TableComponent } from '../../../@core/ui/table/table.component';
import { MarketService } from '../../../@core/data/system/market.service';
import { MessageService } from '../../../@core/utils/message.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
    selector: 'ngx-market-brand',
    templateUrl: './market-brand.component.html',
    providers: [MarketService, MessageService],
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
/**
 * 厂牌型号不需要新增界面，只需要查询界面。
 */

export class MarketBrandComponent implements OnInit {
        // 厂牌型号模态框
    brandModel = false;

  visibility = 'hidden';
  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
    constructor(private fb: FormBuilder,
        public router: Router,
        private route: ActivatedRoute,
        public http: Http,
        private marketService: MarketService,
        private message: MessageService,
    ) {
        this.route.params.subscribe(p => {
            if (p.id) {
              this.filter['market.id'] = p.id;
            }
        });
    }

  ngOnInit() {
  }

    form: FormGroup = this.fb.group({
        name: ['', [Validators.required]],
        range: ['', [Validators.required]],
        origin: ['', [Validators.required]],
        vehicleTypeCode: ['', [Validators.required]],
        memo: [''],
    });
      // 列表列定义
  columns: Column[] = [
    {title: '厂牌型号名称', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '车辆排量代码集', titleClass: '', cell: new TextCell('number')} as Column,
    {title: '来源', titleClass: '', cell: new TextCell('areaNumber')} as Column,
    {title: '车辆类型代码集', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '车辆大小', titleClass: '', cell: new TextCell('create_time')} as Column,
    {title: '停用标记', titleClass: '', cell: new TextCell('memo')} as Column,
    {title: '备注', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        new Menu('编辑', '', 'edit'),
        new Menu('禁用', '', this.disable),
      ],
      new Menu('查看', '', this.view), 'text-center',
    )} as Column,
  ];
    // 列表菜单回调
    view(row: any, drop: any) {
    }
    edit(row: any) {
    }
    disable(row: any) {
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



    closeModal() {
        // this.activeModal.close();
     }

  //   厂牌型号
  showBrandModel() {
    this.brandModel = true;
  }

    /**
  * 已保存标志
  * @type {boolean}
  */
    saved = false;

    /**
 * 保存
 * @returns {boolean}
 */
    save() {
        if (this.form.invalid) {
            return false;
        }
        window.console.log('保存的对象', this.form.value);
        const brandmap = this.form.value as MarketBrandmap;
        window.console.log('市场', brandmap);
        this.marketService.saveBrand(brandmap).then(res => {
            this.message.success('保存成功', '厂牌型号保存成功');
            this.saved = true;
        }).catch(err => {
            this.message.error('保存失败', err.json().message);
        });
    }
    back() {
        this.router.navigateByUrl('/pages/system/market');
    }
}
