import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Column, TableComponent} from '../../../../@core/ui/table/table.component';
@Component({
  selector: 'ngx-dealers-edit',
  templateUrl: './dealers-edit.component.html',
  styleUrls: ['./dealers-edit.component.scss'],
})
export class DealersEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public http: Http,
  ) { }

  ngOnInit() {
  }
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(64)]],
    code: ['', [Validators.required]],
    certCode: ['', [Validators.required ]],
    address: ['', [ Validators.required]],
    phone: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    discount: ['', [Validators.required]],
    isDeal: ['', [Validators.required]],
    isCarRental: ['', [Validators.required]],
    isPersonal: ['', [Validators.required]],
  });
  public back() {
    this.router.navigateByUrl('/pages/merchant/dealers');
  }

 save() {
  const market = this.form.value;
  this.http.post('/rest/merchant/create', market).toPromise().then((res) => res.json());
 }

}
