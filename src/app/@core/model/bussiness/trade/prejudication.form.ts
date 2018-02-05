import {BussinessForm} from './prejudication/bussiness.form';
import {TransferVehicleModel} from './transferVehicle/transferVehicle.model';

export class PrejudicationForm {
  id?: string;
  business?: BussinessForm;
  /**
   * 来源标记 0 pc 1 app
   */
  formFlage?: string;
  /**
   * 是否有效 0 有效 1 无效
   */
  invalid?: string;

  preVehicle?:TransferVehicleModel;
}
