import {FilingInfoModel} from '../../filing.info.model';

export class PreVehicleModel {
  /**
   * 备案人对象实例{id}
   */
  filingInfo?: FilingInfoModel;
  /**
   * 厂牌型号名称
   */
  labelCode?: string;
  /**
   * 车辆类型代码
   */
  vehicleType?: string;
  /**
   * 车牌号
   */
  plateNumber?: string;
  /**
   * 车架号
   */
  frameNumber?: string;
  /**
   * 登记证书号
   */
  registratio?: string;
  /**
   * 行驶证注册日期
   */
  registrationDate?: string;
  /**
   * 使用性质 代码集 （营运、非营运等）
   */
  useCharacter?: string;
  /**
   * 车辆性质 代码集 （私、公）
   */
  useNature?: string;
  /**
   * 排量
   */
  displacement?: string;
  /**
   * 排量区间 代码集
   */
  range?: string;
  /**
   * 车辆大小 代码集
   */
  size?: string;
  /**
   * 行驶里程
   */
  mileage?: string;
  /**
   * 其他状况
   */
  otherConditions?: string;
  /**
   * 车辆产地 代码集（国产、进口）
   */
  origin?: string;
  /**
   * 业务手续费
   */
  fee?: string;
}
