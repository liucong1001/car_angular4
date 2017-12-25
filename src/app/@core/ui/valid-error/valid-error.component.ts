import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

/**
 * 表单控件错误提示控件
 */
@Component({
  selector: 'ngx-valid-error',
  templateUrl: './valid-error.component.html',
  styleUrls: ['./valid-error.component.scss'],
})
export class ValidErrorComponent implements OnInit {

  @Input() control: FormControl;
  @Input() errors: any;

  constructor() { }

  ngOnInit() {
  }

}
