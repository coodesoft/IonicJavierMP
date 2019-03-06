import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalEmpresaFormComponent } from '../../../components/modal-empresa-form/modal-empresa-form';

import { Organization } from '../../../models/organization';

@IonicPage()
@Component({
  selector: 'page-empresa-adm',
  templateUrl: 'empresa-adm.html',
})
export class EmpresaAdmPage {

  constructor(
    private navCtrl:   NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  ionViewDidLoad() {
  }

  private organiza_model:Organization = new Organization();

  private modalOrga;

  newOrga(){
    this.modalOrga = this.modalCtrl.create(ModalEmpresaFormComponent, { 'organiza_model':this.organiza_model, 'operacion':'NOrga' });
    this.modalOrga.present();
  }

}
