import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage }                             from '@ionic/storage';
import { Events } from 'ionic-angular';

import { AuthProvider }        from '../../providers/auth/auth';
import { RespuestaAuthModule } from '../../models/respuesta.authmodule';
import { LoginModel }          from '../../models/login';

import { ResetPassPage }                       from '../reset-pass/reset-pass';
import { HomePage }                            from '../home/home';

import { GeneralService } from '../../services/general.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{

  login_form:LoginModel = new LoginModel();

  private loginOK;
  private loginKO;

  constructor(
    public  navCtrl:      NavController,
    public  navParams:    NavParams,
    private authProvider: AuthProvider,
    private storage:      Storage,
    public  gral:         GeneralService,
    public events:        Events
  ) {}

  loginUser() {
    this.gral.presentLoading();
    this.authProvider.login(this.login_form);
  }

  resetPassPage(){
    this.navCtrl.push(ResetPassPage);
  }

  ionViewDidEnter(){
    this.loginOK = this.authProvider.loginOK.subscribe({  next: (r) => {
      let d:any = <RespuestaAuthModule> r;

      if (d['result']['success']){
        this.storage.set('LOGIN',d['result']);
        this.authProvider.userData = d['result'];
        this.events.publish('user:logedIn', d['result']);
        this.navCtrl.setRoot(HomePage);
      }

      if (d['error'] !== ''){
        this.gral.newMensaje('Usuario o contraseña inválida');
      }
      this.gral.dismissLoading();
    } });

    this.loginKO = this.authProvider.loginKO.subscribe({  next: (r) => {
      this.gral.errMsg(r);
      this.gral.dismissLoading();
    } });
  }

  ionViewDidLeave(){
    this.loginOK.unsubscribe();
    this.loginKO.unsubscribe();
  }

  ionViewDidLoad() { }

}
