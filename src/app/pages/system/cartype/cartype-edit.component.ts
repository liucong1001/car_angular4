/**
 * 车辆类型新增、修改表单组件
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {Column, TableComponent} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {MessageService} from "../../../@core/utils/message.service";
import {Cartypemap} from "./../../../@core/model/system/cartypemap";
import {CartypeService} from "../../../@core/data/system/cartype.service";
import { AreaService } from './../../../@core/data/system/area.service';


@Component({
  selector: 'ngx-cartype-edit',
  templateUrl: './cartype-edit.component.html',
  providers: [CartypeService, AreaService,MessageService],
})
export class CartypeEditComponent implements OnInit {

  marketList = [];
  isEdit= false;
  /**
   * 初始化
   */
  ngOnInit(): void {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.isEdit = true;
        this.cartypeService.get(p.id).then( res => {
          console.log('返回',res);
          this.form.patchValue({
            id: res.id,
            name : res.name,
            cloudUser:res.cloudUser,
            memo:res.memo,
            vehicleTypeCode:res.vehicleTypeCode,
            vehicleCategoryCode:res.vehicleCategoryCode,
            market:{
              id:res.market.id,
              name:res.market.name,
            }
          })

        })
      }
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
               private cartypeService: CartypeService, private message: MessageService,private areaService: AreaService
  ) {
    this.cartypeService.getAllMarket().then(res => {
      this.marketList = res;
      console.log('获取市场',res);
    })
  }

  /**
   * 表单定义
   * @type {FormGroup}
   */
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    cloudUser: ['', [Validators.required]],
    market: this.fb.group({
      id:['',Validators.required],
      name:[''],
    }),
    vehicleTypeCode: ['', [Validators.required]],
    vehicleCategoryCode: ['', [Validators.required]],
    memo: ['', ],
    code: [''],
     id:[''],
  });
  /**
   * 已保存标志
   * @type {boolean}
   */
  saved = false;

  save(){
    if (this.form.invalid) {
      return false;
    }
    const cartypemap = this.form.value as Cartypemap;
    console.log('车辆类型', cartypemap);
    if(this.isEdit){
      this.cartypeService.saveEdit(cartypemap).then(res => {
        this.message.success('修改保存成功', '车辆类型保存成功');
        this.back();
      }).catch(err => {
        this.message.error('保存失败', err.json().message);
      });
    }else {
      this.cartypeService.save(cartypemap).then(res => {
        this.message.success('保存成功', '车辆类型保存成功');
        this.back();
      }).catch(err => {
        this.message.error('保存失败', err.json().message);
      });
    }

  }

  back(){
    this.router.navigateByUrl('/pages/system/cartype');
  }

}
