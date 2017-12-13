import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit, OnChanges {

  constructor(private location: Location) { }

  // ngOnChanges 可监控组件变量
  ngOnChanges(changes: SimpleChanges): void {
  }

  // 组件初始华
  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }

}
