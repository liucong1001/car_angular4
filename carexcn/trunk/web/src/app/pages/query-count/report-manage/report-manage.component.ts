import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-report-manage',
  templateUrl: './report-manage.component.html',
  styleUrls: ['./report-manage.component.scss'],
})
export class ReportManageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
