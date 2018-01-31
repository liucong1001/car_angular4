import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'ngx-ys-dynamic-photo-form',
  templateUrl: './dynamic-photo-form.component.html',
  styleUrls: ['./dynamic-photo-form.component.scss'],
})
export class DynamicPhotoFormComponent implements OnInit, OnChanges {
  /**
   * 图片FormGroup
   */
  @Input() photos: FormGroup;
  @Input() photos_name: Object;
  @Input() btn_show = true;
  objectKeys = Object.keys;
  constructor() { }
  ngOnInit() {}
  ngOnChanges() {
    // console.info(this.photos_name);
    // console.info(this.photos);
    // console.info(this.photos.value);

    // if (this.photos) {
    //   Object.keys(this.photos.controls).forEach(key1 => {
    //     let keys = [];
    //     Object.keys((this.photos.get(key1) as FormArray).controls).forEach( key2 => {
    //       console.info(key1 + '--' + key2 + ' value:' + JSON.stringify(this.photos.get(key1).get(key2).value));
    //       console.info(this.photos.get(key1).get(key2));
    //       // let key_child = {key2: this.photos.get(key1).get(key2)};
    //       keys.push(key2);
    //     });
    //     this.photos_keys.push(key1);
    //   });
    //   console.info(this.photos_keys);
    // } else {
    //   this.photos_keys = [];
    // }
  }
  getPhotoFormControls(photoType: string): Array<AbstractControl> {
    return (this.photos.get(photoType) as FormArray).controls;
  }
  getPhotoValue(photoType: string, photo: string): any {
    return this.photos.get(photoType).get(photo).value;
  }
  getPhotoControl(photoType: string, photo: string): FormControl {
    return this.photos.get(photoType).get(photo) as FormControl;
  }
  getPhotoType(photoType: string): FormArray {
    return this.photos.get(photoType) as FormArray;
  }
}
