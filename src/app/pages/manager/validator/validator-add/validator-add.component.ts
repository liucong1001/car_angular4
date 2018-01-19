import { Component, OnInit } from '@angular/core';
import {ValidatorService} from '../../../../@core/data/system/validator.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ErrorMessage} from '../../../../@core/ui/valid-error/valid-error.component';
import 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import {MessageService} from '../../../../@core/utils/message.service';
import {MarketService} from '../../../../@core/data/system/market.service';
import {Marketmap} from "../../../../@core/model/system/marketmap";

@Component({
  selector: 'ngx-validator-add',
  templateUrl: './validator-add.component.html',
  styleUrls: ['./validator-add.component.scss'],
})
export class ValidatorAddComponent implements OnInit {

  constructor(private validatorService: ValidatorService, private fb: FormBuilder,
              private message: MessageService, private marketService: MarketService) { }

  ngOnInit() {
    this.marketService.getAllMarketList().then(markets => {
      this.markets = markets;
    });
  }

  markets: Marketmap[] = [];

  form = this.fb.group({
    cloudUser: [''],
    code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
    script: ['//TODO: 完成数据检查代码', [Validators.required]],
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

  add() {
    this.validatorService.add(this.form.value).then(v => {
      this.message.success('成功', '新增验证器成功');
    }).catch(err => {
      this.message.error('失败', err.message);
    });
  }
}
