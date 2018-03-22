import { Component, OnInit } from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {MessageService} from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss'],
})
export class FormExampleComponent implements OnInit {
  filterFormResult: any;
  filterForm = {
    __fields: [
      {
        _name: 'name',
        _value: '',
        _class: 'col-sm-3',
        _placeholder: '商户名称',
        _label: '', // label为空则不显示label，需要占位符 请用 &nbsp;
      },
      {
        _name: 'code',
        _value: '',
        _class: 'col-sm-3',
        _placeholder: '商户编码',
        _label: '',
      },
      {
        _name: 'phone',
        _value: '',
        _class: 'col-sm-3',
        _placeholder: '联系方式',
        _label: '',
      },
    ],
    __buttons: [
      {
        _type: 'submit',
        _label: '查询',
        _icon: 'ion-search',
        _class: 'btn btn btn-primary btn-block',
        _div_class: 'col-sm-2',
      },
    ],
  };
  currentTheme: string;
  themeSubscription: any;
  constructor(
    private themeService: NbThemeService,
    private _message: MessageService,
  ) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {
  }
  getCurrentTheme() {
    this._message.info('当前主题', this.currentTheme);
  }
  submit(event) {
    console.info('submit');
    this.filterFormResult = event;
  }
}
