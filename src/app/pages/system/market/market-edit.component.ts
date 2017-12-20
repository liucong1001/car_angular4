import { Marketfee } from './../../../@core/model/system/market-fee-map';
import { Marketmap } from './../../../@core/model/system/marketmap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Column, TableComponent } from '../../../@core/ui/table/table.component';
import { MarketService } from '../../../@core/data/system/market.service';
import { MessageService } from '../../../@core/utils/message.service';
// import Marketfee



@Component({
    selector: 'ngx-market-edit',
    templateUrl: './market-edit.component.html',
    providers: [MarketService, MessageService],
})

export class MarketEditComponent implements OnInit {
    public jobList: Array<any>;
     // 业务费用模态框
     display = false;
     invoice = false;
     discount = false;
     required = false;
     // 厂牌型号模态框
     brandModel = false;

    constructor(private fb: FormBuilder,
        public router: Router,
        private route: ActivatedRoute,
        public http: Http,
        private marketService: MarketService,
        private message: MessageService,
    ) {
        this.route.params.subscribe(p => {
            if (p.code && p.name) {
                this.form.setValue(p);
                this.filter.marketmap = p.code;
                if (p.code && p.name) {
                    this.saved = true;
                }
            }
        });
    }


    form: FormGroup = this.fb.group({
        name: ['', [Validators.required]],
        number: ['', [Validators.required]],
        areaNumber: ['', [Validators.required]],
        memo: [''],
    });
    fee: Marketfee= new Marketfee();
    fees: Marketfee[];
    newFee: boolean;
    selectedFee: Marketfee;
    // feeForm: FormGroup = this.fb.group({
    //     name: ['', [Validators.required]],
    //     business_type: ['', [Validators.required]],
    //     money: ['', [Validators.required]],
    //     invoice: ['', [Validators.required]],
    //     discount: ['', [Validators.required]],
    //     required: ['', [Validators.required]],
    //     price_type: ['', [Validators.required]],
    //     memo: [''],
    // });
    brandForm: FormGroup = this.fb.group({
        name: ['', [Validators.required]],
        range: ['', [Validators.required]],
        origin: ['', [Validators.required]],
        vehicleTypeCode: ['', [Validators.required]],
        memo: [''],
    });

    /**
* 列表组件实例
*/
    @ViewChild(TableComponent) itemList: TableComponent;

    /**
      * 代码项搜索条件
      * @type {{}}
      */
    filter: any = {};

    ngOnInit() {
    }

    showDialog() {
        this.display = true;
    }
    showDialogToAdd() {
        this.newFee = true;
        this.fee =  new Marketfee();
        this.display = true;
    }
    saveFee() {
        let fees = [];
        // fees.push(this.fee);
        console.log('fee对象', this.fee, this.fees);
        if (this.newFee) {
           fees.push(this.fee);
           console.log('fees对象', fees);
        }else {
            fees[this.findSelectedCarIndex()] = this.fee;
        }
        this.fees = fees;
         console.log('fees--', this.fees);
        this.fee = null;
        this.display = false;
    }

    findSelectedCarIndex(): number {
        return this.fees.indexOf(this.selectedFee);
    }
    closeModal() {
        // this.activeModal.close();
     }

  //    厂牌型号
  showBrandModel() {
    this.brandModel = true;
  }

  saveBrand() {
   console.log('厂牌型号对象', this.brandForm.value);
   this.brandForm.reset();
   this.brandModel = false;
//    this.brandForm.val
  }




    /**
  * 已保存标志
  * @type {boolean}
  */
    saved = false;

    /**
 * 保存
 * @returns {boolean}
 */
    save() {
        if (this.form.invalid) {
            return false;
        }
        window.console.log('保存的对象', this.form.value);
        const marketmap = this.form.value as Marketmap;
        window.console.log('保存的map', marketmap);
        this.marketService.save(marketmap).then(res => {
            this.message.success('保存成功', '市场保存成功');
            this.saved = true;
        }).catch(err => {
            this.message.error('保存失败', err.json().message);
        });
    }
    back() {
        this.router.navigateByUrl('/pages/system/market');
    }
}
