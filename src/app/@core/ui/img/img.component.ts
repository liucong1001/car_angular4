import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FileSystemService} from "../../data/system/file-system.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CameraModalComponent} from "../camera/camera-modal/camera-modal.component";

// export CameraModalComponent
@Component({
  selector: 'ngx-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  providers:[FileSystemService],
})
export class ImgComponent implements OnInit {

  constructor(private file:FileSystemService, private modalService: NgbModal,) { }
  @Input() idValue;
  @Input() height;
  ngOnInit() {
  }

  /**
   * 获取图片地址
   * @returns {string}
   */
  imageUrl(){
    return  this.file.getRealFileUrl('id:'+this.idValue);
  }

  showPicModal(picSource) {
    console.info('this.showPicModal url : ' + picSource);
    const activeModal = this.modalService.open(CameraModalComponent, { size: 'lg', container: 'nb-layout', windowClass: 'text-center'});
    activeModal.componentInstance.modalHeader = '查看图片';
    activeModal.componentInstance.pic_source = this.file.getRealFileUrl('id:'+this.idValue);
  }

}
