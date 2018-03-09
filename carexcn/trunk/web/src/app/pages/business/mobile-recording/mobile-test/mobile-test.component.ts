import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Http} from '@angular/http';
import { MessageService } from './../../../../@core/utils/message.service';
import {PhotoExampleService} from '../../../../@core/data/system/photo-example.service';

@Component({
  selector: 'ngx-mobile-test',
  templateUrl: './mobile-test.component.html',
  styleUrls: ['./mobile-test.component.scss'],
  providers:[PhotoExampleService],
})
export class MobileTestComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private message: MessageService,private photoExampleService:PhotoExampleService) { }

  photoTypeList = [];

  ngOnInit() {
    this.photoExampleService.getPhotoType().then(res=>{
      this.photoTypeList = res;
    });
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
    this.router.navigate( ['/pages/business/mobile-recording']);
  }

}
