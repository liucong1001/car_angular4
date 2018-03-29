// declare enum StatusEnum {
//   HASBEENENTERED = "00",
//   HasBeenEntered = '00',
//   HasBeenReviewed = '01',
//   HasBeenCompleted = '02',
//   HasBeenDeleted = '03',
//   toBeEntered = '04',
//   IsEntering = '05',
//   HasBeenReturned = '06',
// }
/**
 * 交易表单
 */
export class TradeForm_continue {
  /**
   * 当前用户
   * [所有情况必须]
   */
  cloudUser: string;
  /**
   * 车辆流水号
   * [预审后的过户操作必须][修改必须]
   */
  archiveNo: string;
  /**
   * 预审业务对象  [仅读取用，不需要操作]
   */
  prejudication: object;
  /**
   * 预审业务对象状态
   * 0已录入;1已审核;2已完成;3已删除;4待录入;5正在录入;6已退回;
   * [修改操作时必须]
   */
  // prejudicationStatus: StatusEnum;
  prejudicationStatus: string;
  /**
   * 卖方表单模型
   */
  seller: object;
  /**
   * 车辆表单模型
   */
  preVehicle: object;
  /**
   * 过户业务对象实例（结构同prejudication） [仅读取用，不需要操作]
   */
  transfer?: object;
  /**
   * 过户业务对象状态
   * 0已录入;1已审核;2已完成;3已删除;4待录入;5正在录入;6已退回;
   * [修改时必须]
   */
  transferStatus?: string;
  buyer?: object;
  transferVehicle?: object;
}
