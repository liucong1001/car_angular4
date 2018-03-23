import {Component, OnChanges, OnInit, SimpleChanges,TemplateRef,ViewChild } from '@angular/core';
import {Menu, MenuCell} from '../../../@core/ui/table/cell.menu.component';
import {Column} from '../../../@core/ui/table/table.component';
import {TextCell} from '../../../@core/ui/table/cell.text.component';
import {BatchService} from "../../../@core/data/system/batch.service";
import 'rxjs/Rx' ;

@Component({
  selector: 'ngx-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
  providers: [BatchService]
})
export class BatchComponent implements OnInit {

  constructor(private batchService: BatchService) { }

  ngOnInit(): void {
    this.columns =[
      {title: '日期', titleClass: '', cell: new TextCell('date')} as Column,
      {title: '操作', titleClass: 'w-25 text-center', cell: new MenuCell(
        [
          // new Menu('编辑', '', 'edit'),
        ],
        new Menu('下载', '', this.dataDownload.bind(this)), 'text-center',
      )} as Column,
    ];
  }

  // 列表搜索条件对象
  filter: any = {};
  // 列表列定义
  columns: Column[] ;
  // 列表菜单回调
  view(row: any, drop: any) {
  }

  dataDownload(row: any){
    this.batchService.downCompressFlow(row.id).then(res=>{
      this.downloadFile(res,row.date);
    });
  }

  downloadFile(data: Response,name:string){
    var a = document.createElement('a');
    var blob = new Blob([data], {'type':"application/octet-stream"});
    a.href = URL.createObjectURL(blob);
    a.download = name+".zip";
    a.click();
  }
}
