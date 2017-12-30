import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss'],
})
export class FormFilterComponent implements OnInit {

  filter = {
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
  constructor() { }

  ngOnInit() {
  }

}
