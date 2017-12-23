import {Marketfeemap} from "./../../../@core/model/system/market-fee-map";
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
  selector: 'ngx-market-fee',
  templateUrl: './market-fee.component.html',
  providers: [MarketService, MessageService],
})

export class MarketFeeComponent implements OnInit {

  // 业务费用模态框
  display = false;
  invoice = false;
  discount = false;
  required = false;
  marketId = ''

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
    businessType: ['', [Validators.required]],
    // cloudUser: ['0001', [Validators.required]],
    money: ['', [Validators.required]],
    invoice: ['', [Validators.required]],
    discount: ['', [Validators.required]],
    required: ['', [Validators.required]],
    priceType: ['', [Validators.required]],
    memo: [''],
    id:[''],
  });

  // 列表列定义
  columns: Column[] = [
    {title: '费用名', titleClass: '', cell: new TextCell('name')} as Column,
    {title: '业务类型', titleClass: '', cell: new TextCell('businessType')} as Column,
    {title: '价格类型', titleClass: '', cell: new TextCell('priceType')} as Column,
    {title: '费用', titleClass: '', cell: new TextCell('money')} as Column,
    {title: '计入开票', titleClass: '', cell: new TextCell('invoice')} as Column,
    {title: '考虑折扣', titleClass: '', cell: new TextCell('discount')} as Column,
    {title: '必选', titleClass: '', cell: new TextCell('required')} as Column,
    {title: '操作', titleClass: '', cell: new TextCell('memo')} as Column,
    {
      title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
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

  edit(row: any) {
     console.log('编辑',row);
     this.display = true;
     // const that=this;
    this.marketService.getFee(row.id).then(res => {
        console.log('获取到的',res);
        this.form.patchValue({
          id:res.id,
          name : res.name,
          businessType : res.businessType,
          priceType: res.priceType,
          money:res.money,
          invoice:res.invoice,
          discount:res.discount,
          required:res.required,
          memo:res.memo,
        });
      // Marketfeemap.keys(value).forEach(name => {
      //   if (this.controls[name]) {
      //     this.controls[name].patchValue(value[name], {onlySelf: true, emitEvent});
      //   }
      // });
    }).catch(err => {
      // this.message.error('获取失败', err.json().message);
    });


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
    const marketfeemap = this.form.value as Marketfeemap;
    window.console.log('费用', marketfeemap);
    this.marketService.saveFee(marketfeemap).then(res => {
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
