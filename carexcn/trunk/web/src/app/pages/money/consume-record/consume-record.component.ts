import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IcCardServise} from '../../../@core/data/ic-card/ic-card.servise';
import {CardModel} from '../../../@core/model/bussiness/card.model';

@Component({
  selector: 'ngx-consume-record',
  templateUrl: './consume-record.component.html',
  styleUrls: ['./consume-record.component.scss'],
  /*styles: [`
        form{
          overflow: hidden;
        }
    `,
  ],*/
  // 定义动画
  animations: [
    trigger('visibilityChanged', [
      // state 控制不同的状态下对应的不同的样式
      state('shown' , style({ height: 'auto'})),
      state('hidden', style({ height: '0px',  opacity: '0'})),
      // transition 控制状态到状态以什么样的方式来进行转换
      transition('shown <=> hidden', [animate('100ms ease-in-out'), animate('100ms')] ),
    ]),
  ],
})
export class ConsumeRecordComponent implements OnInit, OnChanges {

  constructor(private icCardService: IcCardServise) { }

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
  card: CardModel;
  // 组件初始华
  ngOnInit(): void {
    this.icCardService.getCard().then(cards => this.card = cards as CardModel);
  }
  // 列表搜索条件对象
  filter: any = {};

}
