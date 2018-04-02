import { Component, OnInit } from '@angular/core';
import { MessageService } from '.././../../../../@core/utils/message.service';
import { GlobalConfigService } from '.././../../../../@core/data/system/global-config.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Http} from '@angular/http';
import {ErrorMessage} from '../../../../../@core/ui/valid-error/valid-error.component';

@Component({
  selector: 'ngx-market-basic-edit',
  templateUrl: './market-basic-edit.component.html',
  styleUrls: ['./market-basic-edit.component.scss'],
  providers: [GlobalConfigService, MessageService],
})
export class MarketBasicEditComponent implements OnInit {

  cloudUser = '';

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public http: Http,
    private globalConfigService: GlobalConfigService,
    private message: MessageService) {
    this.route.params.subscribe((params: Params) => {
      this.cloudUser = params['cloudUser'];
      if (params['id']) {
        this.globalConfigService.getInfo(params['id']).then(res => {
          this.form.patchValue({
            id: res.id,
            invoiceManagerMode: res.invoiceManagerMode,
            plateNumberPrefix: res.plateNumberPrefix,
            printFormatAmount: res.printFormatAmount,
            printAmountPrefix: res.printAmountPrefix,
            printMarketAccount: res.printMarketAccount,
            printMarketAddress: res.printMarketAddress,
            printMarketName: res.printMarketName,
            printMarketTaxNo: res.printMarketTaxNo,
            printMarketPhone: res.printMarketPhone,
            printOpener: res.printOpener,
            printMemoScript: res.printMemoScript,
            printPhone: res.printPhone,
            printAmountPrefixCN: res.printAmountPrefixCN,
            dimensional: res.dimensional,
            cloudUser: res.cloudUser,
          });
        }).catch(err => {
          this.message.error('获取失败', err.json().message);
        });
      }
    });
    this.form.patchValue({
      cloudUser :this.cloudUser,
    });
  }

  ngOnInit() {
  }

  form: FormGroup = this.fb.group({
    invoiceManagerMode: ['', [Validators.required, Validators.pattern(/^[123]$/)], ''],
    plateNumberPrefix: [''],
    printFormatAmount: [''],
    printAmountPrefix: ['', [Validators.required, Validators.maxLength(1)], ''],
    printMarketAccount: ['', [Validators.required, Validators.pattern(/^\d{10,32}$/)], ''],
    printMarketAddress: ['', [Validators.required, Validators.maxLength(256)], ''],
    printMarketName: ['', [Validators.required, Validators.maxLength(64)], ''],
    printMarketTaxNo: ['', [Validators.required, Validators.pattern(/^[0-9A-Z]{17}[a-zA-Z]$/)], ''],
    printMarketPhone: ['', [Validators.required, Validators.pattern(/^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/)], ''],
    printOpener: ['', [Validators.required, Validators.maxLength(8)], ''],
    printMemoScript: ['', [Validators.required, Validators.maxLength(512)], ''],
    printPhone: ['', [Validators.required, Validators.pattern(/^(\*)|([0-9]{11})$/)], ''],
    printAmountPrefixCN: ['', [Validators.required, Validators.maxLength(1)], ''],
    dimensional: ['', [Validators.required], ''],
    cloudUser: [''],
    id: [''],
  });

  errors = {
    invoiceManagerMode: [
      new ErrorMessage('required', '必须选择发票管理模式！'),
      new ErrorMessage('pattern', '无效的发票管理模式！'),
    ],
    printAmountPrefix: [
      new ErrorMessage('maxLength', '数字金额前缀超过1位！'),
    ],
    printMarketAccount: [
      new ErrorMessage('required', '市场开户帐号不得为空！'),
      new ErrorMessage('pattern', '无效的开户帐号格式！'),
    ],
    printMarketAddress: [
      new ErrorMessage('required', '市场地址不得为空！'),
      new ErrorMessage('maxLength', '市场地址不能超过256个字！'),
    ],
    printMarketName: [
      new ErrorMessage('required', '市场名称不得为空！'),
      new ErrorMessage('maxLength', '市场名称不能超64过个字！'),
    ],
    printMarketTaxNo: [
      new ErrorMessage('required', '市场纳税识别号码不得为空！'),
      new ErrorMessage('pattern', '无效的市场纳税识别号码！'),
    ],
    printMarketPhone: [
      new ErrorMessage('required', '市场联系电话不得为空！'),
      new ErrorMessage('pattern', '无效的市场联系电话！'),
    ],
    printOpener: [
      new ErrorMessage('maxLength', '开票人长度超过8位！'),
    ],
    printMemoScript: [
      new ErrorMessage('maxLength','备注脚本过长，必须在512个字符以内！'),
    ],
    printPhone: [
      new ErrorMessage('pattern', '双方电话设置格式不正确！'),
    ],
    printAmountPrefixCN: [
      new ErrorMessage('maxLength', '汉字金额前缀超过1位！'),
    ],
    dimensional: [
      new ErrorMessage('required', '扫码的类型不得为空！'),
      new ErrorMessage('pattern', '无效的扫码的类型！'),
    ],
  };

  save() {
    if (this.form.invalid) {
      this.message.error('提交失败', '有数据不合法');
      return false;
    }
    this.globalConfigService.update(this.form.value).then(res => {
      this.message.success('保存成功', '配置修改成功');
      this.back();
    }).catch(err => {
      this.message.error('保存失败', err.message);
    });
  }

  back() {
    this.router.navigate( ['/pages/system/market/market/basic', { cloudUser: this.cloudUser}]);
  }
}
