import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {RebateFormService} from '../../../@core/data/common-aution/rebateForm.service';
import {MessageService} from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-rebate-form',
  templateUrl: './rebate-form.component.html',
  styleUrls: ['./rebate-form.component.scss'],
  providers:[DatePipe,RebateFormService,MessageService],
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
export class RebateFormComponent implements OnInit, OnChanges {

  constructor(private fb: FormBuilder,private datePipe: DatePipe,private rebateFormService:RebateFormService,
   private msg:MessageService) { }

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
  form: FormGroup = this.fb.group({
    collectType: ['', [Validators.required]],
    dayDate: [''],
    monthDate: ['', ],
    startDate: [''],
    endDate: [''],
  });
  // 列表搜索条件对象
  filter: any = {};
  //查询数据定义

  dataList:any = [];

  getDayValue($event){
    this.form.patchValue({dayDate:this.datePipe.transform($event, 'yyyy-MM-dd')});
  }
  getMonthValue($event){
    this.form.patchValue({monthDate:this.datePipe.transform($event, 'yyyy-MM')});
  }
  getstartDateValue($event) {
    this.form.patchValue({startDate:this.datePipe.transform($event, 'yyyy-MM-dd')});
  }
  getendDateValue($event) {
    this.form.patchValue({endDate:this.datePipe.transform($event, 'yyyy-MM-dd')});
  }

  search(){
    console.log('查询',this.form.value);
    this.rebateFormService.search(this.form.value).then(res=>{
        this.dataList  = res;
        if(res.length==0){
          this.msg.success('','没有查询到任何内容');
        }
    }).catch(err=>{
         this.msg.error('查询失败',err.json().message);
    })
  }
  export(){
    this.rebateFormService.exportExcel(this.form.value).then(res=>{

      var blob = new Blob([res], {type: "application/vnd.ms-excel"});
      var objectUrl = URL.createObjectURL(blob);
      var filename="返点报表"+'.xls';
      if (window.navigator.msSaveOrOpenBlob) {// For IE:
        navigator.msSaveBlob(blob, filename);
      }else{ // For other browsers:
        URL.revokeObjectURL(objectUrl);
      }

    }).catch(err=>{
      this.msg.error('导出失败',err.json().message);
    })
  }
}
