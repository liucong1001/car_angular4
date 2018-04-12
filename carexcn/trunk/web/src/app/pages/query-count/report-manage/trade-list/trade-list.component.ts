import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Location} from '@angular/common';
import {ReportManageService} from "../../../../@core/data/query-count/report-manage.service";
import { MessageService } from './../../../../@core/utils/message.service';

@Component({
  selector: 'ngx-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers:[ReportManageService,MessageService],
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
export class TradeListComponent implements OnInit, OnChanges {

  constructor(
    private location: Location,
    private reportService:ReportManageService,
    private message: MessageService,) {
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
  }

// 列表搜索条件对象
  filter: any = {};
  /*返回*/
  goBack() {
    this.location.back();
  }

  dataList:any = [];

  /**
   * 查询
   */
  search(result){
    this.reportService.queryMerchant(result.startDate,result.endDate).then(res=>{
      this.message.success('查询成功', `` );
      this.dataList  = res;
    }).catch(err => {
      this.message.error('查询失败', err.message);
    });
  }
}
