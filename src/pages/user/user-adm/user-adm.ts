import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalUserFormComponent } from '../../../components/modal-user-form/modal-user-form';
import { RespuestaAuthModule }    from '../../../models/respuesta.authmodule';
import { User }                   from '../../../models/user';
import { UserProvider }           from '../../../providers/user/user';
import { RolProvider }            from '../../../providers/rol/rol';
import { GeneralService }         from '../../../services/general.service';

@IonicPage()
@Component({
  selector: 'page-user-adm',
  templateUrl: 'user-adm.html',
})
export class UserAdmPage {

  constructor(
    private navCtrl:   NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private rolProv:   RolProvider,
    private userProv:  UserProvider,
    private gral:      GeneralService
  ) {}

  private user_model:User = new User();

  private modalUser;
  newUser(){
    this.gral.presentLoading();
    this.rolProv.getAll();
  }

  private getAllRolesOK;
  private getAllRolesKO;

  private getAllUsersOK;
  private getAllUsersKO;
  private users_list:any;

  ionViewDidEnter(){
    /// ROLES
    this.getAllRolesOK = this.rolProv.getAllOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
      this.modalUser = this.modalCtrl.create(ModalUserFormComponent, { 'user_model':this.user_model, 'operacion':'NUser' });
      this.modalUser.present();
    } });

    this.getAllRolesKO = this.rolProv.getAllKO.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.errMsg(r); this.gral.dismissLoading();
    } });

    //USUARIOS
    this.getAllUsersOK = this.userProv.getAllOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
      this.users_list = r.result.users;
    } });

    this.getAllUsersKO = this.userProv.getAllKO.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.errMsg(r); this.gral.dismissLoading();
    } });

    // NI BIEN SE ENTRA
    this.userProv.getAll();
  }

  ionViewDidLeave(){
    this.getAllRolesOK.unsubscribe();
    this.getAllRolesKO.unsubscribe();
    this.getAllUsersOK.unsubscribe();
    this.getAllUsersKO.unsubscribe();
  }

  ionViewDidLoad() {
  }

}
