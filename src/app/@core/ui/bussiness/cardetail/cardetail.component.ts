import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../../utils/message.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Codeitem} from "../../../model/system/codeitem";
import {FilingInfoModel} from "../../../model/bussiness/filing.info.model";

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
   * @type {{error}}
   */
  @Input() errors: object = {};
  @Input() car;
  @Input() car_detail_title;
  @Input() photos: Array<object>;
  @Input() useCharacter: Codeitem[];
  @Input() vehicleType: Codeitem[];
  @Input() vehicleSize: Codeitem[];

  public useCharacterSelected: Codeitem;
  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
  ) { }

  ngOnInit() {
  }
  readVehicleCard() {
    console.info('读取行驶证');
  }
  useCharacterCompareWithFunc(code1: Codeitem, code2: Codeitem) {
    return (code1 && code2) ? code1.code === code2.code : false;
  }
  useCharacterSelecteFunc() {
    console.info('useCharacterSelecteFunc');
  }
}
