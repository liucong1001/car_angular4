import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ys-autoinput',
  templateUrl: './autoinput.component.html',
  styleUrls: ['./autoinput.component.scss'],
})
export class AutoinputComponent implements OnInit {
  text: string;
  results: string[];
  results_resource: string[] = [];
  constructor() {
  }

  ngOnInit() {
    /**
     * 建立搜索结果的模拟数据
     */
    let max = 20;
    do {
      this.results_resource.push(Math.random().toString(36).substring(7));
      max--;
    } while (max > 0);
  }
  search(_event) {
    this.results = this.results_resource;
    // console.log(this.results_resource);
    // this.results = this.results_resource.filter((item) => item.indexOf(_event));
  }
}
