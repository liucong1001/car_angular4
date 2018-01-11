import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
@Component({
  selector: 'ngx-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public http: Http) { }
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(64)]],
    code: ['', [Validators.required]],
  });
  ngOnInit() {
  }
 public  save(){

 }
  public back(){
     this.router.navigateByUrl('/pages/system/role');
  }

}
