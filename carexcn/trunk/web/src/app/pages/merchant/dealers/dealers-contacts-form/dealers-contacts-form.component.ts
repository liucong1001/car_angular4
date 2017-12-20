import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Column, TableComponent} from '../../../../@core/ui/table/table.component';

@Component({
  selector: 'ngx-dealers-contacts-form',
  templateUrl: './dealers-contacts-form.component.html',
  styleUrls: ['./dealers-contacts-form.component.scss'],
})
export class DealersContactsFormComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public http: Http,
  ) { }

  ngOnInit() {
  }  form: FormGroup = this.fb.group({
    type: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(64)]],
    loginName: ['', [Validators.required]],
    password: ['', [Validators.required ]],
    repassword: ['', [ Validators.required]],
    telephone: ['', [Validators.required]],
  });
  public back() {
    this.router.navigateByUrl('/pages/merchant/dealers');
  }

}
