import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../@core/utils/message.service';
import {CarModel} from '../../../@core/model/bussiness/car.model';
import {IdcardModel} from '../../../@core/model/bussiness/idcard.model';
import {IdcardService} from '../../../@core/device/idcard.service';
import {IccardService} from '../../../@core/device/iccard.service';
import {IccardModel, IccardOperaModel} from '../../../@core/model/bussiness/iccard.model';
import {FingerService} from '../../../@core/device/finger.service';
import {RestService} from '../../../@core/utils/rest.service';
import {CodeTransPipe} from '../../../@core/data/system/code.trans.pipe';

@Component({
  selector: 'ngx-ui-example',
  templateUrl: './ui-example.component.html',
  styleUrls: ['./ui-example.component.scss'],
})
export class UiExampleComponent implements OnInit {
  private current_calendar_value: string;
  private current_calendar_value2: string;
  public car: CarModel = new CarModel();
  public idcardData = new IdcardModel();
  public iccardData = new IccardModel('云石科技', '0001', 18);
  public iccardPayData = new IccardOperaModel();
  public iccardRechargeData = new IccardOperaModel();
  public fingerImgUrl = '/assets/images/camera1.jpg';
  public fingerBase64 = '';
  public autoinput_source_url = 'https://dongshenghuo.com/test.php?r=stringArr&q=';
  public auto_input_value_tmp = '';
  photos: any[] = [{
    title: '测试图一',
    source: 'assets/images/camera1.jpg',
  }, {
    title: '测试图二',
    source: 'assets/images/camera2.jpg',
  }];
  public codeTransValue = '';
  public codeTransSeleted = '';

  public dropListItems = [
    {label: '请选择城市', value: null},
    {label: '北京', value: {id: 1, name: '北京', code: 'beijing'}},
    {label: '上海', value: {name: '上海市', code: 'shanghai'}},
    {label: '汉口', value: 'hankoubei'},
  ];
  public dropListIccardSound = [
    {label: '选择声音直接播放', value: null},
    {label: '请插卡', value: '1'},
    {label: '请刷卡', value: '2'},
    {label: '读卡错误', value: '3'},
    {label: '请输入密码', value: '4'},
    {label: '密码错误', value: '5'},
    {label: '操作成功', value: '6'},
    {label: '操作超时', value: '7'},
    {label: '操作失败', value: '8'},
    {label: '请取回卡', value: '9'},
    {label: '请重新输入密码', value: '10'},
    {label: '请再次输入密码', value: '11'},
    {label: '请输入新密码', value: '12'},
    {label: '请输入旧密码', value: '13'},
    {label: '请确认新密码', value: '14'},
  ];
  getDropListSelect(event) {
    console.info(event);
    this.codeTransSeleted = JSON.stringify(event);
  }
  getDropListSelectItem(event) {
    console.info(event);
    this.codeTransSeleted = JSON.stringify(event);
  }
  test2Pipe(code: string, codemap: string) {
    this.codetrans.transform(codemap, code).then(res => this.codeTransValue = res);
  }
  test1Click(url) {
    this.rest.get(url).subscribe(res => {
      console.info(res);
    });
  }
  /**
   * 构造函数
   * @param {MessageService} message
   * @param {IdcardService} idcard
   * @param {IccardService} iccard
   * @param {FingerService} finger
   */
  constructor(
    private message: MessageService,
    private idcard: IdcardService,
    private iccard: IccardService,
    private finger: FingerService,
    private rest: RestService,
    private codetrans: CodeTransPipe,
  ) {
  }

  /**
   * 组件初始化接口函数
   */
  ngOnInit() {
  }

  /**
   * 获取子组件中的时间值
   */
  getYsCalendarValue($event) {
    this.message.info('日期控件示例', '刚刚选择了:' + $event);
    // this.current_calendar_value = new Date($event).toISOString().slice(0, 10); // 使用国际标准时间
    this.current_calendar_value = new Date($event).toString().slice(0, 10); // 使用当前时区时间
  }

  /**
   * 弹出消息提示当前子控件中用户选择的值
   */
  showYsCalendarValue() {
    this.message.info('日期控件示例', '当前选择的时间是:' + this.current_calendar_value);
  }

  /**
   * 获取子组件中的时间值
   */
  getYsCalendarValue2($event) {
    this.message.info('月份控件示例', '刚刚选择了:' + $event);
    const selectTime = new Date($event);
    this.current_calendar_value2 = selectTime.getFullYear() + '年' + (selectTime.getMonth() + 1).toLocaleString() + '月'; // 一月是0
  }

  /**
   * 弹出消息提示当前子控件中用户选择的值
   */
  showYsCalendarValue2() {
    this.message.info('月份控件示例', '当前选择的月份是:' + this.current_calendar_value2);
  }

