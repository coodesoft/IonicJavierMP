import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalEmpresaFormComponent } from '../../../components/modal-empresa-form/modal-empresa-form';
import { RespuestaAuthModule }       from '../../../models/respuesta.authmodule';
import { Organization }              from '../../../models/organization';
import { OrganizationProvider }      from '../../../providers/organization/organization';
import { GeneralService }            from '../../../services/general.service';

@IonicPage()
@Component({
  selector: 'page-empresa-adm',
  templateUrl: 'empresa-adm.html',
})
export class EmpresaAdmPage {

  constructor(
    private navCtrl:      NavController,
    private navParams:    NavParams,
    private modalCtrl:    ModalController,
    private organization: OrganizationProvider,
    private gral:         GeneralService
  ) { }

  private orga_model = new Organization();

  private createOK;
  private createKO;
  private editOK;
  private editKO;
  private removeOK;
  private removeKO;
  private getAllOK;
  private getAllKO;
  private goSave;

  private operation;
  private orgas_list;

  ionViewDidLoad() {
  }

  private organiza_model:Organization = new Organization();

  private modalOrga;

  create(){
    this.operation = 'NOrga';
    this.modalOrga = this.modalCtrl.create(ModalEmpresaFormComponent, { 'organiza_model':this.organiza_model, 'operacion':this.operation });
    this.modalOrga.present();
  }

  edit(id){
    this.operation = 'EOrga';
    this.modalOrga = this.modalCtrl.create(ModalEmpresaFormComponent, { 'organiza_model':this.organiza_model, 'operacion':this.operation });
    this.modalOrga.present();
  }

  remove(id){ this.organization.remove(id); }

  ionViewDidEnter() {
    this.getAllOK = this.organization.getAllOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
      this.orgas_list = r.result.orgas;
    } });
    this.getAllKO = this.organization.getAllKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    this.goSave = this.organization.goSave.subscribe({  next: (r:Organization) => {
      this.orga_model = r;
      if (this.operation == 'NOrga'){ this.organization.create(this.orga_model); }
      else { this.organization.edit(this.orga_model); }
      this.gral.presentLoading();
    }});

    this.createOK = this.organization.createOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
    } });
    this.createKO = this.organization.createKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    this.editOK = this.organization.editOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
    } });
    this.editKO = this.organization.editKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    this.removeOK = this.organization.removeOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
    } });
    this.removeKO = this.organization.removeKO.subscribe({  next: (r:RespuestaAuthModule) => { this.gral.errMsg(r); this.gral.dismissLoading();  } });

    this.gral.presentLoading();
    this.organization.getAll();
  }

  ionViewDidLeave(){
    this.createOK.unsubscribe();
    this.createKO.unsubscribe();
    this.editOK.unsubscribe();
    this.editKO.unsubscribe();
    this.removeOK.unsubscribe();
    this.removeKO.unsubscribe();
    this.getAllOK.unsubscribe();
    this.getAllKO.unsubscribe();

    this.goSave.unsubscribe();
  }

}
