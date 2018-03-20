import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'ngx-ys-nav-step',
  templateUrl: './nav-step.component.html',
  styleUrls: ['./nav-step.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavStepComponent implements OnInit {
  @Input() items: Array<MenuItem>;
  /**
   * 本组件提供可配置化的步骤导航功能
   * 1、明显清晰的步骤说明
   * 2、当前处于第几步的标识
   * 3、方便的页面跳转
   */
  constructor() { }
  ngOnInit() {}
}
