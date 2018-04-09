/**
 * 打印热敏发票  测试jquery在项目中使用
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-tick',
  templateUrl: './tick.component.html',
  styleUrls: ['./tick.component.scss']
})
export class TickComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   *打印样式在ts里面写 和在html里面写都可以生效
   */
  print_ng(){
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title></title>
          <style>
          </style>
        </head>
      <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
