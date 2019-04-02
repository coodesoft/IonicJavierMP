import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Organization }         from '../../models/organization';
import { OrganizationProvider } from '../../providers/organization/organization';
import { GeneralService  }      from '../../services/general.service';

@Component({
  selector: 'modal-empresa-form',
  templateUrl: 'modal-empresa-form.html'
})
export class ModalEmpresaFormComponent {

  private organiza_model:Organization  = new Organization();
  private operacion:string             = 'NOrga';
  private text:string                  = 'Nueva';

  constructor(
      private viewCtrl:     ViewController,
      private navParams:    NavParams,
      private organization: OrganizationProvider,
      private gral:         GeneralService
  ) {
    this.organiza_model = this.navParams.get('organiza_model');
    this.operacion      = this.navParams.get('operacion');

    if (this.operacion == 'NOrga') { this.text = 'Nueva'; }
    if (this.operacion == 'EOrga') { this.text = 'Editar'; }
  }

  guardar(){
    if ( this.organiza_model.isValid() ){
      this.organization.goSave.next( this.organiza_model );
      this.viewCtrl.dismiss();
    } else {
      this.gral.newMensaje( this.organiza_model.getErrors() );
    }
  }

  cancelar(){
    this.viewCtrl.dismiss();
  }

}
