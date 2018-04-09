import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TradeService} from '../../../data/business/trade.service';
import {BusinessTradeForm} from '../../../model/business/restruct/business.trade.form';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BusinessFormGroup} from '../../../../pages/business/business.form-group';

@Component({
  selector: 'ngx-ys-trade-form-all',
  templateUrl: './trade-form-all.component.html',
  styleUrls: ['./trade-form-all.component.scss'],
})
export class TradeFormAllComponent implements OnInit, OnChanges {
  @Input() archiveNo = '';
  public businessTradeForm: BusinessTradeForm = {};
  public _formGroupSeller: FormGroup = this._formBuilder.group({
    seller: this._businessFormGroup.seller,
    photos: this._formBuilder.group({}),
  });
  public _formGroupVechile: FormGroup = this._formBuilder.group({
    preVehicle: this._businessFormGroup.vehicleAndData,
    photos: this._formBuilder.group({}),
  });
  public _formGroupBuyer: FormGroup = this._formBuilder.group({
    // reviewPhotos: '',
    photos: {},
    trusteePhotos: {},
    buyer: this._businessFormGroup.buyer,
  });
  public _formGroupTransferVehicle: FormGroup = this._formBuilder.group({
    photos: {},
    transferVehicle: this._businessFormGroup.vehicleTransfer,
  });
  constructor(
    private _formBuilder: FormBuilder,
    public _businessFormGroup: BusinessFormGroup,
    private _trade: TradeService,
  ) { }

  ngOnChanges(): void {
    if ( this.archiveNo ) {
      console.info(`收到车辆流水号 archiveNo ${this.archiveNo}`);
      this._trade.get2(this.archiveNo).then(res => {
        this.businessTradeForm = res as BusinessTradeForm;
        /**
         * 表单赋值
         */
        this._formGroupSeller.patchValue(this.businessTradeForm.seller);
        this._formGroupBuyer.patchValue(this.businessTradeForm.buyer);
        this._formGroupVechile.patchValue(this.businessTradeForm.preVehicle);
        this._formGroupTransferVehicle.patchValue(this.businessTradeForm.transferVehicle);
      }).catch(err => {
        console.info('err', err);
      });
    } else {
      console.info('input ', this.archiveNo);
    }
  }

  ngOnInit() {
  }
}
