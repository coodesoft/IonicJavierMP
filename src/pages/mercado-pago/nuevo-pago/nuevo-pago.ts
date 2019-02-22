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

  private pago_model:Pago = new Pago();

  private newPagoOK;
  private newPagoKO;

  constructor(
    private navCtrl:   NavController,
    private navParams: NavParams,
    private pagoProv:  PagoProvider,
    private gral:      GeneralService
  ) { }

  newPago(){
    this.pagoProv.newPago(this.pago_model);
  }

  ionViewDidEnter(){
    this.newPagoOK = this.pagoProv.newPagoOK.subscribe({  next: (r) => {
      this.navCtrl.push(FormularioPagoPage, { model:this.pago_model });
      this.gral.dismissLoading();
    } });

    this.newPagoKO = this.pagoProv.controlKO.subscribe({  next: (r) => {
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
