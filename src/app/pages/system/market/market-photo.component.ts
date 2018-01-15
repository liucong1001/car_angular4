import { promise } from 'selenium-webdriver';
import {Component, OnInit, ViewChild, Injectable} from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Http} from '@angular/http';
import {Column, TableComponent} from '../../../@core/ui/table/table.component';
import {Marketphotomap} from './../../../@core/model/system/market-photo-map';
import {MarketService} from '../../../@core/data/system/market.service';
import {MessageService} from '../../../@core/utils/message.service';
import {PanelMenuModule, MenuItem} from 'primeng/primeng';
import { resolve } from 'q';


@Component({
  selector: 'ngx-market-photo',
  templateUrl: './market-photo.component.html',
  providers: [MarketService, MessageService],
})
@Injectable()
export class MarketPhotoComponent implements OnInit {

  marketId = '';
  marketName = '';
  marketisApp ='';
  photoType = '';
 market = {
   id: '',
   name: '',
 };
  marketData = {
     market:this.market,
     isApp :'',
  };
  /**
   * 添加查询数据
   * @type {{business: string; certificateCode: string; formName: string; isApp: string; market: {id: string; name: string}}}
   */
 searchData = {
    business : '',
    certificateCode: '',
    formName: '',
    isApp:'',
    market : {
       id:  this.marketId,
       name: this.marketName,
    },
 };

 business = [];
 CertificateCode = [];
 formName = [];
 photoData = [];
  constructor(private fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private marketService: MarketService,
              private message: MessageService ) {

    this.route.params.subscribe((params: Params) => {
      this.marketId = params['id'];
      this.marketName = params['marketName'];
      this.marketisApp = params['isApp'];
       if(this.marketisApp=='0'){
           this.photoType='PC端';
       } else if(this.marketisApp=='1'){
           this.photoType='APP端';
       }


      this.market.id = this.marketId;
      this.market.name = this.marketName;
      this.marketData.isApp=this.marketisApp;
      this.searchData.market.id =  params['id'];
      this.searchData.market.name = this.marketName;
      this.searchData.isApp = this.marketisApp;
    });
  }



  // 列表列定义
  columns: Column[] = [
    {title: '名称', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '业务类型', titleClass: '', cell: new TextCell('business')} as Column,
    {title: '证件类型', titleClass: '', cell: new TextCell('certificateCode')} as Column,
    {title: '表单名称', titleClass: '', cell: new TextCell('formName')} as Column,
    {title: '代号', titleClass: '', cell: new TextCell('cloudUser')} as Column,
    {title: '备注', titleClass: '', cell: new TextCell('memo')} as Column,
    {title: '状态', titleClass: '', cell: new TextCell('status')} as Column,
    {title: '最大张数', titleClass: '', cell: new TextCell('max')} as Column,
    {title: '最小张数', titleClass: '', cell: new TextCell('min')} as Column,
    {title: '拍照顺序', titleClass: '', cell: new TextCell('sort')} as Column,
    {
      title: '备注', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        new Menu('编辑', '', this.edit.bind(this)),
        new Menu('禁用', '', this.disable),
      ],
      new Menu('查看', '', this.view), 'text-center',
    ) ,
    } as Column,
  ];
  // 列表菜单回调
  view(row: any, drop: any) {
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
    this.marketService.getBusiness(this.marketData).then(res =>{
      this.business = res;
      console.log(this.business[0]);
      this.selecctBusiness({data: this.business[0], index: 0})
    });
  }

  selecctBusiness(result) {
    this.searchData.business = result.data;
    this.marketService.findCertificateCode(this.searchData).then(res => {
        this.CertificateCode = res;
    });
  }


  selectCertificateCode(result) {
    this.searchData.certificateCode = result.data;
    this.marketService.findFormName(this.searchData).then(res => {
      this.formName = res;
   });
  }

  selectFormName(result) {
    this.searchData.formName = result.data;
    this.marketService.findMarketPhoto(this.searchData).then(res => {
      this.photoData = res;
    });
  }

  edit(data) {
    this.router.navigate(['/pages/system/market/market/photo/edit', { marketId: this.marketId, marketName: this.marketName, id: data.id,marketisApp:this.marketisApp }]);
  }

  /**
   * 添加新证件
   */

  add() {
    this.router.navigate(['/pages/system/market/market/photo/edit', { marketId: this.marketId, marketName: this.marketName ,marketisApp:this.marketisApp,
      business:this.searchData.business,certificateCode:this.searchData.certificateCode,formName:this.searchData.formName}]);
  }

  back() {
    this.router.navigateByUrl('/pages/system/market/market');
  }
}
