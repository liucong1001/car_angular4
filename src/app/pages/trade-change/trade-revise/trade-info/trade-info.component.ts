import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../../../../@core/utils/message.service';
import {Location} from '@angular/common';
import {Codemap} from '../../../../@core/model/system/codemap';
import {CodeService} from '../../../../@core/data/system/code.service';
import {TableComponent} from '../../../../@core/ui/table/table.component';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-trade-info',
  templateUrl: './trade-info.component.html',
  styleUrls: ['./trade-info.component.scss'],
})
export class TradeInfoComponent implements OnInit {

  /**
   * 列表组件实例
   */
  @ViewChild(TableComponent) itemList: TableComponent;

  /**
   * 初始化
   */
  ngOnInit(): void {
    this.form.get('code').valueChanges.subscribe(val => {
      // this.filter.codemap = val;
      this.itemList.reload();
    });
  }
  constructor(
    private message: MessageService,
    private location: Location,
    private codeService: CodeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.route.params.subscribe(p => {
      if (p.code && p.name) {
        this.form.setValue(p);
        // this.filter.codemap = p.code;
        if (p.code && p.name) {
          this.saved = true;
        }
      }
    });
  }
  /**
   * 表单定义
   * @type {FormGroup}
   */
  form: FormGroup = this.fb.group({
    cloudUser: ['', [Validators.required]],
    code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
    name: ['', [Validators.required, Validators.maxLength(64)]],
  });
  /**
   * 已保存标志
   * @type {boolean}
   */
  saved = false;

  /**
   * 保存
   * @returns {boolean}
   */
  save() {
    if (this.form.invalid) {
      return false;
    }
    const codemap = this.form.value as Codemap;
    this.codeService.save(codemap).then(res => {
      this.message.success('保存成功', '代码集保存成功');
      this.saved = true;
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }


  photos: any[] = [{
    title: '',
    source: 'assets/images/camera1.jpg',
  }];
  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
  }
  /*返回*/
  goBack() {
    this.location.back();
  }
}
