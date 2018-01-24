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

  /**
   * 表单定义
   * @type {FormGroup}
   */
  form: FormGroup = this.fb.group({

    photoExample: this.fb.group({
      photoType: [null, [Validators.required]],
      scale: [null, [Validators.required]],
    }),

  });

  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
  }


  save() {
    // if (this.form.invalid) {
    //   return false;
    // }
    const codemap = this.form.value ;
    console.log('照片示例', codemap);
    this.photoExampleService.save(codemap).then(res => {
      this.message.success('保存成功', '照片示例保存成功');
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
