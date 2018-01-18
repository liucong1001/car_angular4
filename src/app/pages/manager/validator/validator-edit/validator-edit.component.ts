import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidatorService} from '../../../../@core/data/system/validator.service';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-validator-edit',
  templateUrl: './validator-edit.component.html',
  styleUrls: ['./validator-edit.component.scss'],
})
export class ValidatorEditComponent implements OnInit {

  constructor(private validatorService: ValidatorService, private fb: FormBuilder,
              private message: MessageService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.validatorService.get(p.id).then(v => {
        this.form.setValue(v);
      });
    });
  }

  form = this.fb.group({
    id: [''],
    cloudUser: [''],
    code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
    group: ['', [Validators.required]],
    script: ['', [Validators.required]],
  });

  errors = {
    code: [
      new ErrorMessage('required', '必须填写编号'),
      new ErrorMessage('minlength', '编号过短'),
      new ErrorMessage('maxlength', '编号过长'),
    ],
    name: [
      new ErrorMessage('required', '必须填写名称'),
      new ErrorMessage('minlength', '名称过短'),
      new ErrorMessage('maxlength', '名称过长'),
    ],
    group: [
      new ErrorMessage('required', '必须选择一个分类'),
    ],
    script: [
      new ErrorMessage('required', '必须填写校验脚本'),
    ],
  };

  save() {
    this.validatorService.put(this.form.value).then(v => {
      this.message.success('成功', '修改验证器成功');
    }).catch(err => {
      this.message.error('失败', err.message);
    });
  }
}
