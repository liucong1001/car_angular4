import { CodeComponent } from './../code/code.component';
import { Marketmap } from './../../../@core/model/system/marketmap';
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
    selector: 'ngx-market-edit',
    templateUrl: './market-edit.component.html',
    providers: [MarketService, MessageService],
})

export class MarketEditComponent implements OnInit {
    public jobList: Array<any>;
     // 业务费用模态框
     display = false;
     invoice = false;
     discount = false;
     required = false;
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
        code: ['', [Validators.required]],
        // area: [{id: null, name: '江夏'}],
        memo: [''],
    });

    // feeForm: FormGroup = this.fb.group({
    //     name: ['', [Validators.required]],
    //     business_type: ['', [Validators.required]],
    //     money: ['', [Validators.required]],
    //     invoice: ['', [Validators.required]],
    //     discount: ['', [Validators.required]],
    //     required: ['', [Validators.required]],
    //     price_type: ['', [Validators.required]],
    //     memo: [''],
    // });
    brandForm: FormGroup = this.fb.group({
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

    showDialog() {
        this.display = true;
    }


  //    厂牌型号
  showBrandModel() {
    this.brandModel = true;
  }

  saveBrand() {
   console.log('厂牌型号对象', this.brandForm.value);
   this.brandForm.reset();
   this.brandModel = false;
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
        const marketmap = this.form.value as Marketmap;
        window.console.log('市场', marketmap);
        this.marketService.save(marketmap).then(res => {
            this.message.success('保存成功', '市场保存成功');
            this.saved = true;
        }).catch(err => {
            this.message.error('保存失败', err.json().message);
        });
    }
    back() {
        this.router.navigateByUrl('/pages/system/market');
    }
}
