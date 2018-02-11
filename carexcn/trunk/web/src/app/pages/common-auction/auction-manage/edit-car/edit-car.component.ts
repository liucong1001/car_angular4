import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {commonAutionService} from  '../../../../@core/data/common-aution/project.service';
import {commonAutionCarService} from  '../../../../@core/data/common-aution/car.service';
import {MessageService} from '../../../../@core/utils/message.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
  providers:[commonAutionService,commonAutionCarService],
})
export class EditCarComponent implements OnInit {

  constructor(private location: Location,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonAutionService:commonAutionService,
              private commonAutionCarService:commonAutionCarService,
              private message: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.commonAutionCarService.getCarInfo(p.id).then(res=>{
           this.saleCarform.patchValue(res);
           this.form.patchValue({projectId:res.saleProject.id})
        })
      }
    });
  }
  saleCarform:FormGroup =this.fb.group({
    id:['', [Validators.required]],
    plateNumber: ['', [Validators.required]],
    fee: ['', [Validators.required]],
    discount: ['', [Validators.required]],
  });
  form: FormGroup = this.fb.group({
    saleCar:this.saleCarform,
    projectId:[''],
  });
  /*返回*/
  goBack() {
    this.location.back();
  }
  save(){
    console.log('车辆对象',this.form.value);
    this.commonAutionCarService.editCar(this.form.value).then(res=>{
      this.message.success('','修改车辆成功！');
      this.goBack();
    }).catch(err=>{
      this.message.error('修改失败',err.json().message);
    })
  }

}
