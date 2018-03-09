import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TradeService} from '../../../../@core/data/business/trade.service';
import { ActivatedRoute, Router,Params, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { MessageService } from '../../../../@core/utils/message.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {TradeForm} from '../../../../@core/model/business/trade/trade.form';
import {MobileService} from '../../../../@core/data/business/mobile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {Codeitem} from '../../../../@core/model/system/codeitem';
import {CodeitemService} from '../../../../@core/data/system/codeitem.service';

@Component({
  selector: 'ngx-mobile-input',
  templateUrl: './mobile-input.component.html',
  styleUrls: ['./mobile-input.component.scss'],
  providers:[TradeService,MobileService],
})
export class MobileInputComponent implements OnInit {

  constructor(private  tradeService:TradeService,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private message: MessageService,private mobileService:MobileService,
              private _router: Router,
              private _localstorage: LocalstorageService,
              private _codeitem: CodeitemService,
              private fb: FormBuilder,) {}

  public  tradeInfo = new TradeForm() ;

  photos: any[] = [{
    title: '行驶证正本',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '行驶证副本',
    source: 'assets/images/camera2.jpg',
  }, {
    title: '登记证书首页',
    source: 'assets/images/camera3.jpg',
  }, {
    title: '登记证书末页',
    source: 'assets/images/camera4.jpg',
  }];

  seller: FormGroup = this.fb.group({
    cloudUser: ['0001'],
    name:[''],
    certCode:[''],
    endDate:[''],
    address:[''],
    phone:[''],
  });

  form: FormGroup = this.fb.group({
    seller: this.seller,
  });



  public _formGroup: FormGroup = this.fb.group({
    // brandModel: ['1', [Validators.maxLength(50)]], // 厂牌型号实体Id
    labelCode: ['宝马WBA1A110', [Validators.required]], // 厂牌型号名称
    vehicleType: ['01', [Validators.required]], // 车辆类型代码
    plateNumber: ['', [Validators.required]], // 车牌号
    frameNumber: ['LVGBE40K28G244297', [Validators.required]], // 车架号
    // engineNumber: ['C466626', [Validators.required]],
    registration: ['1', [Validators.required, Validators.maxLength(12)]], // 登记证书号 行驶证号
    registrationDate: ['20080924', [Validators.required]], // 行驶证注册日期
    useCharacter: ['01', [Validators.required]], // 使用性质代码
    useNature: ['01', [Validators.required]], // 车辆性质
    displacement: ['1', [Validators.required]], // 设置排量
    range: ['01', [Validators.required]], // 排量区间代码
    size: ['01', [Validators.required]], // 车辆大小代码
    mileage: ['1000', [Validators.required]], // 行驶里程
    otherConditions: ['1', [Validators.required]], // 其它状况说明
    origin: ['武汉', [Validators.required]], // 车辆产地
    fee: ['284', [Validators.required]], // 手续费
    // eeee: ['', [Validators.maxLength(50)]],
    /**
     * TODO: 注意 eeee 字段，后台可能暂未准备好接收，但是是业务必须的字段
     * TODO: 注意 eeee 字段的错误信息
     */
  });


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['archiveNo']) {
        this.tradeService.get(params['archiveNo']).then(res => {
          this.tradeInfo = res;
          console.log('input获取到',res);
        }).catch(err => {
          this.message.error('获取失败', err.json().message);
        });
      }
    });
  }
  save(){
    console.log('开始录入',this.form.value);
    // this.tradeService.update().then(res=>{
    //此处是提交信息接口
    // })
  }

}
