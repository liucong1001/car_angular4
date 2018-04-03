import {Component, OnChanges, OnInit, TemplateRef, ViewChild, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {CodemapCell, CustomCell} from '../../../@core/ui/table/cell';

@Component({
  selector: 'ngx-appendix-query',
  templateUrl: './appendix-query.component.html',
  styleUrls: ['./appendix-query.component.scss'],
  /*styles: [`
    form {
      overflow: hidden;
    }
  `,
  ],*/
  // 定义动画
  animations: [
    trigger('visibilityChanged', [
      // state 控制不同的状态下对应的不同的样式
      state('shown', style({height: 'auto'})),
      state('hidden', style({height: '0px', opacity: '0'})),
      // transition 控制状态到状态以什么样的方式来进行转换
      transition('shown <=> hidden', [animate('100ms ease-in-out'), animate('100ms')]),
    ]),
  ],
})


export class AppendixQueryComponent implements OnInit, OnChanges {
  public type: any;

  constructor() {
    this.type = '01';
    this.filter.billStatus='';
  }

  visibility = 'hidden';
  showFilter = false;

  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }

  // ngOnChanges 可监控组件变量
  ngOnChanges(changes: SimpleChanges): void {
  }

  // 组件初始华
  ngOnInit(): void {
    this.temp = [];
    this.columns = [
      {title: '流水号', titleClass: 'w-25 text-center', cell: new TextCell('archiveNo')} as Column,
      {title: '卖家个人图像', titleClass: 'w-10 text-center', cell: new CustomCell(this.seller_regPhotoi)} as Column,
      {title: '卖家身份证正面', titleClass: 'w-15 text-center', cell: new CustomCell(this.seller_idCardFronti)} as Column,
      {title: '卖家身份证反面', titleClass: 'w-10 text-center', cell: new CustomCell(this.seller_idCardBgi)} as Column,
      {title: '卖家个人指纹', titleClass: 'w-20 text-center', cell: new CustomCell(this.seller_fingerprintImgi)} as Column,
      {title: '组织机构正面', titleClass: 'w-20 text-center', cell: new CustomCell(this.seller_businessCert)} as Column,
      // { title: '组织机构反面', titleClass: 'w-20 text-center', cell: new CustomCell(this.seller_regPhotoi) } as Column,
    ];

  }

  // 图片展示索引的状态  ture 为选中状态，false 为未选中状态
  index = [true, true, true, true, true, true, true];
  // 列表搜索条件对象
  filter: any = {};
  // 通过 ViewChild 主动获取子组件的数据和方法
  @ViewChild('seller_regPhotoi') private seller_regPhotoi: TemplateRef<any>;
  @ViewChild('seller_idCardFronti') private seller_idCardFronti: TemplateRef<any>;
  @ViewChild('seller_idCardBgi') private seller_idCardBgi: TemplateRef<any>;
  @ViewChild('seller_fingerprintImgi') private seller_fingerprintImgi: TemplateRef<any>;
  @ViewChild('seller_businessCert') private seller_businessCert: TemplateRef<any>;
  // @ViewChild('seller_businessCertBg') private seller_businessCertBg: TemplateRef<any>;

  @ViewChild('sellerTrustor_regPhoto') private sellerTrustor_regPhoto: TemplateRef<any>;
  @ViewChild('sellerTrustor_fingerprintImg') private sellerTrustor_fingerprintImg: TemplateRef<any>;
  @ViewChild('sellerTrustor_idCardFront') private sellerTrustor_idCardFront: TemplateRef<any>;
  @ViewChild('sellerTrustor_idCardBg') private sellerTrustor_idCardBg: TemplateRef<any>;
  @ViewChild('sellerTrustor_entrustBook') private sellerTrustor_entrustBook: TemplateRef<any>;

  @ViewChild('buyer_regPhoto') private buyer_regPhoto: TemplateRef<any>;
  @ViewChild('buyer_idCardFront') private buyer_idCardFront: TemplateRef<any>;
  @ViewChild('buyer_idCardBg') private buyer_idCardBg: TemplateRef<any>;
  @ViewChild('buyer_fingerprintImg') private buyer_fingerprintImg: TemplateRef<any>;
  @ViewChild('buyer_businessCert') private buyer_businessCert: TemplateRef<any>;
  // @ViewChild('buyer_businessCertBg') private buyer_businessCertBg: TemplateRef<any>;

  @ViewChild('buyerTrustor_regPhoto') private buyerTrustor_regPhoto: TemplateRef<any>;
  @ViewChild('buyerTrustor_fingerprintImg') private buyerTrustor_fingerprintImg: TemplateRef<any>;
  @ViewChild('buyerTrustor_idCardFront') private buyerTrustor_idCardFront: TemplateRef<any>;
  @ViewChild('buyerTrustor_idCardBg') private buyerTrustor_idCardBg: TemplateRef<any>;
  @ViewChild('buyerTrustor_entrustBook') private buyerTrustor_entrustBook: TemplateRef<any>;

  @ViewChild('vehicleCert') private vehicleCert: TemplateRef<any>;
  @ViewChild('vehicleCertBg') private vehicleCertBg: TemplateRef<any>;
  @ViewChild('vehicle_registrationCert') private vehicle_registrationCert: TemplateRef<any>;
  @ViewChild('vehicle_registrationCertBg') private vehicle_registrationCertBg: TemplateRef<any>;

  // @ViewChild('notarizationFile1') private notarizationFile1: TemplateRef<any>;
  // @ViewChild('notarizationFile2') private notarizationFile2: TemplateRef<any>;
  // @ViewChild('notarizationFile3') private notarizationFile3: TemplateRef<any>;
  // @ViewChild('notarizationFile4') private notarizationFile4: TemplateRef<any>;
  // @ViewChild('notarizationFile5') private notarizationFile5: TemplateRef<any>;
  // @ViewChild('notarizationFile6') private notarizationFile6: TemplateRef<any>;

  @ViewChild('vat1') private vat1: TemplateRef<any>;
  @ViewChild('vat2') private vat2: TemplateRef<any>;
  @ViewChild('vat3') private vat3: TemplateRef<any>;
  @ViewChild('vat4') private vat4: TemplateRef<any>;
  @ViewChild('vat5') private vat5: TemplateRef<any>;
  @ViewChild('vat6') private vat6: TemplateRef<any>;

  @ViewChild('vehicle_transferProxy') private vehicle_transferProxy: TemplateRef<any>;

  // 列表列定义
  columns: Column[];
  temp: Column[];

  // 列表菜单回调
  view(row: any, drop: any) {

  }

  edit(row: any) {

  }

  disable(row: any) {

  }

  // achieveStartDate:string ;
  // achieveEndDate:string ;
  // examineStartDate:string ;
  // examineEndDate:string ;
// 过户审核起始日
  getAchieveStartDate($event) {
    // + ' 00:00:00'
    this.filter.transferDateStart = $event ;
  }

  // 过户审核截止日
  getAchieveEndDate($event) {
    this.filter.transferDateEnd = $event ;
  }

  // 预审审核起始日
  getExamineStartDate($event) {
    this.filter.preDateStart = $event ;
  }

  // 预审审核截止日
  getExamineEndDate($event) {
    this.filter.preDateEnd = $event ;
  }


  select(type: any) {
    if (type === '01') {
      this.columns = [
        {title: '流水号', titleClass: 'w-25 text-center', cell: new TextCell('archiveNo')} as Column,
        {title: '卖家个人图像', titleClass: 'w-10 text-center', cell: new CustomCell(this.seller_regPhotoi)} as Column,
        {title: '卖家身份证正面', titleClass: 'w-15 text-center', cell: new CustomCell(this.seller_idCardFronti)} as Column,
        {title: '卖家身份证反面', titleClass: 'w-10 text-center', cell: new CustomCell(this.seller_idCardBgi)} as Column,
        {title: '卖家个人指纹', titleClass: 'w-20 text-center', cell: new CustomCell(this.seller_fingerprintImgi)} as Column,
        {title: '组织机构正面', titleClass: 'w-20 text-center', cell: new CustomCell(this.seller_businessCert)} as Column,
        // { title: '组织机构反面', titleClass: 'w-20 text-center', cell: new CustomCell(this.seller_businessCertBg) } as Column,
      ];
      this.index = [true, true, true, true, true, true, true];
      this.temp = [];
    } else if (type === '02') {
      this.columns = [
        {title: '流水号', titleClass: 'w-25 text-center', cell: new TextCell('archiveNo')} as Column,
        {title: '卖方受托人图像', titleClass: 'w-10 text-center', cell: new CustomCell(this.sellerTrustor_regPhoto)} as Column,
        {
          title: '卖方受托人指纹',
          titleClass: 'w-15 text-center',
          cell: new CustomCell(this.sellerTrustor_fingerprintImg)
        } as Column,
        {
          title: '卖方受托人证件正面',
          titleClass: 'w-10 text-center',
          cell: new CustomCell(this.sellerTrustor_idCardFront)
        } as Column,
        {
          title: '卖方受托人证件反面',
          titleClass: 'w-20 text-center',
          cell: new CustomCell(this.sellerTrustor_idCardBg)
        } as Column,
        {
          title: '卖方委托书',
          titleClass: 'w-20 text-center',
          cell: new CustomCell(this.sellerTrustor_entrustBook)
        } as Column,
      ];
      this.index = [true, true, true, true, true, true, true];
      this.temp = [];
    } else if (type === '03') {
      this.columns = [
        {title: '流水号', titleClass: 'w-25 text-center', cell: new TextCell('archiveNo')} as Column,
        {title: '买家图像', titleClass: 'w-10 text-center', cell: new CustomCell(this.buyer_regPhoto)} as Column,
        {title: '买家身份证(正)', titleClass: 'w-15 text-center', cell: new CustomCell(this.buyer_idCardFront)} as Column,
        {title: ' 买家身份证(反)', titleClass: 'w-10 text-center', cell: new CustomCell(this.buyer_idCardBg)} as Column,
        {title: '买家指纹', titleClass: 'w-20 text-center', cell: new CustomCell(this.buyer_fingerprintImg)} as Column,
        {title: '组织机构证书(正)', titleClass: 'w-20 text-center', cell: new CustomCell(this.buyer_businessCert)} as Column,
        // { title: '组织机构证书(反)', titleClass: 'w-20 text-center', cell: new CustomCell(this.buyer_businessCertBg) } as Column,
      ];
      this.index = [true, true, true, true, true, true, true];
      this.temp = [];
    } else if (type === '04') {
      this.columns = [
        {title: '流水号', titleClass: 'w-25 text-center', cell: new TextCell('archiveNo')} as Column,
        {title: '买方受托人图像', titleClass: 'w-10 text-center', cell: new CustomCell(this.buyerTrustor_regPhoto)} as Column,
        {
          title: '买方受托人指纹',
          titleClass: 'w-15 text-center',
          cell: new CustomCell(this.buyerTrustor_fingerprintImg)
        } as Column,
        {
          title: '买方受托人证件正面',
          titleClass: 'w-10 text-center',
          cell: new CustomCell(this.buyerTrustor_idCardFront)
        } as Column,
        {
          title: '买方受托人证件反面',
          titleClass: 'w-20 text-center',
          cell: new CustomCell(this.buyerTrustor_idCardBg)
        } as Column,
        {title: '买方委托书', titleClass: 'w-20 text-center', cell: new CustomCell(this.buyerTrustor_entrustBook)} as Column,
      ];
      this.index = [true, true, true, true, true, true, true];
      this.temp = [];
    } else if (type === '05') {
      this.columns = [
        {title: '流水号', titleClass: 'w-25 text-center', cell: new TextCell('archiveNo')} as Column,
        {title: '行驶证正面', titleClass: 'w-10 text-center', cell: new CustomCell(this.vehicleCert)} as Column,
        {title: '行驶证反面', titleClass: 'w-15 text-center', cell: new CustomCell(this.vehicleCertBg)} as Column,
        {
          title: '登记证书首页',
          titleClass: 'w-10 text-center',
          cell: new CustomCell(this.vehicle_registrationCert)
        } as Column,
        {
          title: '登记证书末页',
          titleClass: 'w-20 text-center',
          cell: new CustomCell(this.vehicle_registrationCertBg)
        } as Column,
      ];
      this.index = [true, true, true, true, true, true, true];
      this.temp = [];
    }
    //  else if (type == '06') {
    //   this.columns = [
    //     { title: '流水号', titleClass: 'w-25 text-center', cell: new TextCell('archiveNo') } as Column,
    //     { title: '公证书第一页', titleClass: 'w-10 text-center', cell: new CustomCell(this.notarizationFile1) } as Column,
    //     { title: '公证书第二页', titleClass: 'w-15 text-center', cell: new CustomCell(this.notarizationFile2) } as Column,
    //     { title: '公证书第三页', titleClass: 'w-10 text-center', cell: new CustomCell(this.notarizationFile3) } as Column,
    //     { title: '公证书第四页', titleClass: 'w-20 text-center', cell: new CustomCell(this.notarizationFile4) } as Column,
    //     { title: '公证书第五页', titleClass: 'w-20 text-center', cell: new CustomCell(this.notarizationFile5) } as Column,
    //     { title: '公证书第六页', titleClass: 'w-20 text-center', cell: new CustomCell(this.notarizationFile6) } as Column,
    //   ];
    //   this.index = [true, true, true, true, true, true, true];
    //   this.temp=[];
    // }
    else if (type === '07') {
      this.columns = [
        {title: '流水号', titleClass: 'w-25 text-center', cell: new TextCell('archiveNo')} as Column,
        {title: '增值税发票第一张', titleClass: 'w-10 text-center', cell: new CustomCell(this.vat1)} as Column,
        {title: '增值税发票第二张', titleClass: 'w-15 text-center', cell: new CustomCell(this.vat2)} as Column,
        {title: '增值税发票第三张', titleClass: 'w-10 text-center', cell: new CustomCell(this.vat3)} as Column,
        {title: '增值税发票第四张', titleClass: 'w-20 text-center', cell: new CustomCell(this.vat4)} as Column,
        {title: '增值税发票第五张', titleClass: 'w-20 text-center', cell: new CustomCell(this.vat5)} as Column,
        {title: '增值税发票第六张', titleClass: 'w-20 text-center', cell: new CustomCell(this.vat6)} as Column,
      ];
      this.index = [true, true, true, true, true, true, true];
      this.temp = [];
    } else {
      this.columns = [
        {title: '流水号', titleClass: 'w-25 text-center', cell: new TextCell('archiveNo')} as Column,
        {title: '商户车辆转让协议', titleClass: 'w-10 text-center', cell: new CustomCell(this.vehicle_transferProxy)} as Column,
      ];
      this.index = [true, true, true, true, true, true, true];
      this.temp = [];
    }
  }

  /**
   * number 索引值
   * name  名字
   * string
   */
  col: Column[] = [];

  toggle_photo(value: number) {
    let array = this.changeStatus(value);
    if (array.status) { // 返回true 表示由未选中到选中---添加
      for (let i = 0; i < this.columns.length; i++) {
        this.col.push(this.columns[i]);
        if (i === (value - array.top - 1)) {  // 索引
          // this.col.push(this.temp[value]);
          this.col.push(this.temp[value]);
        }
      }
    } else {  // 表示由选中到未选中--不添加
      for (let i = 0; i < this.columns.length; i++) {
        if (i !== (value - array.top)) {
          this.col.push(this.columns[i]);
        } else {
          this.temp[value] = this.columns[i];
        }
      }
    }
    // console.log(this.disableSignTemp);
    // console.log('添加',this.temp);
    // console.log('数组',this.columns);
    this.columns = this.col;
    this.col = [];
  }

  changeStatus(value: number) {
    let num1 = 0;
    let num2 = 0;
    this.index[value] = !this.index[value]  // 将是否选中取反  选中为true ，否则为false
    for (let i = 0; i < this.index.length; i++) {
      if (this.index[i] === false) {
        if (i < value) {
          num1++;
        } else {
          num2++;
        }
      }
    }
    return {top: num1, back: num2, status: this.index[value]};
  }

  object(data) {
    if (Object.keys(data).length === 0) {
      return true
    }
  }


}
