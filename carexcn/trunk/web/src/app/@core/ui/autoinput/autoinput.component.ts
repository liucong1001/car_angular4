import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ngx-ys-autoinput',
  templateUrl: './autoinput.component.html',
  styleUrls: ['./autoinput.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AutoinputComponent implements OnInit {
  text: string;
  results: string[];
  results_resource: string[] = [];
  constructor() {
  }

  ngOnInit() {
    /**
     * 如果没有给出数据，则模拟数据
     */
    if (this.results_resource.length < 1) {
      let max = 20;
      do {
        this.results_resource.push(Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2));
        max--;
      } while (max > 0);
    }
  }
  search(_event) {
    this.results = this.results_resource.filter((item) => item.indexOf(_event.query) > 0);
  }
}
