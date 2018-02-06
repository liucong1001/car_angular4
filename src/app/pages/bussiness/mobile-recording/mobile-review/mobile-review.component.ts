import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TradeService} from '../../../../@core/data/bussiness/trade.service';
import { ActivatedRoute, Router,Params, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { MessageService } from '../../../../@core/utils/message.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {TradeForm} from '../../../../@core/model/bussiness/trade/trade.form';
import {MobileService} from '../../../../@core/data/bussiness/mobile.service';
import {ControlContainer, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'ngx-mobile-review',
  templateUrl: './mobile-review.component.html',
  styleUrls: ['./mobile-review.component.scss'],
  providers:[TradeService,MobileService],
})
export class MobileReviewComponent implements OnInit {

  constructor(private  tradeService:TradeService,
              public router: Router,
              private route: ActivatedRoute,
              public http: Http,
              private message: MessageService,
              private mobileService:MobileService,
              private fb: FormBuilder,) {

    this.route.params.subscribe((params: Params) => {
      this.archiveNo = params['archiveNo'];
      if (params['archiveNo']) {
        this.tradeService.get(params['archiveNo']).then(res => {
          this.tradeInfo = res;
          const photosList = Object.keys(res.preVehicle.photos);
          const  photosData=photosList.concat(Object.keys(res.seller.photos));

          console.log('照片类型', photosData,String(photosData));
         console.log('业务类型',res, res.prejudication.business.businessType);
          this.form.patchValue({
            archiveNo:res.archiveNo,
            type:res.prejudication.business.businessType,
            photoCodes:String(photosData),
          });

        }).catch(err => {
          this.message.error('获取失败', err.json().message);
        });
      }
    });
  }

  tradeInfo : TradeForm ;

  public photos_name = {};

  public  archiveNo = '';

  /**
   * 图片部分
   */

  /**
   * 拍照上传按钮是否显示
   * @type {boolean}
   */
  @Input() btn_show = true;

  ngOnInit() {
    console.log('获取对象',this.tradeInfo);
  }
  form: FormGroup = this.fb.group({
    cloudUser: ['0001'],
    archiveNo: ['', [Validators.required]],
    type: [''],
    photoCodes: ['', [Validators.required,Validators.maxLength(2)]],
    reason: ['第一张照片不符合要求', [Validators.required]],
  });



  back(){
     console.log('打回对象',this.form.value);
    this.mobileService.back(this.form.value).then(res=>{
      this.message.success('','回退成功!');
    })
    //   .catch(err=>{
    //   this.message.error('回退失败',err.json().message);
    // })
  }
  startInput(){
    this.router.navigate( ['/pages/bussiness/mobile-recording/input', { archiveNo:this.archiveNo }]);
  }


}
