import {FormBuilder, Validators} from '@angular/forms';
import {NgModule} from '@angular/core';

@NgModule({
})
export class BusinessFormGroup {
  public trustee = this._formBuilder.group({
    certCode: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(64)]],
    endDate: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    trusteeType: ['0', [Validators.required]],
    address: ['', [Validators.required]],
  });
  public seller = this._formBuilder.group({
    certType: ['', [Validators.required]],
    certCode: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(64)]],
    endDate: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    trusteeType: ['0', [Validators.required]],
    address: ['', [Validators.required]],
    sellerAddress: ['', [Validators.required]],
    Trustee: this.trustee,
    // flag: ['', [Validators.required]],
  });
  public buyer = this._formBuilder.group({
    certType: ['', [Validators.required]],
    certCode: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(64)]],
    endDate: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    trusteeType: ['0', [Validators.required]],
    address: ['', [Validators.required]],
    buyerAddress: ['', [Validators.required]],
    Trustee: this.trustee,
    // flag: ['', [Validators.required]],
  });
  public vehicleTransfer = this._formBuilder.group({
    vehicleManagement: ['', [Validators.required]],
    billMemo: ['', [Validators.required]],
    evaluatePrice: [''], // 不要求必填，后台配置该参数是否必填
    bargainPrice: ['', [Validators.required]],
    fee: ['', [Validators.required]],
  });
  public vehicle = this._formBuilder.group({
    // brandModel: [{ value: '', disabled: false }, [Validators.maxLength(50)]], // 厂牌型号实体Id
    labelCode: [{ value: '', disabled: false }, [Validators.required]],
    vehicleType: [{ value: '', disabled: false }, [Validators.required]],
    plateNumber: [{ value: '', disabled: false }, [Validators.required]],
    frameNumber: [{ value: '', disabled: false }, [Validators.required]],
    engineNumber: [{ value: '', disabled: false }, [Validators.required]], // 发动机号必须
    registration: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(12)]],
    registrationDate: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
    useCharacter: [{ value: '', disabled: false }, [Validators.required]],
    useNature: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
    displacement: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
    range: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
    size: [{ value: '', disabled: false }, [Validators.required]],
    mileage: [{ value: '', disabled: false }, [Validators.required]],
    otherConditions: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
    origin: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
    fee: [{ value: '', disabled: false }, [Validators.required]],
    // eeee: [{ value: '', disabled: false }, [Validators.maxLength(50)]],
    /**
     * TODO: 注意 eeee 字段，后台可能暂未准备好接收，但是是业务必须的字段
     * TODO: 注意 eeee 字段的错误信息
     */
  });
  public vehicleAndData = this._formBuilder.group({
    // brandModel: ['1', [Validators.maxLength(50)]], // 厂牌型号实体Id
    labelCode: ['宝马WBA1A110', [Validators.required]], // 厂牌型号名称
    vehicleType: ['01', [Validators.required]], // 车辆类型代码
    plateNumber: ['', [Validators.required]], // 车牌号
    frameNumber: ['LVGBE40K28G244297', [Validators.required]], // 车架号
    engineNumber: ['C466626', [Validators.required]], // 发动机号必须
    registration: ['1', [Validators.required, Validators.maxLength(12)]], // 登记证书号 行驶证号
    registrationDate: ['20080924', [Validators.required]], // 行驶证注册日期
    useCharacter: ['01', [Validators.required]], // 使用性质代码
    useNature: ['01', [Validators.required]], // 车辆性质
    displacement: ['01', [Validators.required]], // 设置排量
    range: ['01', [Validators.required]], // 排量区间代码
    size: ['01', [Validators.required]], // 车辆大小代码
    mileage: ['1000', [Validators.required]], // 行驶里程
    otherConditions: ['1', [Validators.required]], // 其它状况说明
    origin: ['01', [Validators.required]], // 车辆产地
    fee: ['284', [Validators.required]], // 手续费

    // eeee: ['', [Validators.maxLength(50)]],
    /**
     * TODO: 注意 eeee 字段，后台可能暂未准备好接收，但是是业务必须的字段
     * TODO: 注意 eeee 字段的错误信息
     */
  });
  constructor(
    private _formBuilder: FormBuilder,
  ) {}
}
