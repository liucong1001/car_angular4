/**
 * 车管所新增、修改表单组件
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Column, TableComponent} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {MessageService} from '../../../@core/utils/message.service';
import {TransferCitymap} from './../../../@core/model/system/transferCitymap';
import {TransferCityService} from '../../../@core/data/system/transferCity.service';
import { AreaService } from './../../../@core/data/system/area.service';


@Component({
  selector: 'ngx-transfer-city-edit',
  templateUrl: './transferCity-edit.component.html',
  providers: [TransferCityService, AreaService, MessageService],
})
export class TransferCityEditComponent implements OnInit {

  city_source_url_city = '/rest/sys/area?key=';
  city_source_url = '/rest/sys/area?key=';
  auto_input_value_tmp = '';
  auto_input_value_management = '';
  city = [];
  cityValue = '';
  /**
   * 初始化
   */
  ngOnInit(): void {
  }

  /**
   * 构造方法，依赖服务注入
   * @param {CodeService} codeService 代码服务
   * @param {MessageService} message 消息服务
   * @param {FormBuilder} fb 表单工厂服务
   * @param {ActivatedRoute} route 当前路由服务
   */
  constructor( private fb: FormBuilder,  public router: Router, private route: ActivatedRoute,
 private transferCityService: TransferCityService, private message: MessageService,private areaService: AreaService
  ) {
    this.route.params.subscribe(p => {
      if (p.id) {
         console.log('获取到的参数', p.id);
         this.transferCityService.get(p.id).then(res => {
           console.log('获取到的对象', res);
           this.cityValue = '2243';
           this.city.push(res.city);
           this.getAutoCityValue('武汉');
         });
      }
    });
  }

  /**
   * 表单定义
   * @type {FormGroup}
   */
  form: FormGroup = this.fb.group({
    city: [null, [Validators.required]],
    management: [null, [Validators.required]],
  });
  /**
   * 已保存标志
   * @type {boolean}
   */
  saved = false;


  /**
   * 输入提示，模糊搜索
   * @param event
   */
  getAutoCityValue(event) {
    if (this.auto_input_value_tmp !== event) {
      this.auto_input_value_tmp = event;
      this.form.patchValue({
        city: event,
      });
      console.log('转出地选择了', event, this.form.value);
    }
  }
  getAutoManagementValue(event) {
    if (this.auto_input_value_management !== event) {
       this.auto_input_value_management = event;
       this.form.patchValue({
        management: event,
      });
    }
  }

  save() {
    // if (this.form.invalid) {
    //   return false;
    // }
    const codemap = this.form.value ;
    console.log('车管所', codemap);
    this.transferCityService.save(codemap).then(res => {
      this.message.success('保存成功', '代码集保存成功');
      this.saved = true;
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }
  back() {
    this.router.navigateByUrl('/pages/system/transfercity');
  }

}
