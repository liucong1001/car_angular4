import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../../utils/message.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'ngx-ys-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.scss'],
})
export class CardetailComponent implements OnInit {
  /**
   * 拍照上传按钮是否显示
   * @type {boolean}
   */
  @Input() btn_show = true;
  /**
   * 卖家表单
   */
  @Input() vehicle: FormGroup;
  /**
   * 错误实例
   * @type {{}}
   */
  @Input() errors: object = {};
  @Input() car;
  @Input() car_detail_title;
  @Input() photos: Array<object>;
  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
  ) { }

  ngOnInit() {
  }
  readVehicleCard() {
    console.info('读取行驶证');
  }
}
