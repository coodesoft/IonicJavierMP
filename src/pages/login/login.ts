import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators }  from '@angular/forms';
import { ResetPassPage }                       from '../reset-pass/reset-pass';
import { HomePage }                            from '../home/home';
import { Storage }                             from '@ionic/storage';
import { Events } from 'ionic-angular';

import { AuthProvider }   from '../../providers/auth/auth';
import { RespuestaAuthModule } from '../../models/respuesta.authmodule';

import { GeneralService } from '../../services/general.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{

  loginForm:FormGroup;
  resetPassPage = ResetPassPage;

  constructor(
    public  navCtrl:      NavController,
    public  navParams:    NavParams,
    public  formBuilder:  FormBuilder,
    private authProvider: AuthProvider,
    private storage:      Storage,
    public  gral:         GeneralService,
    public events:        Events
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });

  }

  loginUser() {
    this.gral.presentLoading(15000);
    this.authProvider.login({
      "email":this.loginForm.controls.user.value,
      "password":this.loginForm.controls.pass.value
    })
      .subscribe(data => {
        let d:any = <RespuestaAuthModule> data;

        if (d['result']['success']){
          this.storage.set('LOGIN',d['result']);
          this.authProvider.userData = d['result'];
          this.events.publish('user:logedIn', d['result']);
          this.navCtrl.setRoot(HomePage);
        }

        if (d['error'] !== ''){
          this.gral.newMensaje('Usuario o contraseña inválida');
        }
      }, err => {
        this.gral.newMensaje('Ocurrió un error al intentar realizar la consulta');
      });
  }

  ionViewDidLoad() {}

}
