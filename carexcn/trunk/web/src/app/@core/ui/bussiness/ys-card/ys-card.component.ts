import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-ys-card',
  templateUrl: './ys-card.component.html',
  styleUrls: ['./ys-card.component.scss'],
})
export class YsCardComponent implements OnInit {
  @Input() pageTitle = '';
  @Input() cardContent: Array<string> = [''];
  constructor() { }

  ngOnInit() {
  }

}
