import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'ngx-report-form-search',
  templateUrl: './report-form-search.component.html',
  styleUrls: ['./report-form-search.component.scss']
})
export class ReportFormSearchComponent implements OnInit {

  constructor() { }
  @Input() startText:string;
  @Input() endText:string;
  @Output() btn_search = new EventEmitter<any>();
  @Output() btn_export = new EventEmitter<any>();
  startDate:Date;
  endDate:Date;

  ngOnInit() {
  }

  getstartDateValue($event) {
    this.startDate = $event;
  }
  getendDateValue($event) {
    this.endDate = $event;
  }
  search(startDate,endDate){
    this.btn_search.emit({startDate, endDate});
  }
  export(startDate, endDate){
    this.btn_export.emit({startDate, endDate});
  }

}
