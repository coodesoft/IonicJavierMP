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

  private createOK;
  private createKO;
  private editOK;
  private editKO;
  private removeOK;
  private removeKO;

  private goSave;
  private operation:string;

  private user_model:User = new User();

  private modalUser;
  create(){
    this.operation = 'NUser';
    this.gral.presentLoading();
    this.rolProv.getAll();
  }

  edit(id){
    this.operation = 'EUser';
    this.modalUser = this.modalCtrl.create(ModalUserFormComponent, { 'user_model':this.user_model, 'operacion':this.operation });
    this.modalUser.present();
  }

  remove(id){ this.userProv.remove(id); }

  private getAllRolesOK;
  private getAllRolesKO;

  private getAllUsersOK;
  private getAllUsersKO;
  private users_list:any;

  ionViewDidEnter(){
    /// ROLES
    this.getAllRolesOK = this.rolProv.getAllOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();

      this.modalUser = this.modalCtrl.create(ModalUserFormComponent, { 'user_model':this.user_model, 'operacion':this.operation });
      this.modalUser.present();
    } });

    this.getAllRolesKO = this.rolProv.getAllKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading(); } });

    //USUARIOS (TODXS)
    this.getAllUsersOK = this.userProv.getAllOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
      this.users_list = r.result.users;
    } });

    this.getAllUsersKO = this.userProv.getAllKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    //USUADIOS adm
    this.goSave = this.userProv.goSave.subscribe({  next: (r:User) => {
      this.user_model = r;
      if (this.operation == 'NUser'){ this.userProv.create(this.user_model); }
      else { this.userProv.edit(this.user_model); }
      this.gral.presentLoading();
    } });

    this.createOK = this.userProv.createOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
    } });
    this.createKO = this.userProv.createKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    this.editOK = this.userProv.editOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
    } });
    this.editKO = this.userProv.editKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    this.removeOK = this.userProv.removeOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.userProv.getAll();
    } });
    this.removeKO = this.userProv.removeKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    // NI BIEN SE ENTRA
    this.gral.presentLoading();
    this.userProv.getAll();
  }

  ionViewDidLeave(){
    this.getAllRolesOK.unsubscribe();
    this.getAllRolesKO.unsubscribe();
    this.getAllUsersOK.unsubscribe();
    this.getAllUsersKO.unsubscribe();

    this.createOK.unsubscribe();
    this.createKO.unsubscribe();
    this.editOK.unsubscribe();
    this.editKO.unsubscribe();
    this.removeOK.unsubscribe();
    this.removeKO.unsubscribe();

    this.goSave.unsubscribe();
  }

  ionViewDidLoad() {
  }

}
