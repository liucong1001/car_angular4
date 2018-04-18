import {Component, OnInit} from '@angular/core';
import {ArchivesManageSendMap} from '../../../@core/model/archives-manage/send.model';
import {ArchivesManageArriveService} from '../../../@core/data/archives-manage/arrive.service';
import {ArchivesListStatusMap} from '../../../@core/model/archives-manage/ArchivesListStatusMap';
import {MessageService} from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-arrive',
  templateUrl: './arrive.component.html',
  styleUrls: ['./arrive.component.scss'],
  providers: [ArchivesManageArriveService, MessageService],
})
export class ArriveComponent implements OnInit {

  model = new ArchivesManageSendMap();
  plateNumber = '鄂A';
  record = [];
  status: object = {};
  list = new ArchivesListStatusMap();

  constructor(private arriveService: ArchivesManageArriveService,
              private  message: MessageService) {
  }

  ngOnInit() {
    this.model.cloudUser = '0001';
  }

  plateNumberSearch(event: any) {
    if (event.keyCode == 13) {
      this.model.plateNumber = this.plateNumber;
      this.status = {text: '正在录入..', css: 'text-primary'};
      this.list = {
        ...this.model,
        status: this.status,
      };
      this.record.push(this.list);

      this.arriveService.arrive(this.model).then(res => {
        this.list.status = {text: '已回档', css: 'text-success'};
        this.message.success('', '到达成功！');
        this.plateNumber = '鄂A';
      }).catch(err => {
        this.list.status = {text: '录入失败', css: 'text-danger'};
        this.message.error('录入失败', err.json().message);
      });
    }
  }

  cancel(item, index) {
    if (item.status.text == '已回档') {
      this.list.status = {text: '正在移除...', css: 'text-warning'};
      console.log('取消', this.record, index);
      this.arriveService.cancel(this.model).then(res => {
        this.list.status = {text: '移除成功', css: 'text-danger'};
        this.message.success('移除成功！', '');
        this.record.splice(index, 1);
        console.log('取消后', this.record);
      }).catch(err => {
        this.list.status = {text: '移除失败', css: 'text-danger'};
        this.message.error('移除失败', err.json().message);
      });
    }
  }

}
