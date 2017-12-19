import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
// import {CardModel} from '../../../@core/model/bussiness/card.model';
import {DeviceService} from '../../../@core/device/device.service';
import {Card} from '../../../@core/model/bussiness/card';
import {CARDS} from '../../../@core/data/ic-card/iccard';

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

  constructor() { }

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
  // cards: CardModel[];
  // 组件初始华
  ngOnInit(): void {
    // this.icCardService.getCard().then(cards => this.cards = cards as CardModel[]);
  }
  // 列表搜索条件对象
  filter: any = {};
  card: Card = {
    number: '000000',
    id: 'A0000',
  };
  cards = CARDS;
  // selectCard: Card; /*定义一个selectCard作为展示详情的变量*/
  // onSelect (card: Card): void {
  //   this.selectCard = card; /*通过参数赋值*/
  // }
}
