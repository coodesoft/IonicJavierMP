import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { User }                 from '../../models/user';
import { RolProvider }          from '../../providers/rol/rol';
import { UserProvider }         from '../../providers/user/user';
import { OrganizationProvider } from '../../providers/organization/organization';
import { GeneralService  }      from '../../services/general.service';

@Component({
  selector: 'modal-user-form',
  templateUrl: 'modal-user-form.html'
})
export class ModalUserFormComponent {

  private user_model:User  = new User();
  private operacion:string = 'NUser';
  private text:string      = 'Nuevo';

  constructor(
    private viewCtrl:     ViewController,
    private navParams:    NavParams,
    private rolProv:      RolProvider,
    private organization: OrganizationProvider,
    private user:         UserProvider,
    private gral:         GeneralService
  ) {
    this.user_model = this.navParams.get('user_model');
    this.operacion  = this.navParams.get('operacion');
    
    if (this.operacion == 'NUser') { this.text = 'Nuevo'; }
    if (this.operacion == 'EUser') { this.text = 'Editar'; }
  }

  guardar(){
    if ( this.user_model.isValid() ){
      this.user.goSave.next( this.user_model );
      this.viewCtrl.dismiss();
    } else {
      this.gral.newMensaje( this.user_model.getErrors() );
    }
  }

  cancelar(){
    this.viewCtrl.dismiss();
  }

}
