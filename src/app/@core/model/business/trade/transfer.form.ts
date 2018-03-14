import {BusinessForm} from './prejudication/business.form';

export class TransferForm {
  id?: string;
  business?: BusinessForm;
  /**
   * 来源标记 0 pc 1 app
   */
  formFlage?: string;
  /**
   * 是否有效 0 有效 1 无效
   */
  invalid?: string;
}
