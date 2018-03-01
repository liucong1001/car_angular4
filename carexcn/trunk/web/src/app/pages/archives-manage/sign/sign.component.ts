import { Component, OnInit } from '@angular/core';
import {ArchivesManageSendService} from '../../../@core/data/archives-manage/send.service';
import {ArchivesManageSignService} from "../../../@core/data/archives-manage/sign.service";
import {ArchivesManageSendMap} from "../../../@core/model/archives-manage/send.model";
import {ArchivesManageArriveService}  from "../../../@core/data/archives-manage/arrive.service";
import {ArchivesListStatusMap} from "../../../@core/model/archives-manage/ArchivesListStatusMap";
import { MessageService } from '../../../@core/utils/message.service';


@Component({
  selector: 'ngx-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
  providers:[ArchivesManageSendService,ArchivesManageSignService,MessageService],
})
export class SignComponent implements OnInit {

  constructor(private sendService:ArchivesManageSendService,
              private signService:ArchivesManageSignService ,
              private message:MessageService) { }

  code:string;
  archivesNo:string;
  plateNumber:string = '鄂A';
  model = new ArchivesManageSendMap();
  record = [];
  status:object ={};
  list = new ArchivesListStatusMap();

  ngOnInit() {
    this.model.cloudUser = '0001';
  }

  /**
   * 车管所流水号--签收
   * @param event
   */
  codeSearch(event:any){
    if (event.keyCode == 13&&String(this.model.code).length==13) {
          console.log('车管所流水号',this.model.code);
          this.signService.findCode(this.model.code).then(res=>{
                  this.model.plateNumber = res.plateNumber;
                  this.sign(this.model.plateNumber);
          })
    }
  }

  /**
   * 流水号--签收
   * @param event
   */
  arcNoSearch(event:any){
    this.model.archivesNo = this.archivesNo ;
     if(event.keyCode == 13&&String(this.model.archivesNo).length==16){
          this.sendService.getPlateNumber(this.model.archivesNo).then(res=>{
              this.model.plateNumber = res.prejudication.preVehicle.plateNumber;
              this.sign(this.model.plateNumber);
          })
     }
  }

  /**
   * 车牌号-签收
   * @param event
   */
  plateNumberSearch(event:any){
    if(event.keyCode == 13&&String(this.model.plateNumber).length==7||String(this.model.plateNumber).length==8){
      this.sign(this.model.plateNumber);
    }
  }

  /**
   * 车牌号-签收（公共）
   * @param plateNumber
   */
  sign(plateNumber:string){
    this.status = {text:"正在签收..",css:"text-primary"};
    this.list = {
      ...this.model,
      status:this.status
    };
    this.record.push(this.list);
    this.signService.sign(this.model).then(res=>{
      this.list.status = {text:"已签收",css:"text-success"};
      this.message.success('','签收成功!');
      this.archivesNo = '';
    }).catch(err=>{
      this.message.error('签收失败',err.json().message);
    })
  }

  /**
   * 取消
   * @param item
   * @param index
   */
  cancel(item,index){
    if(item.status.text=='已签收'){
      this.list.status = {text:"正在取消...",css:"text-warning"};
      console.log('取消',this.record,index);
      this.signService.cancel(this.model).then(res=>{
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
