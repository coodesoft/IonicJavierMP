import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Pago }               from '../../../models/pago';
import { RespuestaAuthModule } from '../../../models/respuesta.authmodule';
import { FormularioPagoPage } from '../formulario-pago/formulario-pago';
import { PagoProvider }       from '../../../providers/pago/pago';
import { GeneralService }     from '../../../services/general.service';
import { AuthProvider }       from '../../../providers/auth/auth';
import { FormateoService }    from '../../../services/formateo.service';

@IonicPage()
@Component({
  selector: 'page-nuevo-pago',
  templateUrl: 'nuevo-pago.html',
})
export class NuevoPagoPage {

  public pago_model:Pago = new Pago();

  private newPagoOK;
  private newPagoKO;

  constructor(
    private navCtrl:   NavController,
    private navParams: NavParams,
    private pagoProv:  PagoProvider,
    private gral:      GeneralService,
    private format:    FormateoService,
    private auth:    AuthProvider
  ) { }

  newPago(){
    if ( this.pago_model.isValid() ){
      this.gral.presentLoading();
      this.pago_model.deleteExtraField();
      this.pagoProv.newPago(this.pago_model);
    } else {
      this.gral.newMensaje(this.pago_model.errors);
    }
  }

  moneyReset(v){
      if(v==''){ return '$ 0';} else { return v; }
  }

  ionViewDidEnter(){
    this.pago_model.email = this.auth.userData.organization[0].email;

    this.newPagoOK = this.pagoProv.newPagoOK.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.dismissLoading();
      if ( r.result.success ){
        this.pago_model.id = r.result.id_pago;
        this.navCtrl.push(FormularioPagoPage, { pago_model:this.pago_model });
      }
    } });

    this.newPagoKO = this.pagoProv.newPagoKO.subscribe({  next: (r:RespuestaAuthModule) => {
      this.gral.errMsg(r);
      this.gral.dismissLoading();
    } });
  }

  ionViewDidLeave(){
    this.newPagoOK.unsubscribe();
    this.newPagoKO.unsubscribe();
  }

  ionViewDidLoad() {
  }

}
