import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-ys-form-builder',
  templateUrl: './ys-form-builder.component.html',
  styleUrls: ['./ys-form-builder.component.scss'],
})
export class YsFormBuilderComponent implements OnInit {
  @Input() _formGroup: FormGroup;
  @Input() _errors: object;
  /**
   * 构造函数
   * @param {Router} _router
   * @param {FormBuilder} _formbuilder
   */
  constructor(
    private _router: Router,
    private _formbuilder: FormBuilder,
  ) { }

  ngOnInit() {
    if (this._formGroup == null || this._formGroup === undefined) {
      throw new Error('formGroup 是必须的');
    }
    if (this._errors == null || this._errors === undefined) {
      throw new Error('强烈建议设置 error ！');
    }
  }
  save() {
    if ( this._formGroup.valid ) {
      console.info(' 表单验证通过了！ ');
    } else {
      console.info(' 表单验证失败。 ');
    }
  }
  _____log(type: string) {
    console.info(type);
    console.info(this._formGroup.get('code').hasError(type));
  }

  _consolelog(event, obj) {
    console.info('----------------------------------------------');
    console.info(obj);
    for (let errorOfCtl in this._errors) {
      console.info(errorOfCtl);
      for (let error in this._errors[errorOfCtl]) {
        console.info(this._errors[errorOfCtl][error]);
      }
    }
    for (let control in this._formGroup.controls) {
      console.info(control);
    }
    console.info('----------------------------------------------');
    console.info(event);
    console.info(this._formGroup);
    this._____log('required');
    this._____log('minlength');
    this._____log('maxlength');
  }
}

/**
 * 消息定义
 */
export class YsFormBuilderConf {
  /**
   * 初始化
   * @param {string} _type 错误类型
   * @param {string} _message 错误提示
   */
  constructor(private _type: string, private _message: string) {
  }

  /**
   * 错误类型
   * @returns {string}
   */
  public get type(){
    return this._type;
  }

  /**
   * 错误提示
   * @return {string}
   */
  public get message(){
    return this._message;
  }
}
