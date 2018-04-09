import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-ys-big-form',
  templateUrl: './big-form.component.html',
  styleUrls: ['./big-form.component.scss'],
})
export class BigFormComponent implements OnInit {
  public archiveNo = '';
  constructor(
    private _message: MessageService,
  ) { }
  ngOnInit() {
  }

  /**
   * 查询大表单的操作
   */
  public getBigForm(archiveNo?: string) {
    if ( 16 === archiveNo.length ) {
      if (this.archiveNo === archiveNo) {
        this._message.info('流水号错误', '车辆流水号没有任何变化');
      } else {
        this.archiveNo = archiveNo;
      }
    } else {
      this._message.info('流水号错误', `车辆流水号[${archiveNo}]不对，是${archiveNo}位，应该是16位`);
    }
  }
}
