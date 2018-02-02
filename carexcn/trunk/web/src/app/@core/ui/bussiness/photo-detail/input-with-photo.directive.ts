import {Directive, Attribute, HostListener, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import { NgControl } from '@angular/forms';
import {FileSystemService} from '../../../data/system/file-system.service';
import {LocalstorageService} from '../../../cache/localstorage.service';
import {IWPDisplayParam} from './IWP-display.param';

@Directive({
  selector: '[ngxInputWithPhoto]',
})
export class InputWithPhotoDirective {
  /**
   * 图片显示路径
   * 支持 "tmp:","id:","http://......1.jpg" 等格式
   * 支持从浏览器缓存中读取iwp_urls
   * [额外说明]：动态图片表单不能在为选择证件类型时input中绑定单个url
   * 但是方便的在选择证件类型时取到所有url，这种情况建议存入缓存中，会自动读取对比
   */
  @Input() iwp_url?: string;
  /**
   * 当前附件类型，(编码)
   */
  @Input() iwp_photoType: string;

  @Output() iwp_display = new EventEmitter();
  @HostListener('focus', ['$event'])
  focus(event) {
    this.iwp_display.emit({display: true, field: this.control.name} as IWPDisplayParam);
  }
  @HostListener('blur', ['$event'])
  blur(event) {
    this.iwp_display.emit({display: false, field: this.control.name} as IWPDisplayParam);
  }

  /**
   * 可以支持传递属性的指令
   */
  constructor(
  //   // @Attribute('formControlName') public formControlName: string,
  //   // private el: ElementRef,
    private control: NgControl,
  //   private _file: FileSystemService,
  //   private _localstorage: LocalstorageService,
  ) {
  //   // console.info('formControlName', formControlName);
  //   // let valueToTransform = this.el.nativeElement.value;
  //   console.info('control', this.control);
  //   /**
  //    * fieldName
  //    */
  //   console.info('name', this.control.name);
  //   let maybe_vehicle = this._localstorage.get('bussiness_prejudication_recording_sellers_photos_urls');
  }
}
