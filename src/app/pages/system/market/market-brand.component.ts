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


@Component({
    selector: 'ngx-market-brand',
    templateUrl: './market-brand.component.html',
    providers: [MarketService, MessageService],
})

export class MarketBrandComponent implements OnInit {
        // 厂牌型号模态框
        brandModel = false;

    constructor(private fb: FormBuilder,
        public router: Router,
        private route: ActivatedRoute,
        public http: Http,
        private marketService: MarketService,
        private message: MessageService,
    ) {
        this.route.params.subscribe(p => {
            if (p.code && p.name) {
                this.form.setValue(p);
                this.filter.marketmap = p.code;
                if (p.code && p.name) {
                    this.saved = true;
                }
            }
        });
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

    ngOnInit() {
    }

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
