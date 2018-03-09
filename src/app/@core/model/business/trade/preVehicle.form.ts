import {PreVehicleModel} from './preVehicle/preVehicle.model';

/**
 * 预审车辆对象实例
 * [预审和直接过户时(创建和增加)必须]
 */
export class PreVehicleForm {
  /**
   * 卖方录入图片列表<map>
   */
  photos?: object;
  preVehicle?: PreVehicleModel;
  /**
   * 新车价格 number  [录入时必须]
   */
  newCarsPrice?: string;
}
