import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import {UnlicensedVehicleService} from "../../../@core/data/system/unlicensed-vehicle.service";
import {MessageService} from "../../../@core/utils/message.service";

@Component({
  selector: 'ngx-blacklist-edit',
  templateUrl: './blacklist-edit.component.html',
  providers: [UnlicensedVehicleService],
})

export class BlacklistEditComponent implements OnInit {

  isEdit = false;

  constructor(private fb: FormBuilder,
              public router: Router,
              public route: ActivatedRoute,
              private unlicensedService: UnlicensedVehicleService,
              private messageService: MessageService,
              public http: Http) {
  }

  form: FormGroup = this.fb.group({
    id: [''],
    plateNumber: ['', [Validators.required, Validators.maxLength(64)]],
    lockReason: ['', [Validators.required]],
  });

  //初始化
  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.id) {
        this.unlicensedService.get(p.id).then(res => {
          this.isEdit = true;
          this.form.patchValue({
            id: res.id,
            plateNumber: res.plateNumber,
            lockReason: res.lockReason,
          });
        });
      }
    });
  }

  /**
   * 保存
   * @returns {boolean}
   */
  save() {
    if (this.form.invalid) {
      return false;
    }
    if (this.isEdit) {
      //修改
      this.unlicensedService.update(this.form.value).then(ret => {
        this.messageService.success('修改成功', '修改成功');
      }).catch(err => {
        this.messageService.error('修改失败', err.json().message);
      });
    } else {
      //添加
      this.unlicensedService.save(this.form.value).then(ret => {
        this.messageService.success('添加成功', '添加成功');
      }).catch(err => {
        this.messageService.error('添加失败', err.json().message);
      });
    }
  }

  back() {
    this.router.navigateByUrl('/pages/system/blacklist');
  }
}
