import {Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'ngx-market-photo',
  templateUrl: './market-photo.component.html',
  providers: [MarketService, MessageService],
})

export class MarketPhotoComponent implements OnInit {

  marketId = '';
  marketName = '';
 market = {
   id: '',
   name: '',
 };
 searchData = {
    business : '',
    certificateCode: '',
    formName: '',
    market : {
       id:  this.marketId,
       name: this.marketName,
    },
 };
//  object = new Marketphotomap();
 business = [];
 CertificateCode = [];
 formName = [];
  constructor(private fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private marketService: MarketService,
              private message: MessageService ) {

    this.route.params.subscribe((params: Params) => {
      this.marketId = params['id'];
      this.marketName = params['marketName'];
      this.market.id = this.marketId;
      this.market.name = this.marketName;
      this.searchData.market.id =  params['id'];
      this.searchData.market.name = this.marketName;
      // this.searchData.market(...this.market);
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
    this.marketService.findBusiness(this.market).then(res => {
      console.log('返回的业务', res);
      this.business = res;
    });
  }

  selecctBusiness(data, event, index) {
    event.stopPropagation();
    console.log('切换11');
    this.searchData.business = data;
     console.log('选择了', data, this.searchData);
     this.marketService.findCertificateCode(this.searchData).then(res => {
        console.log('返回的证件类型', data, event.target , index);
        this.CertificateCode = res;
     });
  }


  selectCertificateCode(data, event) {
    event.stopPropagation();
    this.searchData.certificateCode = data;
    this.marketService.findFormName(this.searchData).then(res => {
      this.formName = res;
      // console.log('cateCode', res);
      // this.CertificateCode = res;
   });
  }
  selectFormName(data, event) {
    event.stopPropagation();
    this.searchData.formName = data;
    this.marketService.findMarketPhoto(this.searchData).then(res => {
    });
    console.log(this.searchData);
  }

  edit(row: any) {
    this.router.navigate(['/pages/system/market/photo/edit', { marketId: this.marketId, marketName: this.marketName, id: row.id }]);

    // console.log('编辑', row);
    // this.display = true;
    // this.isEdit = true;
    // this.marketService.getPhoto(row.id).then(res => {
    //   console.log('获取到的', res);
    //   this.form.patchValue({
    //     id : res.id,
    //     name : res.name,
    //     certificateCode : res.certificateCode,
    //     formName :  res.formName,
    //     status : res.status,
    //     max: res.max,
    //     min: res.min,
    //     sort: res.sort,
    //     business: res.business,
    //     memo: res.memo,
    //   });
    // }).catch(err => {
    //   this.message.error('获取失败', err.json().message);
    // });
  }


  add() {
    this.router.navigate(['/pages/system/market/photo/edit', { marketId: this.marketId, marketName: this.marketName }]);
  }

  back() {
    this.router.navigateByUrl('/pages/system/market/market');
  }
}
