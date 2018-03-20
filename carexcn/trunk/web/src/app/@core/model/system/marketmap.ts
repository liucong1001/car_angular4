import {Areamap} from './areamap';

/**
 * 市场配置模型
 */
export class Marketmap {
  public id: string;
  /**
   * 市场名称
   */
  public name: string;

  public cloudUser: string;

  public code: string;
  /**
   * 市场代码
   */
  public number: string;
  /**
   * 地区
   */
  public area: Areamap;
  /**
   * 市场备注
   */
  public memo: string;
  /**
   * 银行账号
   */
  public yinhangzhanghao?: string;
  /**
   * 电话号码
   */
  public dianhuahaoma?: string;
}
