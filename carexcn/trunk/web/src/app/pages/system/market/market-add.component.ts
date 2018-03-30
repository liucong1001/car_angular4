import { CodeComponent } from './../code/code.component';
import { Marketmap } from './../../../@core/model/system/marketmap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Column, TableComponent } from '../../../@core/ui/table/table.component';
import { MarketService } from '../../../@core/data/system/market.service';
import { MessageService } from '../../../@core/utils/message.service';
import { Areamap } from './../../../@core/model/system/areamap';


@Component({
  selector: 'ngx-market-add',
  templateUrl: './market-add.component.html',
  providers: [MarketService, MessageService],
})

export class MarketAddComponent implements OnInit {

  city_source_url = '/rest/sys/area?key=';
  auto_input_value_tmp = '';
  isEdit = false;
  cityDefault:{};
  isDataAvailable:boolean = true;

  constructor(private fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private marketService: MarketService,
              private message: MessageService,
  ) {}


  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    cloudUser: ['', [Validators.required]],
    area: this.fb.group({
      id: [''],
      name: [''],
    }),
    memo: [''],
    id: [''],
  });

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


  ngOnInit() {

  }

  /**
   * 输入提示，模糊搜索
   * @param event
   */
  getAutoCityValue(event) {
    if (this.auto_input_value_tmp !== event) {
      this.auto_input_value_tmp = event;
      this.message.info('输入提示', '您选择了：' + event);
      this.form.patchValue({
        area: event,
      });
    }
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
    const marketmap = this.form.value as Marketmap;
    if(this.isEdit){
      this.marketService.saveMarketEdit(marketmap).then(res => {
        this.message.success('修改保存成功', '市场保存成功');
        this.back();
      }).catch(err => {
        this.message.error('保存失败', err.json().message);
      });
    }else{
      this.marketService.save( marketmap).then(res => {
        this.message.success('保存成功', '市场保存成功');
        this.back();
        // this.saved = true;
      }).catch(err => {
        this.message.error('保存失败', err.json().message);
      });
    }

  }
  back() {
    this.router.navigateByUrl('/pages/system/market/market');
  }

}
