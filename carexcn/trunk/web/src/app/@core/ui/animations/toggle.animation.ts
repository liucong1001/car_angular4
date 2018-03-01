import {animate, state, style, transition, trigger} from '@angular/animations';

export const visibilityToggle = trigger('visibilityChanged', [
  // state 控制不同的状态下对应的不同的样式
  state('shown' , style({ height: 'auto'})),
  state('hidden', style({ height: '0px',  opacity: '0'})),
  // transition 控制状态到状态以什么样的方式来进行转换
  transition('shown <=> hidden', [animate('100ms ease-in-out'), animate('100ms')] ),
])
;
