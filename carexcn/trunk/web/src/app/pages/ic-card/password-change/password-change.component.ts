import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {MessageService} from '../../../@core/utils/message.service';
import {IcCardOperationService}from '../../../@core/data/ic-card/card.service'
import { changePasswordModel} from '../../../@core/model/icCard/changePassword';
import {IccardService} from '../../../@core/device/iccard.service';
import {IccardModel, IccardOperaModel} from '../../../@core/model/bussiness/iccard.model';

@Component({
  selector: 'ngx-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  providers:[IcCardOperationService],
})
export class PasswordChangeComponent implements OnInit {

   changePasswordModel=  new changePasswordModel();
   public iccardData = new IccardModel('云石科技', '0001', 18);
   //控制页面提示消息
   oldPwd = false;
   newPwd = false;
   reNewPwd = false;

  constructor(private IcCardOperationService: IcCardOperationService,  public router: Router,
              private route: ActivatedRoute, private message: MessageService,private iccard: IccardService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.icCardNo) {
       this.changePasswordModel.icCardNo = p.icCardNo;
      }
    });
    this.changePasswordModel.cloudUser = '0001';
    this.iccardInit();
  }

  /**
   * ic卡初始化
   */
  iccardInit(){
      this.iccard.writerInit(this.iccardData.market, this.iccardData.maker, this.iccardData.txnSlot).then( res =>{
        this.message.success('','ic卡初始化完成!');
      }).catch(err =>{
        this.message.error('',err.jsson.message);
      })
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
   * ic卡密码修改
   */

  changePassword(){
    console.log('修改密码ing');
    this.iccard.playSound(13);/*请输入旧密码*/
    this. oldPwd = true;this. newPwd = false;this. reNewPwd = false;
    this.iccard.getPassword().then(oldpwd =>{
      console.log('输入旧密码',oldpwd);
      this.changePasswordModel.oldPassWord = oldpwd;
      if(oldpwd.length!=6){
        this.iccard.playSound(5);
        this.iccard.showText("密码错误");
      }else {
        this.iccard.playSound(12); /*请输入新密码 */
        this. oldPwd = false;this. newPwd = true;this. reNewPwd = false;
        this.iccard.getPassword().then(newpwd =>{
          console.log('新的密码',newpwd);
          this.changePasswordModel.newPassWord = newpwd;
          if(newpwd.length!=6){
            this.iccard.playSound(5);
            this.iccard.showText("密码错误");
          }else {
            this.iccard.playSound(14);/*请确认新密码*/
            this. oldPwd = false;this. newPwd = false;this. reNewPwd = true;
            this.iccard.getPassword().then(reNewPwd =>{
              this.changePasswordModel.reNewPassword =  reNewPwd;
               this.IcCardOperationService.iccardChange(this.changePasswordModel).then(res=>{
                 this.message.success('修改密码成功!','');
                 this.changePasswordModel.oldPassWord = '';
                 this.changePasswordModel.newPassWord = '';
                 this.changePasswordModel.reNewPassword = '';
                 this. oldPwd = false;this. newPwd = false;this. reNewPwd = false;
               }).catch(err=>{
                 this.message.error('',err.json().message);
                 this. oldPwd = false;this. newPwd = false;this. reNewPwd = false;
               })
            })
          }
        })
      }
    })
  }

}
