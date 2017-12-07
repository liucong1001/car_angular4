import {Component, Input, OnInit} from '@angular/core';
import {CodeitemService} from '../../../@core/data/system/codeitem.service';
import {Codeitem} from '../../../@core/model/system/codeitem';
import {MessageService} from '../../../@core/utils/message.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-codeitem-edit',
  templateUrl: './codeitem-edit.component.html',
  providers: [CodeitemService],
})
export class CodeitemEditComponent implements OnInit {
  ngOnInit(): void {
    if (this.codeitem) {
      this.form.setValue(this.codeitem);
    }
  }
  @Input() codeitem: Codeitem;
  @Input() codemap: string;

  constructor(private codeitemService: CodeitemService, private messageService: MessageService, private fb: FormBuilder) {
  }

  form: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
    name: ['', [Validators.required, Validators.maxLength(64)]],
    value: ['', [Validators.maxLength(32)]],
    sort: ['', [Validators.pattern(/^\d*$/)]],
  });

  save() {
    if (this.form.invalid) {
      return ;
    }
    this.codeitem = {...this.form.value, codemap: this.codemap} as Codeitem;
    this.codeitemService.save(this.codeitem).then(ret => {
      this.messageService.success('保存成功', '保存代码项成功');
      console.log(ret);
    }).catch(err => {
      this.messageService.error('保存代码项失败', err.json().message);
    });
  }
}
