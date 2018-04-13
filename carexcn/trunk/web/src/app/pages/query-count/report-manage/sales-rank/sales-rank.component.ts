import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Location} from '@angular/common';
import {ReportManageService} from "../../../../@core/data/query-count/report-manage.service";
import { MessageService } from './../../../../@core/utils/message.service';

@Component({
  selector: 'ngx-sales-rank',
  templateUrl: './sales-rank.component.html',
  styleUrls: ['./sales-rank.component.scss'],
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
  providers:[ReportManageService, MessageService],
})
export class SalesRankComponent implements OnInit, OnChanges {

  constructor(
    private location: Location,
    private reportService:ReportManageService,
    private message: MessageService,
  ) { }

  visibility = 'shown';
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
  }

  /*返回*/
  goBack() {
    this.location.back();
  }

  size: any = 5;
  saloonCarList:any = [];
  passengerCarList:any = [];
  goodsCarList:any = [];
  specialList:any = [];

  /**时间在result对象中取值即可得到开始时间，结束时间
   * {startDate: "2018-03-06", endDate: "2018-03-22"}
   * @param result
   */
  search(result){
    this.reportService.salesRanking(result.startDate,result.endDate,this.size).then(res=>{
      this.message.success('查询成功', `` );
      this.saloonCarList  = res.saloonCarList;
      this.passengerCarList  = res.passengerCarList;
      this.goodsCarList  = res.goodsCarList;
      this.specialList  = res.specialList;
    }).catch(err => {
      this.message.error('查询失败', err.message);
    });
  }

  /**
   * 导出Excel表
   * @param result
   */
  export(result){
    this.reportService.down(result.startDate,result.endDate).then(res=>{
          this.reportService.saveExcel(res,'二手车销售排行表');
    })
  }


}
