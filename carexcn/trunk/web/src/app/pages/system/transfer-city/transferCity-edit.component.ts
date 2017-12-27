/**
 * 车管所新增、修改表单组件
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {Column, TableComponent} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {MessageService} from "../../../@core/utils/message.service";
import {TransferCitymap} from "./../../../@core/model/system/transferCitymap";
import {TransferCityService} from "../../../@core/data/system/transferCity.service";
import { AreaService } from './../../../@core/data/system/area.service';


@Component({
  selector: 'ngx-transfer-city-edit',
  templateUrl: './transferCity-edit.component.html',
  providers: [TransferCityService, AreaService,MessageService],
})
export class TransferCityEditComponent implements OnInit {
  city_source_url = 'https://dongshenghuo.com/test.php?r=stringArr&q=';
  auto_input_value_tmp = '';

  /**
   * 初始化
   */
  ngOnInit(): void {
    this.areaService.get(null).then(res => {
       console.log('地区',res);
    }).catch(err => {
      this.message.error('失败', err.json().message);
    });
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
      if (p.code && p.name) {
      }
    });
  }

  /**
   * 表单定义
   * @type {FormGroup}
   */
  form: FormGroup = this.fb.group({
    city: ['', [Validators.required]],
    management: ['', [Validators.required]],
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
      this.message.info('输入提示', '您选择了：' + event);
    }
  }
  save(){
    if (this.form.invalid) {
      return false;
    }
    const codemap = this.form.value as TransferCitymap;
    console.log('车管所', TransferCitymap);
    this.transferCityService.save(TransferCitymap).then(res => {
      this.message.success('保存成功', '代码集保存成功');
      this.saved = true;
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }

  back(){
    this.router.navigateByUrl('/pages/system/transfercity');
  }

}
