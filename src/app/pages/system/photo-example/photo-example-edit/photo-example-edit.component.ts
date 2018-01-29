import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {PhotoExampleService} from '../../../../@core/data/system/photo-example.service';
import {PhotoExampleModel} from '../../../../@core/model/system/photo-example';
import {FileSystemService} from "../../../../@core/data/system/file-system.service";

@Component({
  selector: 'ngx-photo-example-edit',
  templateUrl: './photo-example-edit.component.html',
  styleUrls: ['./photo-example-edit.component.scss'],
  providers: [PhotoExampleService,FileSystemService],
})
export class PhotoExampleEditComponent implements OnInit {

  photoExampleModel = new PhotoExampleModel();
  constructor(private fb: FormBuilder,private message:MessageService,private photoExampleService:PhotoExampleService,
              public router: Router, private route: ActivatedRoute, private file: FileSystemService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.photoExampleService.get(p.id).then(res =>{
          console.log('修改', res);
          this.photoExampleModel = res  as PhotoExampleModel;
          this.form.patchValue(this.photoExampleModel);


          this.file.getFilePathById('4028f22461311acc0161328acf1b000c').then(result => {
            console.info(result.text);
            this.photos[0].source = 'data:image/jpeg;base64,' + result.text;
            console.info(this.photos);
          }).catch(err => {
            console.info(err);
          });
        });
      }
    });

  }
  photos: any[] = [{
    title: '示例照片',
    source: '/system/common/17/20180126205653photoExamplenull.jpg',
  }];

  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
  }

  /**
   * 表单定义
   * @type {FormGroup}
   */
  form: FormGroup = this.fb.group({

    photoExample: this.fb.group({
      photoType: [null, [Validators.required]],
      scale: [null, [Validators.required]],
      id: [null, [Validators.required]],
    }),

  });


  save() {
    // if (this.form.invalid) {
    //   return false;
    // }
    const codemap = this.form.value ;
    console.log('照片示例', codemap);
    this.photoExampleService.saveEdit(codemap).then(res => {
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
