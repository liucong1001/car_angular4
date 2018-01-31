import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'ngx-ys-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss'],
})
export class PhotoDetailComponent implements OnInit, OnChanges {
  /**
   * 图片显示的地址
   * @type {string}
   */
  @Input() photoUrl = '';
  /**
   * 区域定位百分比的数字
   * @type {number}
   */
  @Input() top = 0;
  /**
   * 是否显示的开关
   * @type {boolean}
   */
  @Input() display = false;
  @ViewChild('img') img: ElementRef;
  @ViewChild('div') div: ElementRef;
  constructor() {}
  ngOnInit() {}
  ngOnChanges() {
    if (this.display) {
      const imgHeight = this.img.nativeElement.offsetHeight;
      let divTop = imgHeight * (this.top / 100);
      this.div.nativeElement.scrollTo(0, divTop);
    }
  }
}
