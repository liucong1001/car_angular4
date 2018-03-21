import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'ngx-ys-nav-step',
  templateUrl: './nav-step.component.html',
  styleUrls: ['./nav-step.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavStepComponent implements OnInit {
  /**
   * 导航菜单核心数据
   * @type {number}
   */
  @Input() steps: MenuItem[];
  /**
   * 当前导航第几步
   * @type {number}
   */
  @Input() activeIndex = 0;

  /**
   * 本组件提供可配置化的步骤导航功能
   * 1、明显清晰的步骤说明
   * 2、当前处于第几步的标识
   * 3、方便的页面跳转
   */
  constructor() {
  }

  ngOnInit() {
    if (this.steps) {
      for (let menu in this.steps) {
        if (Number(menu) > this.activeIndex) {
          this.steps[menu].disabled = true;
          delete this.steps[menu].routerLink;
        }
      }
    }
  }

  /**
   * 导航跳转事件
   */
  activeIndexChangeEvent(event) {
    this.activeIndex = event;
    console.info('activeIndexChangeEvent', event);
  }
}
