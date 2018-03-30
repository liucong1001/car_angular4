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
import { Areamap } from './../../../@core/model/system/areamap';


@Component({
    selector: 'ngx-market-edit',
    templateUrl: './market-edit.component.html',
    providers: [MarketService, MessageService],
})

export class MarketEditComponent implements OnInit {

  city_source_url = '/rest/sys/area?key=';
  auto_input_value_tmp = '';
  isEdit = false;
  cityDefault:{};
  isDataAvailable:boolean = false;

    constructor(private fb: FormBuilder,
        public router: Router,
        private route: ActivatedRoute,
        public http: Http,
        private marketService: MarketService,
        private message: MessageService,
    ) {
        this.route.params.subscribe(p => {

          if (p.id) {
                this.marketService.getMarket(p.id).then(res =>{
                  this.isEdit = true;
                  this.cityDefault = res.area;
                  this.isDataAvailable = true;
                  this.form.patchValue({
                    id: res.id,
                    name: res.name,
                    cloudUser: res.cloudUser,
                    memo: res.memo,
                  });
                });
              }
        });
    }


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
        window.console.log('保存的对象', this.form.value);
        const marketmap = this.form.value as Marketmap;
        window.console.log('市场', marketmap);
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
    urlPath = '';
    phone = '';
    cloudUser = '';
    id = '';
    code = '';
    name = '';
    test() {
       console.log('参数', this.urlPath , this.id, this.phone , this.code, this.cloudUser);
       this.http.post( this.urlPath, { phone: this.phone, id: this.id, code: this.code, cloudUser: this.cloudUser , name: this.name})
       .toPromise().then( res => {

       });
    }
}
