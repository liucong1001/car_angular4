import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ErrorMessage} from '../../valid-error/valid-error.component';
import {BaseFormControl} from "../base-form-control";

@Component({
  selector: 'ngx-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends BaseFormControl implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
