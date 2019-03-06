import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { User }        from '../../models/user';
import { RolProvider } from '../../providers/rol/rol';

@Component({
  selector: 'modal-user-form',
  templateUrl: 'modal-user-form.html'
})
export class ModalUserFormComponent {

  private user_model:User  = new User();
  private operacion:string = 'NUser';
  private text:string      = 'Nuevo';

  constructor(
    private viewCtrl:  ViewController,
    private navParams: NavParams,
    private rolProv:   RolProvider
  ) {
    this.user_model = this.navParams.get('user_model');
    this.operacion  = this.navParams.get('operacion');
    this.user_model.setRoleList( this.rolProv.roles_listed );

    if (this.operacion == 'NUser') { this.text = 'Nuevo'; }
    if (this.operacion == 'EUser') { this.text = 'Editar'; }
  }

  guardar(){
    this.viewCtrl.dismiss();
  }

  cancelar(){
    this.viewCtrl.dismiss();
  }

}
