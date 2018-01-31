import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'ngx-ys-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss'],
})
export class PhotoDetailComponent implements OnInit, OnChanges {
  @Input() photoUrl = '';
  @Input() top = 0;
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
