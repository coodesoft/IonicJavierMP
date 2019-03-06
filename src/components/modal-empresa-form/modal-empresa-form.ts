import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Organization } from '../../models/organization';

@Component({
  selector: 'modal-empresa-form',
  templateUrl: 'modal-empresa-form.html'
})
export class ModalEmpresaFormComponent {

  private organiza_model:Organization  = new Organization();
  private operacion:string             = 'NOrga';
  private text:string                  = 'Nueva';

  constructor(
      private viewCtrl:  ViewController,
      private navParams: NavParams,
  ) {
    this.organiza_model = this.navParams.get('organiza_model');
    this.operacion      = this.navParams.get('operacion');

    if (this.operacion == 'NOrga') { this.text = 'Nueva'; }
    if (this.operacion == 'EOrga') { this.text = 'Editar'; }
  }

  guardar(){
    this.viewCtrl.dismiss();
  }

  cancelar(){
    this.viewCtrl.dismiss();
  }

}
