import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalUserFormComponent } from '../../../components/modal-user-form/modal-user-form';
import { RespuestaAuthModule }    from '../../../models/respuesta.authmodule';
import { User }                   from '../../../models/user';
import { UserProvider }           from '../../../providers/user/user';
import { RolProvider }            from '../../../providers/rol/rol';
import { OrganizationProvider }   from '../../../providers/organization/organization';
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
    private gral:      GeneralService,
    private orga:      OrganizationProvider
  ) {}

  private createOK;
  private createKO;
  private editOK;
  private editKO;
  private removeOK;
  private removeKO;
  private enableOK;
  private enableKO;

  private getOneOK;
  private getOneKO;

  private goSave;
  private operation:string;

  private user_model:User = new User();
  private id_item:string;

  private modalUser; //[Modificar] usar el ondissmiss del modal en vez de crear un nuevo subject aparte
  create(){
    this.operation = 'NUser';
    this.gral.presentLoading();
    this.orga.getAll();
  }

  edit(row){
    this.operation = 'EUser';
    this.id_item   = row.id;
    this.gral.presentLoading();
    this.orga.getAll();
  }

  remove(row){ this.userProv.remove(row.id); }

  enable(row){ this.userProv.enable(row.id); }

  private getAllRolesOK;
  private getAllRolesKO;

  private getAllOrgasOK;
  private getAllOrgasKO;

  private getAllUsersOK;
  private getAllUsersKO;
  private users_list:any;

  ionViewDidEnter(){
    /// Organizaciones
    this.getAllOrgasOK = this.orga.getAllOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.rolProv.getAll();
    } });
    this.getAllOrgasKO = this.orga.getAllKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading(); } });


    /// ROLES
    this.getAllRolesOK = this.rolProv.getAllOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
      this.user_model.operation = this.operation;
      this.user_model.setRoleList( this.rolProv.roles_listed );
      if (this.operation == 'EUser'){
        this.gral.presentLoading();
        this.userProv.getOne(this.id_item);
      } else {
        this.modalUser = this.modalCtrl.create(ModalUserFormComponent, { 'user_model':this.user_model, 'operacion':this.operation });
        this.modalUser.present();
      }
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
      this.user_model           = r;
      this.user_model.operation = this.operation;
      if (this.user_model.isValid()){
        if (this.operation == 'NUser'){ this.userProv.create(this.user_model); }
        else                          { this.userProv.edit(this.user_model); }
        this.gral.presentLoading();
      } else {
        this.gral.newMensaje(this.user_model.getErrors());
      }
    } });

    this.createOK = this.userProv.createOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.userProv.getAll();
    } });
    this.createKO = this.userProv.createKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    this.editOK = this.userProv.editOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
    } });
    this.editKO = this.userProv.editKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    this.removeOK = this.userProv.removeOK.subscribe({  next: (r:RespuestaAuthModule) => { this.userProv.getAll();   } });
    this.removeKO = this.userProv.removeKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    this.enableOK = this.userProv.enableOK.subscribe({  next: (r:RespuestaAuthModule) => { this.userProv.getAll(); } });
    this.enableKO = this.userProv.enableKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    // Se piden un usuario especifico para edición
    this.getOneOK = this.userProv.getOneOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.user_model.setParams(r.result.user);
      this.modalUser = this.modalCtrl.create(ModalUserFormComponent, { 'user_model':this.user_model, 'operacion':this.operation });
      this.modalUser.present();
      this.gral.dismissLoading();
    } });
    this.getOneKO = this.userProv.getOneKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    // NI BIEN SE ENTRA
    this.gral.presentLoading();
    this.userProv.getAll();
  }

  ionViewWillLeave(){
    this.getAllRolesOK.unsubscribe();
    this.getAllRolesKO.unsubscribe();
    this.getAllUsersOK.unsubscribe();
    this.getAllUsersKO.unsubscribe();
    this.getAllOrgasOK.unsubscribe();
    this.getAllOrgasKO.unsubscribe();

    this.getOneOK.unsubscribe();
    this.getOneKO.unsubscribe();

    this.createOK.unsubscribe();
    this.createKO.unsubscribe();
    this.editOK.unsubscribe();
    this.editKO.unsubscribe();
    this.removeOK.unsubscribe();
    this.removeKO.unsubscribe();
    this.enableOK.unsubscribe();
    this.enableKO.unsubscribe();

    this.goSave.unsubscribe();
    this.orga.clearCache();
    this.rolProv.clearCache();
  }

  ionViewDidLoad() {
  }

}


/// sobre las peticiones
/* cada vez que se iene que hacer un nuevo usuario se necesita contar con el listado de roles
y el listado de organizaciones, la idea es cargarlo una sola vez al cargar la vista, aunque eso de si se cargo o no
se ve en los providers, al cual se le agrega un metodo para resetear eso valores de forma que se puedan volver a pedir,
ese metodo que resetea las variables se llama al salir de la vista.

asi que al crear un nuevo item se llama: getAllRoles, si fue OK -> getAllOrgas, si fue OK -> se muestyra modal
al editar se llama: getAllRoles, si fue OK -> getAllOrgas, si fue OK -> getOne, si fue OK -> se muestyra modal
*/
