export interface Prejudication {
  cloudUser?: string;
  createUserId?: string;
  createTime?: number;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id?: string;
  type?: string;
  sn?: string;
  fromFlag?: string;
  invalid?: string;
  version?: number;
  batchNo?: string;
  archiveNo?: string;
  status?: string;
  complete?: string;
  inputer?: string;
  inputTime?: number;
  reviewer?: any;
  reviewTime?: any;
  locker?: any;
  sellerId?: string;
  preVehicleId?: string;
}

export interface FileDescription {
  cloudUser?: string;
  id?: string;
  objectType?: string;
  objectId?: string;
  fileType?: string;
  fileExtName?: string;
  sortNumber?: any;
  filePath?: string;
  deleted?: boolean;
  rotate?: any;
}

export interface Photos {
  [index: string]: FileDescription[];
}

export interface Seller2 {
  cloudUser?: string;
  createUserId?: any;
  createTime?: any;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id?: string;
  tradeType?: string;
  certType?: string;
  certCode?: string;
  name?: string;
  endDate?: string;
  phone?: string;
  filingInfo?: any;
  reviewType?: string;
  trusteeType?: string;
  address?: string;
  sellerTrustee?: any;
  flag?: any;
  type?: any;
}

export interface Seller {
  reviewPhotos?: any;
  photos?: Photos;
  trusteePhotos?: Photos;
  seller?: Seller2;
}

export interface Vehicle {
  cloudUser?: string;
  createUserId?: any;
  createTime?: any;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id?: string;
  plateNumber?: string;
  lock?: string;
  lockReason?: any;
  lockUser?: any;
  complete?: string;
}

export interface Account {
  cloudUser?: string;
  createUserId?: string;
  createTime?: number;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id?: string;
  accountName?: string;
  accountNo?: string;
  flag?: string;
}

export interface Merchant {
  cloudUser?: string;
  createUserId?: string;
  createTime?: number;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id?: string;
  name?: string;
  code?: string;
  certCode?: string;
  address?: string;
  phone?: string;
  endDate?: string;
  discount?: number;
  isCarRental?: string;
  isDeal?: string;
  isPersonal?: string;
  disableSign?: string;
  invalid?: string;
  master?: any;
  account?: Account;
  flag?: string;
  codeAndName?: string;
}

export interface FilingPerson {
  cloudUser?: string;
  createUserId?: any;
  createTime?: any;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id?: string;
  loginName?: any;
  userName?: any;
  lastTime?: any;
  lastIp?: any;
  email?: any;
  status?: any;
  type?: string;
  roles?: any;
  telephone?: any;
  permissons?: any[];
  initPwd?: any;
  certCode?: string;
  perms?: any;
  agency?: any;
}

export interface FilingInfo {
  cloudUser?: string;
  createUserId?: string;
  createTime?: number;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id?: string;
  name?: string;
  spell?: string;
  address?: string;
  phone?: string;
  endDate?: string;
  isAgency?: string;
  isDeal?: string;
  isApp?: string;
  disableSign?: string;
  invalid?: string;
  merchant?: Merchant;
  filingPerson?: FilingPerson;
}

export interface Merchant2 {
  cloudUser?: string;
  createUserId?: string;
  createTime?: number;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id?: string;
  name?: string;
  code?: string;
  certCode?: string;
  address?: string;
  phone?: string;
  endDate?: string;
  discount?: number;
  isCarRental?: string;
  isDeal?: string;
  isPersonal?: string;
  disableSign?: string;
  invalid?: string;
  master?: any;
  account?: Account;
  flag?: string;
  codeAndName?: string;
}

/**
 * 不要问我为什么这么搞，别问我经历了什么
 */
export interface PreVehicle2 {
  cloudUser?: string;
  createUserId?: any;
  createTime?: any;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id?: string;
  vehicle?: Vehicle;
  filingInfo?: FilingInfo;
  merchant?: Merchant2;
  brandModel?: string;
  labelCode?: string;
  vehicleType?: string;
  plateNumber?: string;
  frameNumber?: string;
  registration?: string;
  registrationDate?: number;
  useCharacter?: string;
  useNature?: string;
  displacement?: string;
  range?: string;
  size?: string;
  mileage?: number;
  otherConditions?: string;
  origin?: string;
  fee?: number;
  review?: string;
  invalid?: string;
}

export interface PreVehicle {
  photos?: Photos;
  targetPath?: string;
  preVehicle?: PreVehicle2;
  newCarsPrice?: any;
}
export interface TransferVehicle {
  id?: string;
  /**
   * 备案人对象实例{id}
   */
  filingInfo?: FilingInfo;
  /**
   * 商户
   */
  merchant?: Merchant;
  /**
   * 车管所
   */
  vehicleManagement?: object;
  /**
   * 发表备注
   */
  billMemo?: string;
  /**
   * 评估价格 number
   */
  evaluatePrice?: string;
  /**
   * 成交价格 number
   */
  bargainPrice?: string;
  /**
   * 手续费 number
   */
  fee?: string;
  /**
   * 审核状态
   * 0 - 未审核 1 - 已审核
   */
  review?: string;
  /**
   * 业务状态
   * 是否有效 0 有效 1 无效
   */
  invalid?: string;
}
export interface BusinessTradeForm {
  cloudUser?: string;
  archiveNo?: string;
  prejudication?: Prejudication;
  seller?: Seller;
  preVehicle?: PreVehicle;
  transfer?: any;
  preBatchNo?: any;
  buyer?: any;
  transferVehicle?: TransferVehicle;
  bills?: any;
  business?: any;
}
