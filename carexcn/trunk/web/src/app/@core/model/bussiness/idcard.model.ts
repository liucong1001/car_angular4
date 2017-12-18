/**
 * 身份证芯片识别数据结构
 */
export class IdcardModel {
  /**
   * 身份证家住地址
   */
  Address: string;
  /**
   * 身份证生日
   * 格式：yyyymmdd
   */
  Birthday: string;
  /**
   * 隶属管辖的公安局
   */
  GrantDept: string;
  /**
   * 身份证号
   */
  IdCardNo: string;
  /**
   * 身份证姓名
   */
  Name: string;
  /**
   * 民族
   * 1:汉族;
   */
  Nation: string;
  /**
   * 性别
   * 1:男;
   */
  Sex: string;
  /**
   * 身份证有效的截止日期
   * 格式：yyyymmdd
   */
  UseEnd: string;
  /**
   * 身份证有效的开始日期
   * 格式：yyyymmdd
   */
  UseStart: string;
}
