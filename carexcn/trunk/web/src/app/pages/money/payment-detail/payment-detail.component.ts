import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CardModel} from '../../../@core/model/business/card.model';


@Component({
  selector: 'ngx-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss'],
 /* styles: [`
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
export class PaymentDetailComponent implements OnInit, OnChanges {

  // public cardData: CardModel = new CardModel();
  public cardsData: CardModel[];
  constructor() {
    // this.cardService.getCards('1').then((res) => this.cardsData = res as CardModel[]);

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

  /*添加*/
  /*add(number: string): void {
    number = number.trim();
    if (!number) {return ; }
    this.cardService.create(number).then(card => {this.cardsData.push(card) ; });
  }
*/
}
