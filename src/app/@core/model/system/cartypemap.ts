// 车辆类型模型
export  class Cartypemap{
 public  id: string;
  /**
   *车辆类型名称
   */
  public  name:string;
  /**
   * 市场
   */
  public market:{
    id :string,
    name:string,
  };
  /**
   * 备注
   */
  public memo:string;

  public cloudUser:string;
  /**
   * 代码
   */
  public  code:string;
  /**
   * 车辆类型代码集（车管所定义）
   */
  public  vehicleTypeCode:string;
  /**
   * 车辆类别代码集（如出租车等，市场定义）
   */
  public  vehicleCategoryCode:string;
}

