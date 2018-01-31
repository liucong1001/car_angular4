import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Http} from '@angular/http';
import { MessageService } from './../../../../@core/utils/message.service';

@Component({
  selector: 'ngx-mobile-test',
  templateUrl: './mobile-test.component.html',
  styleUrls: ['./mobile-test.component.scss']
})
export class MobileTestComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private message: MessageService) { }

  ngOnInit() {
  }


  form: FormGroup = this.fb.group({
    cloudUser: ['0001'],
    archiveNo: ['', [Validators.required]],
    type: [''],
    photoCodes: ['', [Validators.required,Validators.maxLength(2)]],
    reason: ['', [Validators.required]],
  });

  save(){
    console.log('表单',this.form.value);
    this.http.put('/rest/business/trade/back',this.form.value).toPromise().then(res=>{
       this.message.success('测试成功！','');
    }).catch(err=>{
       this.message.error('错误',err.json().message);
    })
  }
  back(){

  }

}
