export class BusinessForm {
  id?: string;
  /**
   * 业务类型代码值
   * 预审 01 过户 02(后面可能要统一到代码集)
   */
  businessType?: string;
  /**
   * 业务流水号(预审批次号)
   */
  archiveNo?: string;
  /**
   * 是否有效 0 有效 1 无效
   */
  invalid?: string;
  /**
   * 业务所有者标识 (目前仅预审业务含值，标识直接过户)
   */
  ownerId?: string;
}
