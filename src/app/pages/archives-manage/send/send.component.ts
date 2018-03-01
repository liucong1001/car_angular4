import { Component, OnInit } from '@angular/core';
import {ArchivesManageSendService} from '../../../@core/data/archives-manage/send.service';
import {ArchivesManageSendMap} from "../../../@core/model/archives-manage/send.model";
import {ArchivesListStatusMap} from "../../../@core/model/archives-manage/ArchivesListStatusMap";
import { MessageService } from '../../../@core/utils/message.service';


@Component({
  selector: 'ngx-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
  providers:[ArchivesManageSendService,MessageService],
})
export class SendComponent implements OnInit {

  archivesCode:String;
  plateNumber:String = '鄂A';
  showPlatenumber :boolean = false;
  sendModel = new ArchivesManageSendMap();
  record = [];
  status:object ={};
  list = new ArchivesListStatusMap();

  constructor(private SendService:ArchivesManageSendService,
             private message:MessageService) { }

  ngOnInit() {
    this.sendModel.cloudUser = '0001';
  }

  codeSearch(event:any){
    if (event.keyCode == 13) {
      /*
        车管所13位流水号
       */
      this.sendModel.code = String(event.target.value).substring(0,13)  ;
      /*
      交易系统流水号
       */
      this.sendModel.archivesNo=String(event.target.value).substring(13,29);
      this.status = {text:"正在送出..",css:"text-primary"};
      this.list = {
        ...this.sendModel,
        status:this.status
      };
      this.record.push(this.list);

      this.SendService.getPlateNumber(this.sendModel.archivesNo).then(res=>{
          this.sendModel.plateNumber=res.prejudication.preVehicle.plateNumber;
          this.SendService.send(this.sendModel).then(res=>{
            this.list.plateNumber = this.sendModel.plateNumber;
            this.list.status = {text:"已送出",css:"text-success"};
            this.message.success('','送出成功!');
            this.archivesCode = null;
          }).catch(err=>{
            this.message.error('送出失败',err.json().message);
          });
      })
    }
  }


  /**
   * 档案自提
   * @param event
   */
  plateNumberSearch(event:any){
    if (event.keyCode == 13) {
      this.sendModel.plateNumber = String(this.plateNumber) ;
      this.sendModel.archivesNo =null;
      this.sendModel.code = String(this.archivesCode);
      if((String(this.plateNumber).length==8||String(this.plateNumber).length==9)&&(String(this.archivesCode).length==13)){
          this.status = {text:"正在送出..",css:"text-primary"};
          this.list = {
            ...this.sendModel,
            status:this.status
          };
          this.record.push(this.list);
          this.SendService.send(this.sendModel).then(res=>{
            this.list.status = {text:"已送出",css:"text-success"};
            this.message.success('','送出成功!');
            this.archivesCode = null;
            this.plateNumber = '鄂A';
          });
      }else {
        this.message.error('','请输入正确的13位车管所流水号和车牌号');
      }
    }
  }

  toggle(){
    this.showPlatenumber = !this.showPlatenumber;
  }

  cancel(item,index){
      if(item.status.text=='已送出'){
        this.list.status = {text:"正在取消...",css:"text-warning"};
        console.log('取消',this.record,index);
        this.SendService.cancel(this.sendModel).then(res=>{
           this.list.status = {text:"取消成功",css:"text-danger"};
           this.message.success('取消成功！','');
           this.record.splice(index,1);
           console.log('取消后',this.record);
        }).catch(err=>{
           this.list.status = {text:"取消失败",css:"text-danger"};
           this.message.error('取消失败',err.json().message);
        })
      }
  }

}
