import {Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Injectable()
export class BussinessFormService {
  constructor(
    private _formBuilder: FormBuilder,
  ) {}
  public _formGroup = this._formBuilder.group({
    seller: this._formBuilder.group({
      certType: [{ value: '', disabled: true }, [Validators.required]],
      certCode: [{ value: '', disabled: true }, [Validators.required]],
      name: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(64)]],
      endDate: [{ value: '', disabled: true }, [Validators.required]],
      phone: [{ value: '', disabled: true }, [Validators.required]],
      trusteeType: [{ value: '0', disabled: true }, [Validators.required]],
      address: [{ value: '', disabled: true }, [Validators.required]],
      Trustee: this._formBuilder.group({
        certCode: [{ value: '', disabled: true }, [Validators.required]],
        name: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(64)]],
        endDate: [{ value: '', disabled: true }, [Validators.required]],
        phone: [{ value: '', disabled: true }, [Validators.required]],
        trusteeType: [{ value: '0', disabled: true }, [Validators.required]],
        address: [{ value: '', disabled: true }, [Validators.required]],
      }),
      // flag: ['', [Validators.required]],
    }),
    vehicle: this._formBuilder.group({
      brandModel: [{ value: '', disabled: true }, [Validators.required]], // 厂牌型号实体Id
      labelCode: [{ value: '', disabled: true }, [Validators.required]],
      vehicleType: [{ value: '', disabled: true }, [Validators.required]],
      plateNumber: [{ value: '', disabled: true }, [Validators.required]],
      frameNumber: [{ value: '', disabled: true }, [Validators.required]],
      engineNumber: [{ value: '', disabled: true }, [Validators.required]],
      registration: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(12)]],
      registrationDate: [{ value: '', disabled: true }, [Validators.required]],
      useCharacter: [{ value: '', disabled: true }, [Validators.required]],
      useNature: [{ value: '', disabled: true }, [Validators.required]],
      displacement: [{ value: '', disabled: true }, [Validators.required]],
      range: [{ value: '', disabled: true }, [Validators.required]],
      size: [{ value: '', disabled: true }, [Validators.required]],
      mileage: [{ value: '', disabled: true }, [Validators.required]],
      otherConditions: [{ value: '', disabled: true }, [Validators.required]],
      origin: [{ value: '', disabled: true }, [Validators.required]],
      fee: [{ value: '', disabled: true }, [Validators.required]],
      review: [{ value: '', disabled: true }, [Validators.required]],
      invalid: [{ value: '', disabled: true }, [Validators.required]],
      eeee: [{ value: '', disabled: true }, [Validators.maxLength(50)]],
      /**
       * TODO: 注意 eeee 字段，后台可能暂未准备好接收，但是是业务必须的字段
       * TODO: 注意 eeee 字段的错误信息
       */
    }),
  });
}
