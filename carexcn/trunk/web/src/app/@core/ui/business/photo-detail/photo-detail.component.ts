import {AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
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
export class PhotoDetailComponent implements OnInit, AfterViewChecked { // OnChanges,
  /**
   * 图片显示路径
   * 支持 "tmp:","id:","http://......1.jpg" 等格式
   * 支持从浏览器缓存中读取iwp_urls
   * [额外说明]：动态图片表单不能在为选择证件类型时input中绑定单个url
   * 但是方便的在选择证件类型时取到所有url，这种情况建议存入缓存中，会自动读取对比
   */
  @Input() public photoUrl = '';
  private url: string;
  /**
   * 区域定位百分比的数字
   * @type {number}
   */
  @Input() public top = 0;
  /**
   * 当前照片的附件类型(编码)
   * @type {string}
   */
  // @Input() private type? = '';
  /**
   * 当前照片的附件字段名
   * @type {string}
   */
  // @Input() private field? = '';
  /**
   * 是否显示的开关
   * @type {boolean}
   */
  @Input() public display = false;
  @ViewChild('img') private img: ElementRef;
  @ViewChild('div') private div: ElementRef;
  constructor(
    public _file: FileSystemService,
    // private _example: PhotoExampleService,
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
        throw new Error('top 属性是必须的！');
        // if (
        //   this.type == null || this.type === undefined ||
        //   this.field == null || this.field === undefined
        // ) {
        //   throw new Error('不传递top时 type(照片类型) 和 field(字段名) 是必须的！');
        // }
      }
    }
  }
  // ngOnChanges() {
    // if (this.display) {
    //   if (this.top == null || this.top === undefined) {
    //     this._example.getPhotoScrollerYConfig(this.field, this.type).then(top => {
    //       console.info('OnChanges 1', top);
    //       // this.applyTop(top);
    //     });
    //   } else {
    //     console.info('OnChanges 2', this.top);
    //     this.applyTop(this.top);
    //   }
    // }
  // }
  public setPhotoUrl(url: string) {
    this.photoUrl =  url;
  }
  public ifShow(ifDisplay: boolean) {
    this.display = ifDisplay;
  }
  public setTop(top: number) {
    this.top = top;
  }
  ngAfterViewChecked(): void {
    this.applyTop();
  }
  /**
   * 计算并设置当前滚动条高度
   * @type {number} 设置高度的百分比
   */
  private applyTop(top?: number) {
    top = top ? top : this.top;
    this.div.nativeElement.scrollTo(0, this.img.nativeElement.height * (top / 100));
  }
}
