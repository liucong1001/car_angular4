import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FileSystemService} from '../../../data/system/file-system.service';

/**
 * 图片局部放大控件
 * 需要搭配图片局部放大指令(ngxInputWithPhoto)使用
 */
@Component({
  selector: 'ngx-ys-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss'],
})
export class PhotoDetailComponent implements OnInit, OnChanges {
  /**
   * 图片显示路径
   * 支持 "tmp:","id:","http://......1.jpg" 等格式
   * 支持从浏览器缓存中读取iwp_urls
   * [额外说明]：动态图片表单不能在为选择证件类型时input中绑定单个url
   * 但是方便的在选择证件类型时取到所有url，这种情况建议存入缓存中，会自动读取对比
   */
  @Input() photoUrl = '';
  private url: string;
  /**
   * 区域定位百分比的数字
   * @type {number}
   */
  @Input() top? = 0;
  /**
   * 当前照片的附件类型(编码)
   * @type {string}
   */
  @Input() type? = '';
  /**
   * 当前照片的附件字段名
   * @type {string}
   */
  @Input() field? = '';
  /**
   * 是否显示的开关
   * @type {boolean}
   */
  @Input() display = false;
  @ViewChild('img') img: ElementRef;
  @ViewChild('div') div: ElementRef;
  constructor(
    private _file: FileSystemService,
  ) {}
  ngOnInit() {
    if (this.photoUrl === undefined && this.display === undefined) {
      // 初始化情况 忽略 错误
    } else {
      if (this.photoUrl == null || this.photoUrl === undefined) {
        console.info(this.photoUrl);
        throw new Error('photoUrl 属性是必须的！');
      }
      if (this.display == null || this.display === undefined) {
        throw new Error('display 属性是必须的！');
      }
      if (this.top == null || this.top === undefined) {
        if (
          this.top == null || this.top === undefined ||
          this.type == null || this.type === undefined ||
          this.field == null || this.field === undefined
        ) {
          throw new Error('不传递top时 type 和 field 是必须的！');
        }
      }
    }
  }
  ngOnChanges() {
    if (this.display) {
      this.url = this._file.getRealFileUrl(this.photoUrl);
      if (this.top == null || this.top === undefined) {
        // this.setTop(this.top);
        console.info(this.field);
      } else {
        this.setTop(this.top);
      }
    }
  }
  /**
   * 计算并设置当前滚动条高度
   * @type {number} 设置高度的百分比
   */
  setTop(top: number) {
    const imgHeight = this.img.nativeElement.offsetHeight;
    let divTop = imgHeight * (this.top / 100);
    this.div.nativeElement.scrollTo(0, divTop);
  }
}
