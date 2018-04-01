export interface Account {
  cloudUser: string;
  createUserId: string;
  createTime: number;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id: string;
  accountName: string;
  accountNo: string;
  flag: string;
}

export interface MerchantFilingAgency {
  cloudUser: string;
  createUserId: string;
  createTime: number;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id: string;
  name: string;
  code: string;
  certCode: string;
  address: string;
  phone: string;
  endDate: string;
  discount: number;
  isCarRental: string;
  isDeal: string;
  isPersonal: string;
  disableSign: string;
  invalid: string;
  master?: any;
  account: Account;
  flag: string;
  codeAndName: string;
}


