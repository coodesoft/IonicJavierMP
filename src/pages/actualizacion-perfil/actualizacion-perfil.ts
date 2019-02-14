import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators }  from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage }                            from '../home/home';

import { RespuestaAuthModule } from '../../models/respuesta.authmodule';

@IonicPage()
@Component({
  selector: 'page-actualizacion-perfil',
  templateUrl: 'actualizacion-perfil.html',
})
export class ActualizacionPerfilPage {

  newPassForm:FormGroup;

  constructor(
    public  navCtrl      : NavController,
    public  formBuilder  : FormBuilder,
    private authProvider : AuthProvider,
    public  toastCtrl:    ToastController,
    public  navParams    : NavParams
  ) {
    this.newPassForm = this.formBuilder.group({
      pass: ['', Validators.required],
      npass: ['', Validators.required],
      rpass: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
  }

  newMensaje(t){
    const toast = this.toastCtrl.create({
      message: t,
      showCloseButton: true,
      duration:3000,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  newPass(){
    this.authProvider.updatePass({
      "pass":this.newPassForm.controls.pass.value,
      "npass":this.newPassForm.controls.npass.value,
      "rpass":this.newPassForm.controls.rpass.value
    },
    data => {
      let d:any = <RespuestaAuthModule> data;

      if (d['result']['success']){
        this.newMensaje('Contraseña actualizada correctamente');
        this.navCtrl.setRoot(HomePage);
      }

      if (d['error'] !== ''){
        this.newMensaje(d['error']);
      }
    }, err => {
      this.newMensaje('Ocurrió un error al intentar actualizar la contraseña');
    });

  }
}
