import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Pago }               from '../../../models/pago';
import { FormularioPagoPage } from '../formulario-pago/formulario-pago';

@IonicPage()
@Component({
  selector: 'page-nuevo-pago',
  templateUrl: 'nuevo-pago.html',
})
export class NuevoPagoPage {

  private pago:Pago = new Pago();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  newPago(){
    this.navCtrl.push(FormularioPagoPage);
  }

  ionViewDidLoad() {
  }

}
