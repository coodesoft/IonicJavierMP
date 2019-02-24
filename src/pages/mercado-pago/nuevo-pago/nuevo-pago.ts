import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Pago }               from '../../../models/pago';
import { FormularioPagoPage } from '../formulario-pago/formulario-pago';
import { PagoProvider }       from '../../../providers/pago/pago';
import { GeneralService }     from '../../../services/general.service';

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
    private gral:      GeneralService
  ) { }

  newPago(){
    if ( this.pago_model.isValid() ){
      this.gral.presentLoading();
      this.pagoProv.newPago(this.pago_model);
    } else {

    }
  }

  ionViewDidEnter(){
    this.newPagoOK = this.pagoProv.newPagoOK.subscribe({  next: (r) => {
      this.gral.dismissLoading();
      if ( r.result.success ){
        this.pago_model.id = r.result.id;
        this.navCtrl.push(FormularioPagoPage, { pago_model:this.pago_model });
      }
    } });

    this.newPagoKO = this.pagoProv.newPagoKO.subscribe({  next: (r) => {
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
