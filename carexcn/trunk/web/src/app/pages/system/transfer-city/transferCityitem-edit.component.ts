import {Component, Input, OnInit, Output} from '@angular/core';
import {MessageService} from '../../../@core/utils/message.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-transfer-cityitem-edit',
  templateUrl: './transferCityitem-edit.component.html',
})
export class TransferCityitemEditComponent implements OnInit {
    ngOnInit(): void {
    }

    constructor(private fb: FormBuilder) {
    }

  form: FormGroup = this.fb.group({
    city: ['', [Validators.required]],
  });

  save() {
  }
}
