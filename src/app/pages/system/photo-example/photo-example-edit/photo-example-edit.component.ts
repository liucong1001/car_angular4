import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../../@core/utils/message.service';
import {PhotoExampleService} from '../../../../@core/data/system/photo-example.service';
import {PhotoExampleModel} from '../../../../@core/model/system/photo-example';
import {FileSystemService} from '../../../../@core/data/system/file-system.service';

@Component({
  selector: 'ngx-photo-example-edit',
  templateUrl: './photo-example-edit.component.html',
  styleUrls: ['./photo-example-edit.component.scss'],
  providers: [PhotoExampleService, FileSystemService],
})
export class PhotoExampleEditComponent implements OnInit {

  photoExampleModel = new PhotoExampleModel();

  constructor(private fb: FormBuilder,
              private message: MessageService,
              private photoExampleService: PhotoExampleService,
              public router: Router,
              private route: ActivatedRoute,
              private file: FileSystemService) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.photoExampleService.get(p.id).then(res => {
          this.photoExampleModel = res  as PhotoExampleModel;
          this.form.patchValue(this.photoExampleModel);
          this.photos.source = 'id:' + this.photoExampleModel.photos.photoExample[0].id;
          this.photoForm.photoExample[0] = this.photoExampleModel.photos.photoExample[0];
          // console.info('source', this.photos.source);
        });
      }
    });
  }

  photos = {
    title: '示例照片',
    source: '',
  };
  filePath = null;
  photoForm = {
    'photoExample': [],
  };

  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.filePath = this.file.getFileUrlByTmp($event);
    this.photoForm.photoExample[0] = {'filePath': this.file.getFileNameByTmp($event)};
  }

  /**
   * 表单定义
   * @type {FormGroup}
   */
  form: FormGroup = this.fb.group({
    photoExample: this.fb.group({
      photoType: [null, [Validators.required]],
      scale: [null, [Validators.required]],
      name: [null, [Validators.required]],
      id: [null, [Validators.required]],
    }),
  });

  save() {
    const codemap = this.form.value;
    codemap.photos = this.photoForm;
    this.photoExampleService.saveEdit(codemap).then(res => {
      this.message.success('保存成功', '附件类型保存成功');
      // this.saved = true;
      this.back();
    }).catch(err => {
      this.message.error('保存失败', err.json().message);
    });
  }
  imageUrl() {
    return  this.file.getRealFileUrl('id:4028f2ea6217e3c7016218392ff70000');
  }

  back() {
    this.router.navigateByUrl('/pages/system/photo-example');
  }
}
