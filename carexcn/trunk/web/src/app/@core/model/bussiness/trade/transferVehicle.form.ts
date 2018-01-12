/**
 * 过户车辆对象实例	    [过户时(创建和增加)必须]
 */
import {TransferVehicleModel} from './transferVehicle/transferVehicle.model';


export class TransferVehicleForm {
  /**
   * 卖方录入图片列表<map>
   */
  photos?: object;
  transferVehicle?: TransferVehicleModel;
  /**
   * 预审车辆标识
   */
  preVehicleId?: string;
}
