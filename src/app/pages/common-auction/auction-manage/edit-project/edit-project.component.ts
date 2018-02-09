import {Component, OnDestroy, OnInit,OnChanges,SimpleChanges} from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {FilingInfoModel} from '../../../../@core/model/bussiness/filing.info.model';
import {FilingService} from '../../../../@core/data/merchant/filing.service';
import {LocalstorageService} from '../../../../@core/cache/localstorage.service';
import {MerchantModel} from '../../../../@core/model/bussiness/merchant.model';
import {PreVehicleModel} from '../../../../@core/model/bussiness/trade/preVehicle/preVehicle.model';
import {PrejudicationService} from '../../../../@core/data/bussiness/prejudication.service';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {commonAutionService} from  '../../../../@core/data/common-aution/project.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';


@Component({
  selector: 'ngx-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
  providers:[commonAutionService],
})
export class EditProjectComponent implements OnInit {
  constructor(    private _router: Router,
                  private _formbuilder: FormBuilder,
                  private _message: MessageService,
                  private _filingService: FilingService,
                  private _localstorage: LocalstorageService,
                  private _prejudication: PrejudicationService,
                  public router: Router,
                  public commonAutionService:commonAutionService,
                  private fb: FormBuilder,
                  private route: ActivatedRoute,) { }

  carLsnumPrefixDefault = '鄂A';
  carLsnumIsOk = false;
  dealerIsOk = false;

  linkManData: FilingInfoModel[] = [];
  linkman: any = {};
  linkmanSelected: FilingInfoModel = {};
// : MerchantModel
  dealer = {};
  vehicle: PreVehicleModel = {plateNumber: ''};



  saleProjectform: FormGroup = this.fb.group({
    cloudUser: ['0001', [Validators.required]],
    name: ['', [Validators.required]],
    merchant:[null],
    filingInfo:[null],
    saleType:[''],
    salePercent: [''],
    id:[''],
  });

  form: FormGroup = this.fb.group({
    saleProject:this.saleProjectform
  });
  /**
   * 商户搜索资源
   * @type {string}
   */
  public autoinput_shanghu_source_url = '/rest/merchant/list/';
  isDataAvailable:boolean = false;
  // ngOnChanges 可监控组件变量
  ngOnChanges(changes: SimpleChanges): void {
  }

  // 组件初始华
  ngOnInit(): void {
    this.route.params.subscribe(p => {
      if (p.id) {
         this.commonAutionService.getProjectInfo(p.id).then(res=>{
             console.log('获取数据',res);
             this.saleProjectform.patchValue(res.saleProject);
             this.dealer = res.saleProject.merchant;
             this.getSelectedDealer(this.dealer);
              this.isDataAvailable = true;
         })
      }
    });
  }


  /**
   * 选择好了商户的事件
   * @param value
   */
  getSelectedDealer(dealer) {
    this.dealer = dealer;
    this.saleProjectform.patchValue({merchant:dealer});

    this._message.info('获取商户', dealer.name);
    this._filingService.agency(dealer.id).then(res => {
      this.dealerIsOk = true;
      this.linkman = ''; // 使 --请选择--  选项高亮
      this.linkManData = res as FilingInfoModel[];
    });
  }
  /**
   * 联系人匹配函数
   * @param {FilingInfoModel} linkman1
   * @param {FilingInfoModel} linkman2
   * @returns {boolean | boolean}
   */
  linkmanCompareWithFunc(linkman1: FilingInfoModel, linkman2: FilingInfoModel) {
    return (linkman1 && linkman2) ? linkman1.phone === linkman2.phone : false;
  }

  /**
   * 选择好了联系人的事件
   * @param event
   * @param value
   */
  linkmanSelecteFunc() {
    // console.info(this.linkman);
    this.linkmanSelected = this.linkman;
    // console.info(this.linkmanSelected);
  }

  save(){

    console.log("输出对象",this.form.value);
    this.commonAutionService.editCar(this.form.value).then(res=>{
      this._message.success('','修改项目成功!');
      this.goBack();
    }).catch(err=>{
      this._message.error('',err.json().message);
    })
  }

  goBack() {
    this.router.navigate( ['/pages/common-auction/auction-manage']);
  }

}
