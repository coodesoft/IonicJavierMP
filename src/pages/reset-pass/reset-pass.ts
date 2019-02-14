import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-reset-pass',
  templateUrl: 'reset-pass.html',
})

export class ResetPassPage {

  rPassForm:FormGroup;
  user:string;

  constructor(
    public  navCtrl:      NavController,
    public  navParams:    NavParams,
    private authProvider: AuthProvider,
    public  formBuilder:  FormBuilder,
    public  toastCtrl:    ToastController,
    public  loadingCtrl:  LoadingController
  ){
    this.rPassForm = this.formBuilder.group({
      user: ['', Validators.required]
    });
  }

  resetPass() {
    this.presentLoading();
    this.authProvider.resetPass({
      "email":this.rPassForm.controls.user.value
    })
      .subscribe(data => {
        this.user = "";
        this.newMensaje('Verifique su e-mail, si el usuario existe le debe haber llegado un enlace para resetear su contraseña');
      }, err => {
        this.newMensaje('Ocurrió un error al intentar realizar la consulta');
      });
  }

  ionViewDidLoad() { }

  newMensaje(t){
    const toast = this.toastCtrl.create({
      message: t,
      showCloseButton: true,
      duration:3000,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  presentLoading(){
    this.loadingCtrl.create({
      content: 'Por favor espere...', dismissOnPageChange: true,duration: 30000
    }).present();
  }

}
