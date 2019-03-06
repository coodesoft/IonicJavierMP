import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalUserFormComponent } from '../../../components/modal-user-form/modal-user-form';
import { User } from '../../../models/user';

@IonicPage()
@Component({
  selector: 'page-user-adm',
  templateUrl: 'user-adm.html',
})
export class UserAdmPage {

  constructor(
    private navCtrl:   NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {}

  private user_model:User = new User();

  private modalUser;
  newUser(){
    this.modalUser = this.modalCtrl.create(ModalUserFormComponent, { 'user_model':this.user_model, 'operacion':'NUser' });
    this.modalUser.present();
  }

  ionViewDidLoad() {
  }

}
