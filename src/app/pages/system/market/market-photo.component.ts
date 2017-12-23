import {Marketphotomap} from "./../../../@core/model/system/market-photo-map";
import {Component, OnInit, ViewChild} from "@angular/core";
import {Menu, MenuCell} from "../../../@core/ui/table/cell.menu.component";
import {TextCell} from "../../../@core/ui/table/cell.text.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router,Params} from "@angular/router";
import {Http} from "@angular/http";
import {Column, TableComponent} from "../../../@core/ui/table/table.component";
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

  constructor(private fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private marketService: MarketService,
              private message: MessageService,) {

    this.route.params.subscribe((params: Params) => {
      this.marketId = params['id'];
    });
  }

  form: FormGroup = this.fb.group({
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
    {title: '证件类型代码集', titleClass: '', cell: new TextCell('certificateCode')} as Column,
    {title: '拍摄张数', titleClass: '', cell: new TextCell('photoCode')} as Column,
    {title: '状态', titleClass: '', cell: new TextCell('status')} as Column,
    {title: '最大张数', titleClass: '', cell: new TextCell('max')} as Column,
    {title: '最小张数', titleClass: '', cell: new TextCell('min')} as Column,
    {title: '拍照顺序', titleClass: '', cell: new TextCell('sort')} as Column,
    {title: '业务类型', titleClass: '', cell: new TextCell('business')} as Column,

    {
      title: '备注', titleClass: 'w-25 text-center', cell: new MenuCell(
      [
        new Menu('编辑', '', 'edit'),
        new Menu('禁用', '', this.disable),
      ],
      new Menu('查看', '', this.view), 'text-center',
    )
    } as Column,
  ];
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

  /**
   * 代码项搜索条件
   * @type {{}}
   */
  filter: any = {};

  ngOnInit() {
    this.http.get('/rest/sys/market/photo/config').toPromise().then(function (res) {
       console.log('所有啊');
    })
  }

  show() {
    this.display = true;
  }

  close() {
    this.form.reset();
    this.display = false;
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
    this.form.value.id = this.marketId;
    window.console.log('保存的对象', this.form.value);
    const marketphotomap = this.form.value as Marketphotomap;
    this.marketService.savePhoto(marketphotomap).then(res => {
      this.message.success('保存成功', '费用保存成功');
      this.close();
      this.itemList.reload();
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }

  back() {
    this.router.navigateByUrl('/pages/system/market');
  }
}