  /**
   * 新的图片地址事件
   * @param $event
   * @param photo
   */
  onChangeSource($event, photo) {
    this.message.info(photo.title + ' 的新图片地址', $event);
  }
  /**
   * 读取身份证信息
   */
  readIdCard() {
    this.message.info('身份证', '读取卖方身份证');
    const self = this;
    this.idcard.prepare().then((res) => {
      if (res) { // 初始化读卡器正常
        self.idcard.read().then((idcardData) => this.idcardData = idcardData as IdcardModel);
      }
    });
  }

  /**
   * IC卡文本写入
   */
  iccardText() {
    const self = this;
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      if (true === res) {
        self.iccard.showText(this.iccardData.Text);
        this.message.info('IC卡操作', '文本已写入！');
      }
    });
  }

  /**
   * IC卡 声音播放
   */
  getDropListIccardSound(iccardVoidIndex) {
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((init) => {
      if (true === init) {
        this.iccard.playSound(iccardVoidIndex).then(res => {
          console.info(res);
        }).catch(e => {
          console.info(e);
        });
      }
    });
  }
  private iccardPassword = '';
  /**
   * IC卡 请输入密码
   */
  iccardPasswd() {
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      if (true === res) {
        this.iccard.getPassword().then(passRes => {
          console.info(passRes);
          this.iccardPassword = passRes;
        }).catch(e => {
          console.info(e);
        });
      }
    });
  }

  /**
   * IC卡充值
   */
  iccardRecharge() {
    const self = this;
    this.iccardRechargeData.amount = this.iccardRechargeData.amountDisplay * 100; // 单位转换
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      // console.log(res);
      if (true === res) {
        self.iccard.recharge(self.iccardRechargeData).then((r) => {
          if (r) {
            self.iccard.scanCard().then((s) => {
              self.iccardData.Banlance = s.Banlance;
              self.iccardData.BanlanceDisplay = (s.Banlance) / 100 ;
            }).catch((e) => {
              // console.log(e);
              self.message.success('IC卡操作', 'IC卡连接不稳定。未能获取到余额');
            });
            self.message.success('IC卡操作', '充值 ' + this.iccardRechargeData.amountDisplay + '元 成功！');
          }
        }).catch((e) => {
          // console.log(e);
          self.message.error('IC卡操作', '充值失败！请检查IC卡是否完好，链接是否正常。');
        });
      }
    }).catch((e) => {
      // console.log(e);
      this.message.error('IC卡操作', '设备连接失败！请检查设备链接是否成功。');
    });
  }

  /**
   * IC卡付款
   */
  iccardPay() {
    const self = this;
    this.iccardPayData.amount = this.iccardPayData.amountDisplay * 100; // 单位转换
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      // console.log(res);
      if (true === res) {
        self.iccard.pay(self.iccardPayData).then((r) => {
          if (r) {
            self.iccard.scanCard().then((s) => {
              self.iccardData.Banlance = s.Banlance;
              self.iccardData.BanlanceDisplay = (s.Banlance) / 100 ;
            }).catch((e) => {
              // console.log(e);
              self.message.success('IC卡操作', 'IC卡连接不稳定。未能获取到余额');
            });
            self.message.success('IC卡操作', '扣款 ' + this.iccardPayData.amountDisplay + '元 成功！');
          }
        }).catch((e) => {
          // console.log(e);
          self.message.error('扣款失败！', 'IC卡有误或余额不足。');
        });
      }
    }).catch((e) => {
      // console.log(e);
      this.message.error('IC卡连接失败！', '设备或IC卡不正常或连接有误。');
    });
  }

  /**
   * 读取IC卡信息
   */
  readIccard() {
    const self = this;
    this.iccardPayData.amount = this.iccardPayData.amountDisplay * 100; // 单位转换
    this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then((res) => {
      // console.log(res);
      if (true === res) {
        self.iccard.scanCard().then((s) => {
          self.iccardData.Banlance = s.Banlance;
          self.iccardData.BanlanceDisplay = (s.Banlance) / 100 ;
        }).catch((e) => {
          // console.log(e);
          self.message.success('IC卡操作', 'IC卡连接不稳定。未能获取到余额');
        });
      }
    }).catch((e) => {
      // console.log(e);
      this.message.error('IC卡连接失败！', '设备或IC卡不正常或连接有误。');
    });
  }

  /**
   * 指纹读取
   */
  fingerRead() {
    this.message.info('指纹读取', '读取指纹');
    this.finger.read().then((data) => {
      const response = JSON.parse(data.File);
      // console.log(response.file[0]);
      this.fingerImgUrl = response.file[0];
      this.fingerBase64 = data.Base64;
    }).catch((error) => {
      // console.log(error);
    });
  }

  /**
   * 指纹验证
   */
  fingerVerify() {
    this.message.info('指纹验证', '验证指纹');
    this.finger.verify(this.fingerBase64).then((verify) => {
      // console.log(verify);
    });
  }

  /**
   * 输入提示，模糊搜索
   * @param event
   */
  getAutoInputValue(event) {
    if (this.auto_input_value_tmp !== event) {
      this.auto_input_value_tmp = event;
      this.message.info('输入提示', '您选择了：' + JSON.stringify(event));
    }
  }
}
