import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'ion-ios-home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '业务',
    icon: 'ion-ios-briefcase-outline',
    children: [
      {
        title: '预审业务',
        link: '/pages/bussiness/prejudication',
      },
      {
        title: '过户业务',
        link: '/pages/bussiness/transfer',
      },
      {
        title: '交易变更',
        link: '/pages/bussiness/transfer',
      },
      {
        title: '缴费撤销',
        link: '/pages/bussiness/transfer',
      },
      {
        title: '公车拍卖',
        link: '/pages/bussiness/transfer',
      },
    ],
  },
  {
    title: '备案',
    icon: 'ion-ios-bookmarks-outline',
    children: [
      {
        title: '商户备案',
        link: '/pages/bussiness/transfer',
      },
      {
        title: '商户员工备案',
        link: '/pages/bussiness/transfer',
      },
    ],
  },
  {
    title: 'IC卡管理',
    icon: 'ion-ios-barcode-outline',
    children: [
      {
        title: '充值与记录',
        link: '/pages/ic-card/recharge-keep',
      },
      {
        title: '密码重置',
        link: '/pages/ic-card/password-reset',
      },
      {
        title: 'IC卡冲红与转账',
        link: '/pages/ic-card/transfer-accounts',
      },
      {
        title: '卡片管理',
        link: '/pages/ic-card/card-manage',
      },
    ],
  },
  {
    title: '缴费支付',
    icon: 'ion-social-usd-outline',
    children: [
      {
        title: '开具发票',
        link: '/pages/money/print-invoice',
      },
      {
        title: '订单管理',
        link: '/pages/money/order-manage',
      },
      {
        title: '缴费支付',
        link: '/pages/money/payment',
      },
      {
        title: 'IC卡消费记录',
        link: '/pages/money/consume-record',
      },
      {
        title: 'IC卡转账记录',
        link: '/pages/money/transfer-record',
      },
      {
        title: '支付详情查询',
        link: '/pages/money/payment-detail',
      },
      {
        title: 'IC卡流水查询',
        link: '/pages/money/turnover-detail',
      },
    ],
  },
  {
    title: '档案管理',
    icon: 'ion-social-usd-outline',
    children: [
      {
        title: '档案查询',
        link: '/pages/archives-manage/inquiry',
      }, {
        title: '档案送出',
        link: '/pages/archives-manage/send',
      }, {
        title: '档案到达',
        link: '/pages/archives-manage/arrive',
      }, {
        title: '档案签收',
        link: '/pages/archives-manage/sign',
      }, {
        title: '废旧车牌统计',
        link: '/pages/archives-manage/old-licence',
      },
    ],
  },
  {
    title: '公车拍卖',
    icon: 'ion-ios-settings',
    children: [
      {
        title: '公车拍卖管理',
        link: '/pages/common-auction/auction-manage',
      },
      {
        title: '返点报表',
        link: '/pages/common-auction/rebate-form',
      },
      {
        title: '优惠结算',
        link: '/pages/common-auction/discount-balance',
      },
    ],
  },
  {
    title: '系统',
    icon: 'ion-ios-settings',
    link: '/pages/system',
    children: [
      {title: '代码集', link: '/pages/system/code'},
      {title: '用户管理', link: '/pages/system/manager'},
      {title: '提档所在地管理', link: '/pages/system/transfercity'},
      {title: '车辆类型管理', link: '/pages/system/cartype'},
      {title: '车辆黑名单', link: '/pages/system/blacklist'},
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'UI Features',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Buttons',
        link: '/pages/ui-features/buttons',
      },
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Modals',
        link: '/pages/ui-features/modals',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
      {
        title: 'Tabs',
        link: '/pages/ui-features/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'nb-compose',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'Components',
    icon: 'nb-gear',
    children: [
      {
        title: 'Tree',
        link: '/pages/components/tree',
      }, {
        title: 'Notifications',
        link: '/pages/components/notifications',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
