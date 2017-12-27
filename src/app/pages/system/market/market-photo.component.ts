import {Component, OnInit, ViewChild} from "@angular/core";
import {Menu, MenuCell} from "../../../@core/ui/table/cell.menu.component";
import {TextCell} from "../../../@core/ui/table/cell.text.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router,Params} from "@angular/router";
import {Http} from "@angular/http";
import {Column, TableComponent} from "../../../@core/ui/table/table.component";
import {Marketphotomap} from "./../../../@core/model/system/market-photo-map";
import {MarketService} from "../../../@core/data/system/market.service";
import {MessageService} from "../../../@core/utils/message.service";

@Component({
  selector: 'ngx-market-photo',
  templateUrl: './market-photo.component.html',
  providers: [MarketService, MessageService],
})

export class MarketPhotoComponent implements OnInit {

  // 业务费用模态框
  display = false;
  invoice = false;
  discount = false;
  required = false;
  marketId = '';
  isEdit = false;
  marketName = '';

  constructor(private fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private marketService: MarketService,
              private message: MessageService,) {

    this.route.params.subscribe((params: Params) => {
      this.marketId = params['id'];
      this.marketName = params['marketName'];
    });
  }

  form: FormGroup = this.fb.group({
    id:[''],
    name: ['', [Validators.required]],
    // cloudUser: ['', [Validators.required]],
    memo: [''],
    certificateCode: ['', [Validators.required]],
    photoCode: ['', [Validators.required]],
    status: ['', [Validators.required]],
    max: ['', [Validators.required]],
    min: ['', [Validators.required]],
    sort: ['', [Validators.required]],
    business: ['', [Validators.required]],
  });

  // 列表列定义
  columns: Column[] = [
    {title: '名称', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '代号', titleClass: '', cell: new TextCell('cloudUser')} as Column,
    {title: '备注', titleClass: '', cell: new TextCell('memo')} as Column,
    {title: '证件类型', titleClass: '', cell: new TextCell('certificateCode')} as Column,
    // {title: '拍摄张数', titleClass: '', cell: new TextCell('photoCode')} as Column,
    {title: '状态', titleClass: '', cell: new TextCell('status')} as Column,
    {title: '最大张数', titleClass: '', cell: new TextCell('max')} as Column,
    {title: '最小张数', titleClass: '', cell: new TextCell('min')} as Column,
    {title: '拍照顺序', titleClass: '', cell: new TextCell('sort')} as Column,
    {title: '业务类型', titleClass: '', cell: new TextCell('business')} as Column,

    {
      title: '备注', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        new Menu('编辑', '', this.edit.bind(this)),
        new Menu('禁用', '', this.disable),
      ],
      new Menu('查看', '', this.view), 'text-center',
    )
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
  }

  show() {
    this.display = true;
  }

  close() {
    this.form.reset();
    this.display = false;
  }

  edit(row: any) {
    console.log('编辑',row);
    this.display = true;
    this.isEdit = true;
    this.marketService.getPhoto(row.id).then(res => {
      console.log('获取到的',res);
      this.form.patchValue({
        id : res.id,
        name : res.name,
        certificateCode : res.certificateCode,
        photoCode :res.photoCode,
        status :res.status,
        max:res.max,
        min:res.min,
        sort:res.sort,
        business:res.business,
        memo:res.memo,
      });
    }).catch(err => {
      this.message.error('获取失败', err.json().message);
    });
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


    const marketphotomap = this.form.value as Marketphotomap;
    window.console.log('保存的对象', marketphotomap);
    if(this.isEdit){
      this.marketService.savePhotoEdit(marketphotomap).then(res => {
        this.message.success('保存成功', '费用保存成功');
        this.close();
        this.itemList.reload();
        this.isEdit = false;
      }).catch(err => {
        this.message.error('保存失败', err.json().message);
      });
    }else {
      this.form.value.id = this.marketId;
      this.marketService.savePhoto(marketphotomap).then(res => {
        this.message.success('保存成功', '费用保存成功');
        this.close();
        this.itemList.reload();
        this.isEdit = false;
      }).catch(err => {
        this.message.error('保存失败', err.json().message);
      });
    }


  }

  back() {
    this.router.navigateByUrl('/pages/system/market');
  }
}
