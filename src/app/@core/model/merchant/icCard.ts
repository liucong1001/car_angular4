/**
 *  绑卡——ic卡对象
 */

/**
 * IC卡信息数据结构
 */
export class IcCardmap {
  /**
   * 制造商
   */
  maker?: string;
  /**
   * 市场(编号)
   */
  market?: string;
  /**
   * txnSlot
   */
  txnSlot?: number;
  /**
   * IC卡卡号
   */
  icCardNo: string;
  /**
   * IC卡结余(设备值)
   * 单位:分(元后面两位小数，都在整型范围内)
   */
  Banlance?: number;
  /**
   * IC卡结余(用于显示)
   * 单位:元
   */
  BanlanceDisplay?: number;
  /**
   * 语音播报编号
   * index 1、请插卡 2、请刷卡 3、读卡错误 4、请输入密码 5、密码错误
   *  6、操作成功 7、操作超时 8、操作失败 9、请取回卡
   *  10、请重新输入密码 11、请再次输入密码 12、请输入新密码 13、请输入旧密码 14、请确认新密码
   */
  Sound?: number;
  /**
   * 屏幕显示文字
   */
  Text?: string;

  /**
   * 密码
   */
  passWord?:string;

}
