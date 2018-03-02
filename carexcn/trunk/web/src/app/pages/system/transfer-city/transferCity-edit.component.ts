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
import { Areamap } from './../../../@core/model/system/areamap';
import {LocalstorageService} from './../../../@core/cache/localstorage.service';


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
  cityDefault= new Areamap(null, '', '', '', '', '', null, [], {});
  managementDefault = new Areamap(null, '', '', '', '', '', null, [], {});

  cityValue = '';
  /**
   * 通过*ngIf一起使用，可以到达拿到数据再加载模板的效果，厉害！
   * @type {boolean}
   */
  isDataAvailable:boolean = false;
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
  constructor( private fb: FormBuilder,
               public router: Router, private route: ActivatedRoute,
               private transferCityService: TransferCityService,
               private message: MessageService,
               private areaService: AreaService,
               private _localstorage: LocalstorageService,
  ) {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.transferCityService.get(p.id).then(res => {
          this.cityDefault = res.city;
          this.managementDefault = res.management;
           this.isDataAvailable = true;
           this.form.patchValue({
             city:this.cityDefault,
             management: this.managementDefault,
           });
        });
      }else{
          this.isDataAvailable = true;
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

  findCityInfo:object = {};
  cityInfoShow:boolean=false;
  /**
   * 提档地(转出地)
   * @param event
   */
  getAutoCityValue(event) {
    if (this.auto_input_value_tmp !== event) {
      this.auto_input_value_tmp = event;
      this.form.patchValue({
        city: event,
      });
      console.log('转出地',event);
      this.transferCityService.check(this.form.value.city.id).then(res=>{
           this.findCityInfo = res;
           this.cityInfoShow = true;
      })
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
    console.log('表单', this.form.value);
    if (this.form.invalid) {
      return false;
    }
    const codemap = this.form.value ;

    this.transferCityService.save(codemap).then(res => {
      this.message.success('保存成功', '代码集保存成功');
      this.saved = true;
      this.back();
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }

  back() {
    this.router.navigateByUrl('/pages/system/transfercity');
  }
  test() {
    console.info(this.form.value);
  }
}
