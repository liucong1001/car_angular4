import {Directive, HostListener, Input} from '@angular/core';
import {FileSystemService} from '../../../data/system/file-system.service';
import {LocalstorageService} from '../../../cache/localstorage.service';
import {PhotoDetailComponent} from './photo-detail.component';

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
  @Input() iwp_urls?: Array<string>;
  @Input() iwp_photoDetailTmp: PhotoDetailComponent;
  @HostListener('focus', ['$event'])
  focus(event) {
    this.iwp_photoDetailTmp.setPhotoUrl(this.iwp_urls['03']);
    this.iwp_photoDetailTmp.ifShow(true);
  }
  @HostListener('blur', ['$event'])
  blur(event) {
    this.iwp_photoDetailTmp.ifShow(false);
  }

  /**
   * 可以支持传递属性的指令
   */
  constructor(
    private _file: FileSystemService,
  //   private _localstorage: LocalstorageService,
  ) {
  //   let maybe_vehicle = this._localstorage.get('bussiness_prejudication_recording_sellers_photos_urls');
  }
}
