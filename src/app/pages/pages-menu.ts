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
        link: '/pages/bussiness/transfer',
      },
      {
        title: '绑卡与卡片管理',
        link: '/pages/bussiness/transfer',
      },
      {
        title: '密码重置',
        link: '/pages/bussiness/transfer',
      },
      {
        title: '冲红与转账',
        link: '/pages/bussiness/transfer',
      },
      {
        title: '挂失与解绑',
        link: '/pages/bussiness/transfer',
      },
    ],
  },
  {
    title: '缴费支付',
    icon: 'ion-social-usd-outline',
    children: [
      {
        title: '开具发票',
        link: '/pages/bussiness/transfer',
      },
      {
        title: '订单管理',
        link: '/pages/bussiness/transfer',
      },
      {
        title: '转账与转账记录',
        link: '/pages/bussiness/transfer',
      },
    ],
  },
  {
    title: '系统',
    icon: 'ion-ios-settings',
    link: '/pages/system',
    children: [
      {title: '代码集', link: '/pages/system/code'},
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
