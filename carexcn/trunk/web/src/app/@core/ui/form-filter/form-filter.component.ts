import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ngx-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss'],
})
export class FormFilterComponent implements OnInit {
  @Input() filter = null;
  prepareFilter = false;
  constructor() { }
  ngOnInit() {
    if (this.filter == null || this.filter === undefined) {
      throw new Error('filter 参数是必须的！');
    } else if (this.filter.__fields == null || this.filter.__fields === undefined) {
      throw new Error('filter 中 __fields 元素是必须的且不能为空！');
    } else if (!(this.filter.__fields instanceof Array)) {
      throw new Error('filter 中 __fields 元素必须是数组！');
    } else if (this.filter.__buttons == null || this.filter.__buttons === undefined) {
      throw new Error('filter 中 __buttons 元素是必须的且不能为空！');
    } else if (!(this.filter.__buttons instanceof Array)) {
      throw new Error('filter 中 __buttons 元素必须是数组！');
    } else {
      this.prepareFilter = true;
    }
  }

  submitFilter(filterForm: NgForm) {
    console.info(filterForm.value());
  }
}
