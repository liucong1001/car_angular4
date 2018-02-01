import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {PhotoExampleService} from '../../../../@core/data/system/photo-example.service';

@Component({
  selector: 'ngx-photo-example-add',
  templateUrl: './photo-example-add.component.html',
  styleUrls: ['./photo-example-add.component.scss'],
  providers:[PhotoExampleService],
})
export class PhotoExampleAddComponent implements OnInit {

  constructor(private fb: FormBuilder,private message:MessageService,private photoExampleService:PhotoExampleService,
              public router: Router, private route: ActivatedRoute,) { }

  ngOnInit() {
  }

  photos: any[] = [{
    title: '示例照片',
    source: 'assets/images/camera1.jpg',
  }];
  filePath = null;
   photoForm={
      'photoExample': []
   };

  /**
   * 表单定义
   * @type {FormGroup}
   */
  form: FormGroup = this.fb.group({

    photoExample: this.fb.group({
      photoType: [null, [Validators.required]],
      scale: [null, [Validators.required]],
    }),
    // photos:this.fb.group({
    //   'photoExample':[[{'filePath':null}]],
    // }),
    // photos:this.photoForm,

  });

  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
    this.filePath = $event;
    console.log("filepath",this.filePath);
    this.photoForm.photoExample.push({'filePath':this.filePath});
    console.log("对象", this.photoForm);
  }


  save() {
    // if (this.form.invalid) {
    //   return false;
    // }
    const codemap = this.form.value ;
    codemap.photos=this.photoForm;
    console.log('附件类型', codemap);
    this.photoExampleService.save(codemap).then(res => {
      this.message.success('保存成功', '附件类型保存成功');
      // this.saved = true;
      this.back();
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }
  back(){
    this.router.navigateByUrl('/pages/system/photo-example');
  }

}
